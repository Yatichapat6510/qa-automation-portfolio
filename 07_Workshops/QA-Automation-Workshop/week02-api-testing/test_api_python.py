"""
Week 2 - API Testing with Python + pytest
ทดสอบ Demo App ที่ http://localhost:5000
รัน: pytest test_api_python.py -v --html=report.html
"""

import pytest
import requests

BASE_URL = "http://localhost:5000"
VALID_TOKEN = "test-token-123"

# ========== Fixtures ==========

@pytest.fixture(scope="session")
def auth_headers():
    """Header สำหรับ request ที่ต้องการ Auth"""
    return {"Authorization": f"Bearer {VALID_TOKEN}", "Content-Type": "application/json"}

@pytest.fixture(scope="session")
def api():
    """Base URL สำหรับทุก test"""
    return BASE_URL

# ========== HEALTH CHECK ==========

class TestHealthCheck:
    def test_health_returns_200(self, api):
        """TC-001: Health endpoint ต้องคืน 200"""
        res = requests.get(f"{api}/health")
        assert res.status_code == 200

    def test_health_has_status_ok(self, api):
        """TC-002: Health response ต้องมี status=ok"""
        res = requests.get(f"{api}/health")
        body = res.json()
        assert body["status"] == "ok"

    def test_health_has_version(self, api):
        """TC-003: Health response ต้องมี version"""
        res = requests.get(f"{api}/health")
        body = res.json()
        assert "version" in body

# ========== AUTH ==========

class TestAuth:
    def test_login_success(self, api):
        """TC-010: Login ด้วย credentials ถูกต้อง → 200 + token"""
        res = requests.post(f"{api}/api/login", json={
            "username": "admin",
            "password": "password123"
        })
        assert res.status_code == 200
        body = res.json()
        assert body["success"] is True
        assert "token" in body
        assert len(body["token"]) > 0

    def test_login_wrong_password(self, api):
        """TC-011: Login รหัสผ่านผิด → 401"""
        res = requests.post(f"{api}/api/login", json={
            "username": "admin",
            "password": "wrongpassword"
        })
        assert res.status_code == 401

    def test_login_missing_username(self, api):
        """TC-012: Login ไม่มี username → 401"""
        res = requests.post(f"{api}/api/login", json={"password": "password123"})
        assert res.status_code == 401

    def test_login_empty_body(self, api):
        """TC-013: Login body ว่าง → 400"""
        res = requests.post(f"{api}/api/login", json={})
        assert res.status_code in [400, 401]

    def test_access_without_token(self, api):
        """TC-014: เรียก protected endpoint โดยไม่มี token → 401"""
        res = requests.get(f"{api}/api/users")
        assert res.status_code == 401

    def test_access_with_invalid_token(self, api):
        """TC-015: ใช้ token ผิด → 401"""
        res = requests.get(f"{api}/api/users",
                           headers={"Authorization": "Bearer invalid-token"})
        assert res.status_code == 401

# ========== USERS - GET ==========

class TestGetUsers:
    def test_get_all_users_returns_200(self, api, auth_headers):
        """TC-020: GET /api/users → 200"""
        res = requests.get(f"{api}/api/users", headers=auth_headers)
        assert res.status_code == 200

    def test_get_users_response_structure(self, api, auth_headers):
        """TC-021: GET /api/users response มี data, total"""
        res = requests.get(f"{api}/api/users", headers=auth_headers)
        body = res.json()
        assert "data" in body
        assert "total" in body
        assert isinstance(body["data"], list)

    def test_get_users_count_is_correct(self, api, auth_headers):
        """TC-022: จำนวน users ตรงกับ total"""
        res = requests.get(f"{api}/api/users", headers=auth_headers)
        body = res.json()
        assert len(body["data"]) == body["total"]

    def test_get_single_user_success(self, api, auth_headers):
        """TC-023: GET /api/users/1 → 200 + ข้อมูลถูกต้อง"""
        res = requests.get(f"{api}/api/users/1", headers=auth_headers)
        assert res.status_code == 200
        body = res.json()
        assert body["id"] == "1"
        assert "name" in body
        assert "email" in body

    def test_get_user_not_found(self, api, auth_headers):
        """TC-024: GET /api/users/9999 → 404"""
        res = requests.get(f"{api}/api/users/9999", headers=auth_headers)
        assert res.status_code == 404

