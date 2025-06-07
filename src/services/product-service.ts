import type { ProductRequest, ProductResponse } from '@/types/product'

export async function createProduct(data: ProductRequest) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export async function getProducts(): Promise<{
  products: ProductResponse[]
  count: number
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
  return res.json()
}
