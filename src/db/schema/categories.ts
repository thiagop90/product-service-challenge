import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { ulid } from 'ulid'
import { products } from './products'

export const categories = pgTable('categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => ulid()),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  updatedAt: timestamp('updated_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products, {
    relationName: 'productCategory',
  }),
}))
