import { db } from './connection'
import { categories } from './schema'

await db.delete(categories)

async function seedDatabase() {
  try {
    await db.insert(categories).values({
      id: '01JWMH3FW1H3NDEK49AQWB8AVB',
      name: 'Category Test',
    })
  } catch (error) {
    console.error(error)
  }
}

seedDatabase().then(() => {
  console.log('✔ Database seeded successfully!')
  process.exit(0)
})
