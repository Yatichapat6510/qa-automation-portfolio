"""
QA Workshop Demo App - Flask REST API
ใช้สำหรับฝึกทดสอบทุก tools ใน Workshop
"""

from flask import Flask, jsonify, request
from functools import wraps
import uuid
import datetime

app = Flask(__name__)

# ========== Mock Database ==========
users_db = {
    "1": {"id": "1", "name": "Alice", "email": "alice@example.com", "role": "admin"},
    "2": {"id": "2", "name": "Bob",   "email": "bob@example.com",   "role": "user"},
    "3": {"id": "3", "name": "Carol", "email": "carol@example.com", "role": "user"},
}

products_db = {
    "1": {"id": "1", "name": "Laptop",  "price": 35000, "stock": 10, "category": "Electronics"},
    "2": {"id": "2", "name": "Mouse",   "price": 500,   "stock": 50, "category": "Electronics"},
    "3": {"id": "3", "name": "Notebook","price": 80,    "stock": 100,"category": "Stationery"},
}

orders_db = {}

valid_tokens = {"test-token-123": "1", "admin-token-456": "1"}

# ========== Auth Helper ==========
def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization", "").replace("Bearer ", "")
        if token not in valid_tokens:
            return jsonify({"error": "Unauthorized", "message": "Invalid or missing token"}), 401
        return f(*args, **kwargs)
    return decorated

# ========== Health Check ==========
@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "service": "QA Workshop Demo API",
        "version": "1.0.0",
        "timestamp": datetime.datetime.utcnow().isoformat()
    })

# ========== Auth Routes ==========
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Bad Request", "message": "Request body required"}), 400

    username = data.get("username", "")
    password = data.get("password", "")

    if username == "admin" and password == "password123":
        return jsonify({
            "success": True,
            "token": "test-token-123",
            "user": {"id": "1", "name": "Alice", "role": "admin"},
            "expires_in": 3600
        })
    return jsonify({"error": "Unauthorized", "message": "Invalid credentials"}), 401

@app.route("/api/logout", methods=["POST"])
@require_auth
def logout():
    return jsonify({"success": True, "message": "Logged out successfully"})

# ========== Users Routes ==========
@app.route("/api/users", methods=["GET"])
@require_auth
def get_users():
    page  = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    users = list(users_db.values())
    start = (page - 1) * limit
    end   = start + limit
    return jsonify({
        "data": users[start:end],
        "total": len(users),
        "page": page,
        "limit": limit
    })

@app.route("/api/users/<user_id>", methods=["GET"])
@require_auth
def get_user(user_id):
    user = users_db.get(user_id)
    if not user:
        return jsonify({"error": "Not Found", "message": f"User {user_id} not found"}), 404
    return jsonify(user)

@app.route("/api/users", methods=["POST"])
@require_auth
def create_user():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Bad Request", "message": "Request body required"}), 400

    required = ["name", "email"]
    missing  = [f for f in required if f not in data]
    if missing:
        return jsonify({"error": "Validation Error", "missing_fields": missing}), 422

    for user in users_db.values():
        if user["email"] == data["email"]:
            return jsonify({"error": "Conflict", "message": "Email already exists"}), 409

    new_id = str(len(users_db) + 1)
    new_user = {
        "id":    new_id,
        "name":  data["name"],
        "email": data["email"],
        "role":  data.get("role", "user")
    }
    users_db[new_id] = new_user
    return jsonify(new_user), 201

@app.route("/api/users/<user_id>", methods=["PUT"])
@require_auth
def update_user(user_id):
    user = users_db.get(user_id)
    if not user:
        return jsonify({"error": "Not Found", "message": f"User {user_id} not found"}), 404
    data = request.get_json() or {}
    user.update({k: v for k, v in data.items() if k in ["name", "email", "role"]})
    return jsonify(user)

@app.route("/api/users/<user_id>", methods=["DELETE"])
@require_auth
def delete_user(user_id):
    if user_id not in users_db:
        return jsonify({"error": "Not Found", "message": f"User {user_id} not found"}), 404
    del users_db[user_id]
    return jsonify({"success": True, "message": f"User {user_id} deleted"}), 200

# ========== Products Routes ==========
@app.route("/api/products", methods=["GET"])
def get_products():
    category = request.args.get("category")
    products  = list(products_db.values())
    if category:
        products = [p for p in products if p["category"].lower() == category.lower()]
    return jsonify({"data": products, "total": len(products)})

@app.route("/api/products/<product_id>", methods=["GET"])
def get_product(product_id):
    product = products_db.get(product_id)
    if not product:
        return jsonify({"error": "Not Found", "message": f"Product {product_id} not found"}), 404
    return jsonify(product)

@app.route("/api/products", methods=["POST"])
@require_auth
def create_product():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Bad Request"}), 400
    required = ["name", "price", "stock"]
    missing  = [f for f in required if f not in data]
    if missing:
        return jsonify({"error": "Validation Error", "missing_fields": missing}), 422
    if data["price"] < 0:
        return jsonify({"error": "Validation Error", "message": "Price cannot be negative"}), 422

    new_id = str(len(products_db) + 1)
    new_product = {
        "id":       new_id,
        "name":     data["name"],
        "price":    data["price"],
        "stock":    data["stock"],
        "category": data.get("category", "General")
    }
    products_db[new_id] = new_product
    return jsonify(new_product), 201

# ========== Orders Routes ==========
@app.route("/api/orders", methods=["POST"])
@require_auth
def create_order():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Bad Request"}), 400

    product_id = str(data.get("product_id", ""))
    quantity   = data.get("quantity", 0)

    product = products_db.get(product_id)
    if not product:
        return jsonify({"error": "Not Found", "message": "Product not found"}), 404
    if quantity <= 0:
        return jsonify({"error": "Validation Error", "message": "Quantity must be greater than 0"}), 422
    if product["stock"] < quantity:
        return jsonify({"error": "Bad Request", "message": "Insufficient stock"}), 400

    product["stock"] -= quantity
    order_id = str(uuid.uuid4())[:8]
    order = {
        "id":         order_id,
        "product_id": product_id,
        "product":    product["name"],
        "quantity":   quantity,
        "total":      product["price"] * quantity,
        "status":     "confirmed",
        "created_at": datetime.datetime.utcnow().isoformat()
    }
    orders_db[order_id] = order
    return jsonify(order), 201

@app.route("/api/orders/<order_id>", methods=["GET"])
@require_auth
def get_order(order_id):
    order = orders_db.get(order_id)
    if not order:
        return jsonify({"error": "Not Found", "message": f"Order {order_id} not found"}), 404
    return jsonify(order)

# ========== Search Route ==========
@app.route("/api/search", methods=["GET"])
def search():
    q = request.args.get("q", "").lower()
    if not q:
        return jsonify({"error": "Bad Request", "message": "Query parameter 'q' is required"}), 400
    results = [p for p in products_db.values() if q in p["name"].lower()]
    return jsonify({"query": q, "results": results, "count": len(results)})

if __name__ == "__main__":
    print("QA Workshop Demo API running at http://localhost:5000")
    print("Health check: http://localhost:5000/health")
    app.run(debug=True, port=5000)
