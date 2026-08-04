import pytest

from app import app


@pytest.fixture()
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_login_with_valid_credentials_returns_token(client):
    response = client.post(
        "/api/login",
        json={"username": "admin", "password": "password123"},
    )

    assert response.status_code == 200
    data = response.get_json()
    assert data["success"] is True
    assert data["token"] == "test-token-123"
    assert data["user"]["name"] == "Alice"
