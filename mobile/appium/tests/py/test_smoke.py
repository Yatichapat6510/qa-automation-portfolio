from appium import webdriver
from appium.options.android import UiAutomator2Options

options = UiAutomator2Options()
options.platform_name = "Android"
options.automation_name = "UiAutomator2"
options.device_name = "emulator-5554"   # เปลี่ยนตามชื่อจาก adb devices
options.app_package = "com.saucelabs.mydemoapp.android"
options.app_activity = "com.saucelabs.mydemoapp.android.view.activities.SplashActivity"

driver = webdriver.Remote("http://127.0.0.1:4723", options=options)
print("✅ Session started successfully:", driver.session_id)
driver.quit()
