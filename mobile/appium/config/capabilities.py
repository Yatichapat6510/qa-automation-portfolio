"""ค่า Capabilities สำหรับเชื่อมต่อ Appium Server (Android / UiAutomator2)

ค่าทั้งหมดสอดคล้องกับ resources/common_android.resource ที่ใช้กับ Robot Framework
และสามารถ override ผ่าน environment variable ได้ เพื่อให้รันได้ทั้งบนเครื่อง local และ CI
"""

import os

from appium.options.android import UiAutomator2Options

APPIUM_SERVER_URL = os.getenv("APPIUM_SERVER_URL", "http://127.0.0.1:4723")

APP_PACKAGE = "com.saucelabs.mydemoapp.android"
# Launcher activity ที่ประกาศไว้ใน AndroidManifest.xml ของแอป
APP_ACTIVITY = "com.saucelabs.mydemoapp.android.view.activities.SplashActivity"


def build_android_options() -> UiAutomator2Options:
    """สร้าง W3C capabilities สำหรับ Android emulator/device"""
    # UiAutomator2Options กำหนด platformName=Android และ automationName=UiAutomator2 ไว้ให้แล้ว
    # จึงไม่ตั้งซ้ำ เพื่อไม่ให้เกิด key ซ้ำซ้อนใน capabilities ที่ส่งไปยัง server
    options = UiAutomator2Options()
    # เปลี่ยนชื่ออุปกรณ์ได้ผ่าน ANDROID_DEVICE_NAME ให้ตรงกับผลลัพธ์ของ `adb devices`
    options.device_name = os.getenv("ANDROID_DEVICE_NAME", "emulator-5554")
    options.app_package = APP_PACKAGE
    options.app_activity = APP_ACTIVITY
    # ไม่ล้างข้อมูลแอปตอนเริ่ม session — การแยก state ระหว่างเทสทำใน fixture `app` แทน
    options.no_reset = True
    options.auto_grant_permissions = True
    options.new_command_timeout = 120

    # ถ้าระบุ path ของ APK ไว้ Appium จะติดตั้งแอปให้ก่อนเริ่ม session (เหมาะกับ CI)
    apk_path = os.getenv("ANDROID_APP_PATH")
    if apk_path:
        options.app = apk_path

    return options
