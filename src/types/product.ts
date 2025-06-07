import type { products } from '@/db/schema'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export type Product = InferSelectModel<typeof products>

export type NewProduct = InferInsertModel<typeof products>
