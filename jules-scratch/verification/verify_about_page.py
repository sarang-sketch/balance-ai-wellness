from playwright.sync_api import sync_playwright, Page, expect

def verify_about_page(page: Page):
    """
    This test verifies that the 'Meet our team' section is removed from the about page.
    """
    # 1. Arrange: Go to the about page.
    page.goto("http://localhost:3000/about")

    # 2. Assert: Check that the 'Meet our team' heading is not present.
    team_heading = page.get_by_role("heading", name="Meet Our Team")
    expect(team_heading).not_to_be_visible()

    # 3. Scroll to the bottom of the page
    page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
    # wait for scroll to finish
    page.wait_for_timeout(1000)

    # 4. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/about_page_verification.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_about_page(page)
        finally:
            browser.close()
