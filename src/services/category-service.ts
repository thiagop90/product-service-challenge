import type { CategoryResponse } from '@/types/category'

export async function getCategories(): Promise<{
  categories: CategoryResponse[]
  count: number
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
  return res.json()
}
