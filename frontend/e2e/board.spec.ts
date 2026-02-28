import { test, expect } from '@playwright/test'

test.describe('Kanban Board E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display all columns', async ({ page }) => {
    await expect(page.locator('text=Todo')).toBeVisible()
    await expect(page.locator('text=In Progress')).toBeVisible()
    await expect(page.locator('text=Review')).toBeVisible()
    await expect(page.locator('text=Done')).toBeVisible()
    await expect(page.locator('text=Backlog')).toBeVisible()
  })

  test('should display initial cards', async ({ page }) => {
    await expect(page.locator('text=Setup project')).toBeVisible()
    await expect(page.locator('text=Build components')).toBeVisible()
    await expect(page.locator('text=Code review')).toBeVisible()
  })

  test('should add a new card', async ({ page }) => {
    const addButtons = page.locator('button:has-text("+ Add")')
    await addButtons.first().click()

    const titleInput = page.locator('input[placeholder="Card title"]')
    await titleInput.fill('New Task')

    const saveButton = page.locator('button:has-text("Save")')
    await saveButton.first().click()

    await expect(page.locator('text=New Task')).toBeVisible()
  })

  test('should edit card title', async ({ page }) => {
    const cardTitle = page.locator('text=Setup project')
    await cardTitle.dblclick()

    const titleInput = page.locator('input[placeholder="Card title"]')
    await titleInput.clear()
    await titleInput.fill('Updated Task')

    const saveButton = page.locator('button:has-text("Save")')
    await saveButton.first().click()

    await expect(page.locator('text=Updated Task')).toBeVisible()
  })

  test('should edit card details', async ({ page }) => {
    const cardDetails = page.locator('text=Initialize repo and dependencies')
    await cardDetails.dblclick()

    const detailsInput = page.locator('textarea[placeholder="Card details (optional)"]')
    await detailsInput.clear()
    await detailsInput.fill('New details here')

    const saveButton = page.locator('button:has-text("Save")')
    await saveButton.first().click()

    await expect(page.locator('text=New details here')).toBeVisible()
  })

  test('should delete a card', async ({ page }) => {
    const cardTitle = page.locator('text=Setup project').first()
    const card = cardTitle.locator('..')

    const deleteButton = card.locator('button[aria-label="Delete card"]')
    await deleteButton.click()

    await expect(page.locator('text=Setup project')).not.toBeVisible()
  })

  test('should rename a column', async ({ page }) => {
    const columnTitle = page.locator('text=Todo').filter({ hasNot: page.locator('button') })
    await columnTitle.dblclick()

    const input = page.locator('input.column-header-input')
    await input.clear()
    await input.fill('New Column Name')
    await input.press('Enter')

    await expect(page.locator('text=New Column Name')).toBeVisible()
  })

  test('should cancel edit with escape key', async ({ page }) => {
    const addButtons = page.locator('button:has-text("+ Add")')
    await addButtons.first().click()

    const titleInput = page.locator('input[placeholder="Card title"]')
    await titleInput.fill('Test Task')
    await titleInput.press('Escape')

    await expect(page.locator('input[placeholder="Card title"]')).not.toBeVisible()
  })

  test('should close edit with close button', async ({ page }) => {
    const addButtons = page.locator('button:has-text("+ Add")')
    await addButtons.first().click()

    const closeButton = page.locator('button[aria-label="Close"]')
    await closeButton.click()

    await expect(page.locator('input[placeholder="Card title"]')).not.toBeVisible()
  })

  test('should drag card between columns', async ({ page }) => {
    const todoCol = page.locator('text=Setup project').first()
    const inProgressCol = page.locator('.cards').nth(1)

    await todoCol.dragTo(inProgressCol)
    await page.waitForTimeout(500)

    const cardsInProgress = inProgressCol.locator('.card')
    const cardTexts = await cardsInProgress.allTextContents()

    const hasSetupProject = cardTexts.some((text) =>
      text.includes('Setup project')
    )
    expect(hasSetupProject).toBeTruthy()
  })
})
