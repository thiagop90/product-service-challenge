import { db } from '@/db/connection'
import { products } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const productId = (await params).id

  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))

  if (product.length === 0) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
  }

  return NextResponse.json(product[0])
}
