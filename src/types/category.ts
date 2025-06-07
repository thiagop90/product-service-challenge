import type { categories } from '@/db/schema'
import type { InferSelectModel } from 'drizzle-orm'

export type CategoryResponse = InferSelectModel<typeof categories>
