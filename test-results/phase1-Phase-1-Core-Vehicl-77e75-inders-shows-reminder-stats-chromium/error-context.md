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
      - link "Add Vehicle" [ref=e22] [cursor=pointer]:
        - /url: /add-vehicle
        - img [ref=e23]
        - generic [ref=e25]: Add Vehicle
      - link "Fuel Log" [ref=e26] [cursor=pointer]:
        - /url: /fuel-log
        - img [ref=e27]
        - generic [ref=e30]: Fuel Log
      - link "Expenses" [ref=e31] [cursor=pointer]:
        - /url: /expenses
        - img [ref=e32]
        - generic [ref=e35]: Expenses
      - link "Reminders" [ref=e36] [cursor=pointer]:
        - /url: /reminders
        - img [ref=e37]
        - generic [ref=e40]: Reminders
      - link "Service History" [ref=e41] [cursor=pointer]:
        - /url: /service-history
        - img [ref=e42]
        - generic [ref=e44]: Service History
    - generic [ref=e45]:
      - generic [ref=e46]: test@example.com
      - button "Logout" [ref=e47] [cursor=pointer]:
        - img [ref=e48]
        - generic [ref=e51]: Logout
  - main [ref=e52]:
    - generic [ref=e53]:
      - generic [ref=e54]:
        - generic [ref=e55]:
          - heading "Service Reminders" [level=1] [ref=e56]
          - paragraph [ref=e57]: Never miss a service again
        - button "Add Reminder" [ref=e58] [cursor=pointer]:
          - img [ref=e59]
          - text: Add Reminder
      - generic [ref=e60]:
        - generic [ref=e61]:
          - generic [ref=e62]: Overdue
          - generic [ref=e63]: "0"
        - generic [ref=e64]:
          - generic [ref=e65]: Due Soon
          - generic [ref=e66]: "1"
        - generic [ref=e67]:
          - generic [ref=e68]: Upcoming
          - generic [ref=e69]: "2"
      - generic [ref=e70]:
        - generic [ref=e71]:
          - heading "All Reminders" [level=3] [ref=e72]
          - generic [ref=e74]:
            - img [ref=e75]
            - text: Auto-reminders enabled
        - generic [ref=e78]:
          - generic [ref=e79]:
            - img [ref=e81]
            - generic [ref=e83]:
              - generic [ref=e84]: Oil Change
              - generic [ref=e85]: "Toyota Camry • Due: Apr 15, 2026"
              - generic [ref=e86]:
                - img [ref=e87]
                - text: "Odometer: 46,000 km • 3 months recurring"
            - generic [ref=e89]: Scheduled
            - button "Mark Done" [ref=e90] [cursor=pointer]:
              - img [ref=e91]
              - text: Mark Done
          - generic [ref=e94]:
            - img [ref=e96]
            - generic [ref=e98]:
              - generic [ref=e99]: Tire Rotation
              - generic [ref=e100]: "Honda Civic • Due: Apr 20, 2026"
              - generic [ref=e101]:
                - img [ref=e102]
                - text: "Odometer: 33,000 km • 5 months recurring"
            - generic [ref=e104]: Scheduled
            - button "Mark Done" [ref=e105] [cursor=pointer]:
              - img [ref=e106]
              - text: Mark Done
          - generic [ref=e109]:
            - img [ref=e111]
            - generic [ref=e113]:
              - generic [ref=e114]: Brake Inspection
              - generic [ref=e115]: "Toyota Camry • Due: Apr 10, 2026"
              - generic [ref=e116]:
                - img [ref=e117]
                - text: "Odometer: 45,500 km • 6 months recurring"
            - generic [ref=e119]: Due Soon
            - button "Mark Done" [ref=e120] [cursor=pointer]:
              - img [ref=e121]
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