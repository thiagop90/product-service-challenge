'use client'

import { ProductCreateForm } from '@/components/form/product-create-form'
import { getProducts } from '@/services/product-service'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 sm:px-10 min-h-dvh border-x">
      <div className="pb-2 border-b flex justify-between">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Product Service
        </h2>

        <ProductCreateForm />
      </div>

      <div className="py-6">
        <pre className="w-full rounded-md bg-muted p-4 overflow-x-auto">
          <code className="text-sm sm:text-base">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      </div>
    </main>
  )
}
