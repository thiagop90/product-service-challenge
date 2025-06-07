import { db } from '@/db'
import { categories } from '@/db/schema'
import { NextResponse } from 'next/server'

export async function GET() {
  const allCategories = await db.select().from(categories)

  if (allCategories.length === 0) {
    return NextResponse.json({ error: 'No Category found.' }, { status: 404 })
  }

  return NextResponse.json({
    categories: allCategories,
    count: allCategories.length,
  })
}
