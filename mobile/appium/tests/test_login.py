"""ทดสอบการ Login: TC-MOB-001 ถึง TC-MOB-004 (ดู docs/test-cases.md)"""

import pytest

VALID_USER = "bod@example.com"
LOCKED_USER = "alice@example.com"
PASSWORD = "10203040"


@pytest.mark.smoke
@pytest.mark.login
def test_tc_mob_001_login_with_valid_credentials(app):
    login_page = app.header.go_to_login()

    catalog = login_page.login_successfully(VALID_USER, PASSWORD)

    # ยืนยันผลทั้งสองด้าน: กลับมาหน้า Products และเมนูเปลี่ยนเป็น Log Out
    assert catalog.is_displayed(), "Products screen should be shown after login"
    assert catalog.header.is_logged_in(), "Menu should offer 'Log Out' after login"


@pytest.mark.login
@pytest.mark.parametrize(
    "username, password, error_field, expected_message",
    [
        pytest.param(
            LOCKED_USER, PASSWORD, "password", "Sorry this user has been locked out.",
            id="TC-MOB-002-locked-out-user",
        ),
        pytest.param(
            VALID_USER, "", "password", "Enter Password",
            id="TC-MOB-003-empty-password",
        ),
        # แอป trim ค่า username ก่อนตรวจ ช่องว่างล้วนจึงต้องถูกมองว่าเป็นค่าว่าง
        pytest.param(
            "   ", PASSWORD, "username", "Username is required",
            id="TC-MOB-004-whitespace-username",
        ),
    ],
)
def test_login_shows_validation_error(app, username, password, error_field, expected_message):
    login_page = app.header.go_to_login()

    login_page.submit_credentials(username, password)

    assert login_page.error_message(error_field) == expected_message
    # ต้องยังอยู่ที่หน้า Login ไม่ถูกพาเข้าสู่ระบบ
    assert login_page.is_displayed(), "User should remain on the Login screen"
