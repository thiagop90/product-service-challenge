import { ProductCreateForm } from '@/components/form/product-create-form'

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10 sm:px-10 min-h-dvh border-x">
      <div className="pb-2 border-b flex justify-between">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Product Service
        </h2>

        <ProductCreateForm />
      </div>
    </main>
  )
}
