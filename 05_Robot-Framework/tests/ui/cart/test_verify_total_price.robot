# *** Settings ***
# Documentation    Verify that total price in Checkout Overview matches selected products
# Resource         ../../../resources/ui_keywords.robot
# Resource         ../../../resources/price_keywords.robot


# *** Test Cases ***
# TC Verify Total Price For Multiple Products
#     [Documentation]    Login → Add 3 products → checkout to overview → verify total price
#     Login As Standard User

#     Add Product To Cart By Name    Sauce Labs Backpack
#     Add Product To Cart By Name    Sauce Labs Bike Light
#     Add Product To Cart By Name    Sauce Labs Bolt T-Shirt

#     Go To Cart
#     Proceed To Checkout
#     Fill Checkout Information    NewYear    Tester    10250

#     ${products}=    Create List    Sauce Labs Backpack    Sauce Labs Bike Light    Sauce Labs Bolt T-Shirt
#     Verify Total Price Is Correct    ${products}

#     [Teardown]    Close Browser

# TC Verify Total Price For Single Product
#     [Documentation]    Simple case — single product to isolate bugs easily if it fails
#     Login As Standard User

#     Add Product To Cart By Name    Sauce Labs Backpack

#     Go To Cart
#     Proceed To Checkout
#     Fill Checkout Information    NewYear    Tester    10250

#     Verify Total Price Is Correct    Sauce Labs Backpack




*** Settings ***
Documentation    Verify that total price in Checkout Overview matches selected products
Resource         ../../../resources/ui_keywords.robot
Resource         ../../../resources/price_keywords.robot

*** Test Cases ***
TC Verify Total Price For Multiple Products
    [Documentation]    Login -> Add 3 products -> checkout to overview -> verify total price
    Login As Standard User
    Add Product To Cart By Name    Sauce Labs Backpack
    Add Product To Cart By Name    Sauce Labs Bike Light
    Add Product To Cart By Name    Sauce Labs Bolt T-Shirt
    Go To Cart
    Proceed To Checkout
    Fill Checkout Information    NewYear    Tester    10250
    ${products}=    Create List    Sauce Labs Backpack    Sauce Labs Bike Light    Sauce Labs Bolt T-Shirt
    ${expected_total}=    Calculate Expected Total Price    @{products}
    Verify Total Price Is Correct    ${expected_total}
    [Teardown]    Close Browser

TC Verify Total Price For Single Product
    [Documentation]    Simple case - single product to isolate bugs easily if it fails
    Login As Standard User
    Add Product To Cart By Name    Sauce Labs Backpack
    Go To Cart
    Proceed To Checkout
    Fill Checkout Information    NewYear    Tester    10250
    ${products}=    Create List    Sauce Labs Backpack
    ${expected_total}=    Calculate Expected Total Price    @{products}
    Verify Total Price Is Correct    ${expected_total}
    [Teardown]    Close Browser