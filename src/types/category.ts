import type { categories } from '@/db/schema'
import type { InferSelectModel } from 'drizzle-orm'

export type Category = InferSelectModel<typeof categories>