# ========== USERS - CREATE ==========

class TestCreateUser:
    def test_create_user_success(self, api, auth_headers):
        """TC-030: POST /api/users ข้อมูลถูกต้อง → 201"""
        payload = {"name": "Dave Test", "email": "dave.test@example.com"}
        res = requests.post(f"{api}/api/users", headers=auth_headers, json=payload)
        assert res.status_code == 201
        body = res.json()
        assert body["name"] == "Dave Test"
        assert body["email"] == "dave.test@example.com"
        assert "id" in body

    def test_create_user_missing_name(self, api, auth_headers):
        """TC-031: POST /api/users ไม่มี name → 422"""
        res = requests.post(f"{api}/api/users", headers=auth_headers,
                            json={"email": "no-name@example.com"})
        assert res.status_code == 422

    def test_create_user_missing_email(self, api, auth_headers):
        """TC-032: POST /api/users ไม่มี email → 422"""
        res = requests.post(f"{api}/api/users", headers=auth_headers,
                            json={"name": "No Email"})
        assert res.status_code == 422

    def test_create_user_duplicate_email(self, api, auth_headers):
        """TC-033: POST /api/users email ซ้ำ → 409"""
        payload = {"name": "Duplicate", "email": "alice@example.com"}
        res = requests.post(f"{api}/api/users", headers=auth_headers, json=payload)
        assert res.status_code == 409

# ========== PRODUCTS ==========

class TestProducts:
    def test_get_products_no_auth_required(self, api):
        """TC-040: GET /api/products ไม่ต้องการ token → 200"""
        res = requests.get(f"{api}/api/products")
        assert res.status_code == 200

    def test_get_products_structure(self, api):
        """TC-041: GET /api/products มี data list"""
        res = requests.get(f"{api}/api/products")
        body = res.json()
        assert "data" in body
        assert len(body["data"]) > 0

    def test_filter_products_by_category(self, api):
        """TC-042: GET /api/products?category=Electronics"""
        res = requests.get(f"{api}/api/products?category=Electronics")
        body = res.json()
        for product in body["data"]:
            assert product["category"] == "Electronics"

    def test_get_product_by_id(self, api):
        """TC-043: GET /api/products/1 → 200"""
        res = requests.get(f"{api}/api/products/1")
        assert res.status_code == 200
        body = res.json()
        assert body["id"] == "1"

    def test_create_product_negative_price(self, api, auth_headers):
        """TC-044: สร้าง product ราคาติดลบ → 422"""
        res = requests.post(f"{api}/api/products", headers=auth_headers,
                            json={"name": "Bad Product", "price": -100, "stock": 10})
        assert res.status_code == 422

# ========== SEARCH ==========

class TestSearch:
    def test_search_found(self, api):
        """TC-050: ค้นหาที่มีผล → 200 + results"""
        res = requests.get(f"{api}/api/search?q=laptop")
        assert res.status_code == 200
        body = res.json()
        assert body["count"] > 0

    def test_search_not_found(self, api):
        """TC-051: ค้นหาที่ไม่มีผล → 200 + results ว่าง"""
        res = requests.get(f"{api}/api/search?q=xxxxxxxxnotfound")
        assert res.status_code == 200
        body = res.json()
        assert body["count"] == 0

    def test_search_missing_query(self, api):
        """TC-052: ค้นหาโดยไม่มี q parameter → 400"""
        res = requests.get(f"{api}/api/search")
        assert res.status_code == 400

# ========== PARAMETRIZED TEST ==========

@pytest.mark.parametrize("user_id,expected_status", [
    ("1", 200),
    ("2", 200),
    ("3", 200),
    ("999", 404),
    ("abc", 404),
])
def test_get_user_by_id_parametrized(user_id, expected_status, auth_headers):
    """TC-060: Parametrized test - ทดสอบหลาย user_id"""
    res = requests.get(f"{BASE_URL}/api/users/{user_id}", headers=auth_headers)
    assert res.status_code == expected_status
