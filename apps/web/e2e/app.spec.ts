import { test, expect } from '@playwright/test';

test.describe('课题分离练习卡牌 Web App', () => {
  test('首页显示标题和快捷入口', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('课题分离');
    await expect(page.locator('text=厘清边界')).toBeVisible();
    await expect(page.locator('text=随机抽取一张')).toBeVisible();
    await expect(page.locator('text=浏览全部卡牌')).toBeVisible();
  });

  test('首页显示底部导航四个入口', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav.locator('text=首页')).toBeVisible();
    await expect(nav.locator('text=抽取')).toBeVisible();
    await expect(nav.locator('text=浏览')).toBeVisible();
    await expect(nav.locator('text=收藏')).toBeVisible();
  });

  test('抽取页面 - 初始显示空状态', async ({ page }) => {
    await page.goto('/draw');
    await expect(page.locator('text=点击抽取一张卡牌')).toBeVisible();
    await expect(page.locator('text=开始抽取')).toBeVisible();
  });

  test('抽取页面 - 点击开始抽取显示卡片', async ({ page }) => {
    await page.goto('/draw');
    await page.locator('text=开始抽取').click();
    // Wait for shuffle to complete (~1.5s)
    await page.waitForTimeout(2000);
    // Should show a card with a title
    await expect(page.locator('.font-serif.text-2xl')).toBeVisible();
    await expect(page.locator('text=点击翻转')).toBeVisible();
  });

  test('浏览页面 - 显示全部120张卡牌', async ({ page }) => {
    await page.goto('/browse');
    await expect(page.locator('text=120 张卡牌')).toBeVisible();
  });

  test('浏览页面 - 维度Tab筛选', async ({ page }) => {
    await page.goto('/browse');
    await page.locator('text=识别与觉察').click();
    await expect(page.locator('text=24 张卡牌')).toBeVisible();

    await page.locator('text=建立边界').click();
    await expect(page.locator('text=24 张卡牌')).toBeVisible();
  });

  test('浏览页面 - 点击卡片进入详情', async ({ page }) => {
    await page.goto('/browse');
    await page.locator('text=害怕冲突').click();
    // Should show the card detail view with flip
    await expect(page.locator('text=核心解法')).toBeVisible();
    await expect(page.locator('text=返回列表')).toBeVisible();
  });

  test('收藏页面 - 初始为空', async ({ page }) => {
    await page.goto('/favorites');
    await expect(page.locator('text=还没有收藏卡牌')).toBeVisible();
  });

  test('底部导航切换', async ({ page }) => {
    await page.goto('/');
    // Go to draw
    await page.locator('nav').locator('text=抽取').click();
    await expect(page).toHaveURL('/draw');

    // Go to browse
    await page.locator('nav').locator('text=浏览').click();
    await expect(page).toHaveURL('/browse');

    // Go to favorites
    await page.locator('nav').locator('text=收藏').click();
    await expect(page).toHaveURL('/favorites');

    // Back to home
    await page.locator('nav').locator('text=首页').click();
    await expect(page).toHaveURL('/');
  });
});
