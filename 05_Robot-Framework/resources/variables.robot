*** Variables ***

#====== Environment Config ======#
${ENV}                 dav
${BASE_URL}            https://www.saucedemo.com
${BROWSER}             chrome
${TIMEOUT}             15s
${SCREENSHOT_DIR}      results/screenshots


#====== Test Credentials - Password เดียวกันทุก User ======#
${PASSWORD}             secret_sauce

# === User Types (ตามที่ saucedemo รองรับ) === #
${STANDARD_USER}            standard_user
${LOCKED_OUT_USER}          locked_out_user
${PROBLEM_USER}             problem_user
${PERFORMANCE_GLITCH_USER}  performance_glitch_user
${ERROR_USER}               error_user
${VISUAL_USER}              visual_user

# === Key Page Paths === #
${INVENTORY_URL}            ${BASE_URL}/inventory.html
${CART_URL}                 ${BASE_URL}/cart.html
${CHECKOUT_STEP_ONE}        ${BASE_URL}/checkout-step-one.html
${CHECKOUT_STEP_TWO}        ${BASE_URL}/checkout-step-two.html
${CHECKOUT_COMPLETE}        ${BASE_URL}/checkout-complete.html 

# === Override ด้วย command line === #
# robot --variable BROWSER:firefox --variable ENV:staging tests\