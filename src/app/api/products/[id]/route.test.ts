import { testApiHandler } from 'next-test-api-route-handler'
import { db } from '@/db/connection'
import * as appHandler from './route'

jest.mock('@/db/connection', () => ({
  db: {
    select: jest.fn(),
  },
}))

jest.mock('@/db/schema', () => ({
  products: {
    id: 'products.id',
  },
}))

jest.mock('drizzle-orm', () => ({
  eq: jest.fn(),
}))

const mockDb = db as jest.Mocked<typeof db>

describe('/api/products[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/products/[id]', () => {
    const mockProduct = {
      id: 1,
      categoryId: 1,
      name: 'Produto Teste',
      description: 'Descrição do produto teste',
      producerName: 'Produtor Teste',
      producerEmail: 'produtor@teste.com',
      cover: 'https://exemplo.com/cover.jpg',
      thumbnail: 'https://exemplo.com/thumb.jpg',
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    it('should return a product matching to the provided id', async () => {
      const mockSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([mockProduct]),
        }),
      })

      mockDb.select.mockReturnValue(mockSelect())

      await testApiHandler({
        appHandler,
        params: { id: '1' },
        test: async ({ fetch }) => {
          const response = await fetch({
            method: 'GET',
          })

          const json = await response.json()

          expect(response.status).toBe(200)
          expect(json.id).toBe(1)
          expect(json.categoryId).toBe(mockProduct.categoryId)
          expect(json.description).toBe(mockProduct.description)
          expect(json.producerName).toBe(mockProduct.producerName)
          expect(json.producerEmail).toBe(mockProduct.producerEmail)
          expect(json.cover).toBe(mockProduct.cover)
          expect(json.thumbnail).toBe(mockProduct.thumbnail)
          expect(json.price).toBe(mockProduct.price)
          expect(json).toHaveProperty('createdAt')
          expect(json).toHaveProperty('updatedAt')
        },
      })
    })

    it('should return 404 when product is not found', async () => {
      const mockSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([]),
        }),
      })

      mockDb.select.mockReturnValue(mockSelect())

      await testApiHandler({
        appHandler,
        params: { id: '999' },
        test: async ({ fetch }) => {
          const response = await fetch({
            method: 'GET',
          })

          const json: { error: string } = await response.json()

          expect(response.status).toBe(404)
          expect(json.error).toBe('Product not found.')
        },
      })
    })
  })
})
