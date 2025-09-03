import re
from playwright.sync_api import sync_playwright, Page, expect

def verify_dark_mode(page: Page):
    """
    This test verifies that the dark mode is applied correctly.
    """
    # 1. Arrange: Go to the homepage.
    page.goto("http://localhost:3000", wait_until="networkidle")

    # Wait for the main content to be visible to ensure the page is loaded
    page.wait_for_selector("main")

    # 2. Act: Check if dark mode is already enabled, if not, enable it.
    # The theme is applied client-side, so we might need to wait a bit.
    try:
        expect(page.locator("html")).to_have_class(re.compile(r'\bdark\b'), timeout=2000)
        print("Dark mode is already enabled.")
    except AssertionError:
        print("Dark mode not enabled, clicking toggle.")
        # There are two theme toggle buttons (desktop and mobile), so we select the first one.
        theme_toggle_button = page.get_by_title("Switch to dark mode").first
        expect(theme_toggle_button).to_be_visible()
        theme_toggle_button.click()

    # 3. Assert: Wait for the dark class to be applied
    expect(page.locator("html")).to_have_class(re.compile(r'\bdark\b'))

    # 4. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_dark_mode(page)
        finally:
            browser.close()
