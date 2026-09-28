from robot.api.deco import keyword, library
from robot.api import logger


@library
class SauceDemoHelper:
    """Custom library for SauceDemo - Price Calculation and Business Login."""

    ROBOT_LIBRARY_SCOPE = 'GLOBAL'
    TAX_RATE = 0.08
    VALID_USERS = [
        'standard_user',
        'locked_out_user',
        'problem_user',
        'performance_glitch_user',
        'error_user',
        'visitor_user',
    ]

    @keyword('Parse Price String To Float')
    def parse_price(self, price_text) -> float:
        """Parses a price string (for example, '$29.99') and returns the float value."""
        try:
            price_value = float(str(price_text).replace('$', '').strip())
            logger.info(f"Parsed price: {price_value} from text: {price_text}")
            return price_value
        except ValueError as e:
            logger.error(f"Error parsing price from text '{price_text}': {e}")
            raise

    @keyword('Calculate Total Price')
    def calculate_total_price(self, item_prices):
        """Calculates the total price including tax for a list of item prices."""
        subtotal = sum(float(price) for price in item_prices)
        tax = subtotal * self.TAX_RATE
        total_price = subtotal + tax
        logger.info(f"Subtotal: {subtotal}, Tax: {tax}, Total Price: {total_price}")
        return total_price

    @keyword('Calculate Expected Total With Tax')
    def calculate_total_with_tax(self, *item_prices) -> float:
        """Calculates the total price including tax from each item price."""
        subtotal = sum(float(price) for price in item_prices)
        tax = round(subtotal * self.TAX_RATE, 2)
        total = round(subtotal + tax, 2)
        logger.info(f'Subtotal: ${subtotal}, Tax: ${tax}, Total: ${total}')
        return total

    @keyword('Username Should Be Valid SauceDemo User')
    def verify_valid_user(self, username):
        """Validates that the username is in the accepted SauceDemo test-user list."""
        if username not in self.VALID_USERS:
            raise AssertionError(
                f'{username} is not a recognized SauceDemo test user'
            )
        logger.info(f'{username} is a valid SauceDemo user')

    @keyword('Get User Expected Behavior')
    def get_expected_behavior(self, username) -> str:
        """Returns the expected behavior for each SauceDemo test user."""
        behaviors = {
            'standard_user': 'normal',
            'locked_out_user': 'locked',
            'problem_user': 'ui_glitches',
            'performance_glitch_user': 'slow_response',
            'error_user': 'errors_on_actions',
            'visitor_user': 'visitor_flow',
        }
        return behaviors.get(username, 'unknown')