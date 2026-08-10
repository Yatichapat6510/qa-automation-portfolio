//เขียน locator สำหรับ (1) สินค้าทั้งหมด (2) "Sauce Labs Backpack" (3) ราคา (4) Add to cart

// 1. สินค้าทั้งหมด

page.locator('product-item')             // list ทั้งหมด
page.getByRole('listitem')               // semantic

// 2. Sauce Labs Backpack item

page.getByRole('listitem')
    .filter({ hasText: 'Sauce Labs Backpack' })

// 3. ราคาสินค้าทั้งหมด (array)

page.locator('price')
await page.locator('price').allTextContents()   // ['$29.99', ...]

// 4. Add to cart ของ Backpack โดยเฉพาะ

page.locator('[data-test="add-to-cart-backpack"]')      // ✅ Best
page.getByRole('listitem')
    .filter({ hasText: 'Sauce Labs Backpack' })
    .getByRole('button', { name: 'Add to cart' })       // ✅ Best

