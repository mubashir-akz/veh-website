import { test, expect } from '@playwright/test';

test.describe('Veh Website', () => {
  test('homepage loads without errors', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Veh/);
  });

  test('login page renders correctly', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('register page renders correctly', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('can navigate from login to register', async ({ page }) => {
    await page.goto('/login');
    await page.click('text=Sign up');
    await expect(page).toHaveURL(/\/register/);
  });
});
