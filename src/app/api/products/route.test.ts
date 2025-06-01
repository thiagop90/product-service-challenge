import { testApiHandler } from 'next-test-api-route-handler'
import * as appHandler from './route'
import { db } from '@/db/connection'

jest.mock('@/db/connection', () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
  },
}))

jest.mock('@/db/schema', () => ({
  categories: { id: 'categories.id' },
  products: {
    name: 'products.name',
    producerName: 'products.producerName',
  },
}))

jest.mock('drizzle-orm', () => ({
  eq: jest.fn(),
  ilike: jest.fn(),
  or: jest.fn(),
}))

const mockDb = db as jest.Mocked<typeof db>

describe('/api/products', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /api/products', () => {
    const productBody = {
      categoryId: 1,
      name: 'Produto Teste',
      description: 'Descrição do produto teste',
      producerName: 'Produtor Teste',
      producerEmail: 'produtor@teste.com',
      cover: 'https://exemplo.com/cover.jpg',
      thumbnail: 'https://exemplo.com/thumb.jpg',
      price: 99.99,
    }

    it('should create a product successfully', async () => {
      const mockSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest
            .fn()
            .mockResolvedValue([{ id: 1, name: 'Categoria Teste' }]),
        }),
      })

      const mockInsert = jest.fn().mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([
            {
              id: 1,
              ...productBody,
              updatedAt: new Date(),
              createdAt: new Date(),
            },
          ]),
        }),
      })

      mockDb.select.mockReturnValue(mockSelect())
      mockDb.insert.mockReturnValue(mockInsert())

      await testApiHandler({
        appHandler,
        test: async ({ fetch }) => {
          const response = await fetch({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productBody),
          })

          const json = await response.json()

          expect(response.status).toBe(201)
          expect(json).toHaveProperty('id')
          expect(json.categoryId).toBe(productBody.categoryId)
          expect(json.description).toBe(productBody.description)
          expect(json.producerName).toBe(productBody.producerName)
          expect(json.producerEmail).toBe(productBody.producerEmail)
          expect(json.cover).toBe(productBody.cover)
          expect(json.thumbnail).toBe(productBody.thumbnail)
          expect(json.price).toBe(productBody.price)
          expect(json).toHaveProperty('createdAt')
          expect(json).toHaveProperty('updatedAt')
        },
      })
    })

    it('should return 400 when required fields are missing', async () => {
      const incompleteData = {
        name: 'Produto Teste',
        description: 'Descrição',
      }

      await testApiHandler({
        appHandler,
        test: async ({ fetch }) => {
          const response = await fetch({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(incompleteData),
          })

          const json = await response.json()

          expect(response.status).toBe(400)
          expect(json.error).toContain(
            'Missing required fields: categoryId, producerName, producerEmail, cover, thumbnail, price',
          )
        },
      })
    })

    it('should return 404 when category does not exist', async () => {
      const mockSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([]),
        }),
      })

      mockDb.select.mockReturnValue(mockSelect())

      await testApiHandler({
        appHandler,
        test: async ({ fetch }) => {
          const response = await fetch({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...productBody,
              categoryId: 999,
            }),
          })

          const json = await response.json()

          expect(response.status).toBe(404)
          expect(json.error).toBe('Category not found.')
        },
      })
    })
  })

  describe('GET /api/products', () => {
    const mockProducts = [
      {
        id: 1,
        categoryId: 1,
        name: 'Produto Maçã',
        description: 'Descrição do Produto Maça',
        producerName: 'Producer Maçã',
        producerEmail: 'producer@email.com',
        cover: 'cover1.jpg',
        thumbnail: 'thumb1.jpg',
        price: 100,
      },
      {
        id: 2,
        categoryId: 2,
        name: 'Produto Banana',
        description: 'Descrição do Produto Banana',
        producerName: 'Produtor Banana',
        producerEmail: 'producer@email.com',
        cover: 'cover2.jpg',
        thumbnail: 'thumb2.jpg',
        price: 50,
      },
    ]

    it('should return products when search matches product name', async () => {
      const mockSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([mockProducts[0]]),
        }),
      })

      mockDb.select.mockReturnValue(mockSelect())

      await testApiHandler({
        appHandler,
        url: '?search=Maça',
        test: async ({ fetch }) => {
          const response = await fetch({
            method: 'GET',
          })

          const json = await response.json()

          expect(response.status).toBe(200)
          expect(json.products).toHaveLength(1)
          expect(json.products[0].name).toContain('Produto Maçã')
          expect(json.count).toBe(1)
        },
      })
    })

    it('should return products when search matches producer name', async () => {
      const mockSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([mockProducts[1]]),
        }),
      })

      mockDb.select.mockReturnValue(mockSelect())

      await testApiHandler({
        url: '?search=Produtor banana',
        appHandler,
        test: async ({ fetch }) => {
          const response = await fetch({
            method: 'GET',
          })

          const json = await response.json()

          expect(response.status).toBe(200)
          expect(json.products).toHaveLength(1)
          expect(json.products[0].producerName).toContain('Produtor Banana')
          expect(json.count).toBe(1)
        },
      })
    })

    it('should return multiple products when search matches multiple items', async () => {
      const mockSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue(mockProducts),
        }),
      })

      mockDb.select.mockReturnValue(mockSelect())

      await testApiHandler({
        appHandler,
        url: '?search=Produto',
        test: async ({ fetch }) => {
          const response = await fetch({
            method: 'GET',
          })

          const json = await response.json()

          expect(response.status).toBe(200)
          expect(json.products).toHaveLength(2)
          expect(json.count).toBe(2)
        },
      })
    })

    it('should return 404 when no products are found', async () => {
      const mockSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([]), // nenhum produto encontrado
        }),
      })

      mockDb.select.mockReturnValue(mockSelect())

      await testApiHandler({
        appHandler,
        url: '?search=ProdutoInexistente',
        test: async ({ fetch }) => {
          const response = await fetch({
            method: 'GET',
          })

          const json = await response.json()

          expect(response.status).toBe(404)
          expect(json.error).toBe("No products found for 'ProdutoInexistente'.")
        },
      })
    })

    it('should return all products if search parameter is empty', async () => {
      const mockSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue(mockProducts),
        }),
      })

      mockDb.select.mockReturnValue(mockSelect())

      await testApiHandler({
        appHandler,
        url: '?search=""',
        test: async ({ fetch }) => {
          const response = await fetch({
            method: 'GET',
          })

          const json = await response.json()

          expect(response.status).toBe(200)
          expect(json.products).toHaveLength(2)
          expect(json.count).toBe(2)
        },
      })
    })
  })
})
