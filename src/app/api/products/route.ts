import { db } from '@/db'
import { categories, products } from '@/db/schema'
import { eq, ilike, or } from 'drizzle-orm'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const {
    categoryId,
    name,
    description,
    producerName,
    producerEmail,
    cover,
    thumbnail,
    price,
  } = body

  const requiredFields = [
    'categoryId',
    'name',
    'description',
    'producerName',
    'producerEmail',
    'cover',
    'thumbnail',
    'price',
  ]

  const missingFields = requiredFields.filter((field) => !body[field])

  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missingFields.join(', ')}` },
      { status: 400 },
    )
  }

  const category = await db
    .select()
    .from(categories)
    .where(eq(categories.id, categoryId))

  if (category.length === 0) {
    return NextResponse.json({ error: 'Category not found.' }, { status: 404 })
  }

  const product = await db
    .insert(products)
    .values({
      categoryId,
      name,
      description,
      producerName,
      producerEmail,
      cover,
      thumbnail,
      price,
    })
    .returning()

  return NextResponse.json(product[0], { status: 201 })
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search')

  if (!search) {
    const allProducts = await db.select().from(products)

    if (allProducts.length === 0) {
      return NextResponse.json({ error: 'No products found.' }, { status: 404 })
    }

    return NextResponse.json({
      products: allProducts,
      count: allProducts.length,
    })
  }

  const searchResults = await db
    .select()
    .from(products)
    .where(
      or(
        ilike(products.name, `%${search}%`),
        ilike(products.producerName, `%${search}%`),
      ),
    )

  if (searchResults.length === 0) {
    return NextResponse.json(
      { error: `No products found for '${search}'.` },
      { status: 404 },
    )
  }

  return NextResponse.json({
    products: searchResults,
    count: searchResults.length,
  })
}
