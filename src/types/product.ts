import type { products } from '@/db/schema'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export type ProductResponse = InferSelectModel<typeof products>

export type ProductRequest = InferInsertModel<typeof products>
