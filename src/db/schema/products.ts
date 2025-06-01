import { decimal, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { ulid } from 'ulid'
import { categories } from './categories'
import { relations } from 'drizzle-orm'

export const products = pgTable('products', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => ulid()),
  categoryId: text('category_id')
    .references(() => categories.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  producerName: text('producer_name').notNull(),
  producerEmail: text('producer_email').notNull(),
  cover: text('cover').notNull(),
  thumbnail: text('thumbnail').notNull(),
  price: decimal('price').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
    relationName: 'productCategory',
  }),
}))
