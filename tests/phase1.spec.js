import { test, expect } from '@playwright/test';

test.describe('Phase 1: Core Vehicle Management', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/');
  });

  // F1: User Authentication
  test.describe('F1: Authentication', () => {
    test('login page has required fields', async ({ page }) => {
      await page.goto('/login');
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('can navigate from login to register', async ({ page }) => {
      await page.goto('/login');
      await page.click('text=Sign up');
      await expect(page).toHaveURL(/\/register/);
    });

    test('shows error for empty fields', async ({ page }) => {
      await page.goto('/login');
      await page.fill('input[type="password"]', 'password123');
      await page.click('button[type="submit"]');
      await expect(page.locator('text=Email is required')).toBeVisible();
    });
  });

  // F2: Vehicle CRUD
  test.describe('F2: Vehicles', () => {
    test('vehicles page loads', async ({ page }) => {
      await page.goto('/vehicles');
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('.vehicle-card').first()).toBeVisible();
    });

    test('add vehicle page loads', async ({ page }) => {
      await page.goto('/add-vehicle');
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  // F3: Dashboard
  test.describe('F3: Dashboard', () => {
    test('dashboard loads with stats', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('.stats-grid, .stat-card').first()).toBeVisible();
    });

    test('dashboard shows welcome', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('h1')).toBeVisible();
    });

    test('sidebar navigation works', async ({ page }) => {
      await page.goto('/');
      await page.click('text=My Vehicles');
      await expect(page).toHaveURL(/\/vehicles/);
    });
  });

  // F4: Service History
  test.describe('F4: Service History', () => {
    test('service history page loads', async ({ page }) => {
      await page.goto('/service-history');
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  // F5: Fuel Log
  test.describe('F5: Fuel Log', () => {
    test('fuel log page loads', async ({ page }) => {
      await page.goto('/fuel-log');
      await expect(page.locator('h1')).toBeVisible();
    });

    test('fuel stats visible', async ({ page }) => {
      await page.goto('/fuel-log');
      await expect(page.locator('text=This Month')).toBeVisible();
    });
  });

  // F6: Expense Tracking
  test.describe('F6: Expenses', () => {
    test('expenses page loads', async ({ page }) => {
      await page.goto('/expenses');
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  // F7: Service Reminders
  test.describe('F7: Service Reminders', () => {
    test('reminders page loads', async ({ page }) => {
      await page.goto('/reminders');
      await expect(page.locator('h1')).toBeVisible();
    });

    test('shows reminder stats', async ({ page }) => {
      await page.goto('/reminders');
      await expect(page.locator('text=Overdue')).toBeVisible();
      await expect(page.locator('text=Due Soon')).toBeVisible();
    });
  });

  // Navigation Tests
  test.describe('Navigation', () => {
    test('can navigate to all pages', async ({ page }) => {
      await page.goto('/');
      
      await page.click('text=My Vehicles');
      await expect(page).toHaveURL(/\/vehicles/);
      
      await page.click('text=Fuel Log');
      await expect(page).toHaveURL(/\/fuel-log/);
      
      await page.click('text=Expenses');
      await expect(page).toHaveURL(/\/expenses/);
      
      await page.click('text=Reminders');
      await expect(page).toHaveURL(/\/reminders/);
    });

    test('logout works', async ({ page }) => {
      await page.goto('/');
      await page.click('text=Logout');
      await expect(page).toHaveURL(/\/login/);
    });
  });
});
