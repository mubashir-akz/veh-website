# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: phase1.spec.js >> Phase 1: Core Vehicle Management >> F7: Service Reminders >> shows reminder stats
- Location: tests/phase1.spec.js:105:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Due Soon')
Expected: visible
Error: strict mode violation: locator('text=Due Soon') resolved to 2 elements:
    1) <div class="stat-label">Due Soon</div> aka locator('div').filter({ hasText: /^Due Soon$/ })
    2) <span class="badge badge-warning">Due Soon</span> aka locator('span').filter({ hasText: 'Due Soon' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Due Soon')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - complementary [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]: V
      - generic [ref=e7]: Veh
    - navigation [ref=e8]:
      - link "Dashboard" [ref=e9] [cursor=pointer]:
        - /url: /
        - img [ref=e10]
        - generic [ref=e15]: Dashboard
      - link "My Vehicles" [ref=e16] [cursor=pointer]:
        - /url: /vehicles
        - img [ref=e17]
        - generic [ref=e21]: My Vehicles
      - link "Fuel Log" [ref=e22] [cursor=pointer]:
        - /url: /fuel-log
        - img [ref=e23]
        - generic [ref=e26]: Fuel Log
      - link "Expenses" [ref=e27] [cursor=pointer]:
        - /url: /expenses
        - img [ref=e28]
        - generic [ref=e31]: Expenses
      - link "Reminders" [ref=e32] [cursor=pointer]:
        - /url: /reminders
        - img [ref=e33]
        - generic [ref=e36]: Reminders
      - link "Service History" [ref=e37] [cursor=pointer]:
        - /url: /service-history
        - img [ref=e38]
        - generic [ref=e40]: Service History
    - generic [ref=e41]:
      - generic [ref=e42]: test@example.com
      - button "Logout" [ref=e43] [cursor=pointer]:
        - img [ref=e44]
        - generic [ref=e47]: Logout
  - text: ")}"
  - main [ref=e48]:
    - generic [ref=e49]:
      - generic [ref=e50]:
        - generic [ref=e51]:
          - heading "Service Reminders" [level=1] [ref=e52]
          - paragraph [ref=e53]: Never miss a service again
        - button "Add Reminder" [ref=e54] [cursor=pointer]:
          - img [ref=e55]
          - text: Add Reminder
      - generic [ref=e56]:
        - generic [ref=e57]:
          - generic [ref=e58]: Overdue
          - generic [ref=e59]: "0"
        - generic [ref=e60]:
          - generic [ref=e61]: Due Soon
          - generic [ref=e62]: "1"
        - generic [ref=e63]:
          - generic [ref=e64]: Upcoming
          - generic [ref=e65]: "2"
      - generic [ref=e66]:
        - generic [ref=e67]:
          - heading "All Reminders" [level=3] [ref=e68]
          - generic [ref=e70]:
            - img [ref=e71]
            - text: Auto-reminders enabled
        - generic [ref=e74]:
          - generic [ref=e75]:
            - img [ref=e77]
            - generic [ref=e79]:
              - generic [ref=e80]: Oil Change
              - generic [ref=e81]: "Toyota Camry • Due: Apr 15, 2026"
              - generic [ref=e82]:
                - img [ref=e83]
                - text: "Odometer: 46,000 km • 3 months recurring"
            - generic [ref=e85]: Scheduled
            - button "Mark Done" [ref=e86] [cursor=pointer]:
              - img [ref=e87]
              - text: Mark Done
          - generic [ref=e90]:
            - img [ref=e92]
            - generic [ref=e94]:
              - generic [ref=e95]: Tire Rotation
              - generic [ref=e96]: "Honda Civic • Due: Apr 20, 2026"
              - generic [ref=e97]:
                - img [ref=e98]
                - text: "Odometer: 33,000 km • 5 months recurring"
            - generic [ref=e100]: Scheduled
            - button "Mark Done" [ref=e101] [cursor=pointer]:
              - img [ref=e102]
              - text: Mark Done
          - generic [ref=e105]:
            - img [ref=e107]
            - generic [ref=e109]:
              - generic [ref=e110]: Brake Inspection
              - generic [ref=e111]: "Toyota Camry • Due: Apr 10, 2026"
              - generic [ref=e112]:
                - img [ref=e113]
                - text: "Odometer: 45,500 km • 6 months recurring"
            - generic [ref=e115]: Due Soon
            - button "Mark Done" [ref=e116] [cursor=pointer]:
              - img [ref=e117]
              - text: Mark Done
```

# Test source

```ts
  8   |     await page.fill('input[type="password"]', 'password123');
  9   |     await page.click('button[type="submit"]');
  10  |     await page.waitForURL('/');
  11  |   });
  12  | 
  13  |   // F1: User Authentication
  14  |   test.describe('F1: Authentication', () => {
  15  |     test('login page has required fields', async ({ page }) => {
  16  |       await page.goto('/login');
  17  |       await expect(page.locator('input[type="email"]')).toBeVisible();
  18  |       await expect(page.locator('input[type="password"]')).toBeVisible();
  19  |       await expect(page.locator('button[type="submit"]')).toBeVisible();
  20  |     });
  21  | 
  22  |     test('can navigate from login to register', async ({ page }) => {
  23  |       await page.goto('/login');
  24  |       await page.click('text=Sign up');
  25  |       await expect(page).toHaveURL(/\/register/);
  26  |     });
  27  | 
  28  |     test('shows error for empty fields', async ({ page }) => {
  29  |       await page.goto('/login');
  30  |       await page.fill('input[type="password"]', 'password123');
  31  |       await page.click('button[type="submit"]');
  32  |       await expect(page.locator('text=Email is required')).toBeVisible();
  33  |     });
  34  |   });
  35  | 
  36  |   // F2: Vehicle CRUD
  37  |   test.describe('F2: Vehicles', () => {
  38  |     test('vehicles page loads', async ({ page }) => {
  39  |       await page.goto('/vehicles');
  40  |       await expect(page.locator('h1')).toBeVisible();
  41  |       await expect(page.locator('.vehicle-card').first()).toBeVisible();
  42  |     });
  43  | 
  44  |     test('add vehicle page loads', async ({ page }) => {
  45  |       await page.goto('/add-vehicle');
  46  |       await expect(page.locator('h1')).toBeVisible();
  47  |     });
  48  |   });
  49  | 
  50  |   // F3: Dashboard
  51  |   test.describe('F3: Dashboard', () => {
  52  |     test('dashboard loads with stats', async ({ page }) => {
  53  |       await page.goto('/');
  54  |       await expect(page.locator('.stats-grid, .stat-card').first()).toBeVisible();
  55  |     });
  56  | 
  57  |     test('dashboard shows welcome', async ({ page }) => {
  58  |       await page.goto('/');
  59  |       await expect(page.locator('h1')).toBeVisible();
  60  |     });
  61  | 
  62  |     test('sidebar navigation works', async ({ page }) => {
  63  |       await page.goto('/');
  64  |       await page.click('text=My Vehicles');
  65  |       await expect(page).toHaveURL(/\/vehicles/);
  66  |     });
  67  |   });
  68  | 
  69  |   // F4: Service History
  70  |   test.describe('F4: Service History', () => {
  71  |     test('service history page loads', async ({ page }) => {
  72  |       await page.goto('/service-history');
  73  |       await expect(page.locator('h1')).toBeVisible();
  74  |     });
  75  |   });
  76  | 
  77  |   // F5: Fuel Log
  78  |   test.describe('F5: Fuel Log', () => {
  79  |     test('fuel log page loads', async ({ page }) => {
  80  |       await page.goto('/fuel-log');
  81  |       await expect(page.locator('h1')).toBeVisible();
  82  |     });
  83  | 
  84  |     test('fuel stats visible', async ({ page }) => {
  85  |       await page.goto('/fuel-log');
  86  |       await expect(page.locator('text=This Month')).toBeVisible();
  87  |     });
  88  |   });
  89  | 
  90  |   // F6: Expense Tracking
  91  |   test.describe('F6: Expenses', () => {
  92  |     test('expenses page loads', async ({ page }) => {
  93  |       await page.goto('/expenses');
  94  |       await expect(page.locator('h1')).toBeVisible();
  95  |     });
  96  |   });
  97  | 
  98  |   // F7: Service Reminders
  99  |   test.describe('F7: Service Reminders', () => {
  100 |     test('reminders page loads', async ({ page }) => {
  101 |       await page.goto('/reminders');
  102 |       await expect(page.locator('h1')).toBeVisible();
  103 |     });
  104 | 
  105 |     test('shows reminder stats', async ({ page }) => {
  106 |       await page.goto('/reminders');
  107 |       await expect(page.locator('text=Overdue')).toBeVisible();
> 108 |       await expect(page.locator('text=Due Soon')).toBeVisible();
      |                                                   ^ Error: expect(locator).toBeVisible() failed
  109 |     });
  110 |   });
  111 | 
  112 |   // Navigation Tests
  113 |   test.describe('Navigation', () => {
  114 |     test('can navigate to all pages', async ({ page }) => {
  115 |       await page.goto('/');
  116 |       
  117 |       await page.click('text=My Vehicles');
  118 |       await expect(page).toHaveURL(/\/vehicles/);
  119 |       
  120 |       await page.click('text=Fuel Log');
  121 |       await expect(page).toHaveURL(/\/fuel-log/);
  122 |       
  123 |       await page.click('text=Expenses');
  124 |       await expect(page).toHaveURL(/\/expenses/);
  125 |       
  126 |       await page.click('text=Reminders');
  127 |       await expect(page).toHaveURL(/\/reminders/);
  128 |     });
  129 | 
  130 |     test('logout works', async ({ page }) => {
  131 |       await page.goto('/');
  132 |       await page.click('text=Logout');
  133 |       await expect(page).toHaveURL(/\/login/);
  134 |     });
  135 |   });
  136 | });
  137 | 
```