import type { ProductSchema } from '@/schemas/product-schema'

export const inputFields = [
  {
    name: 'name' as keyof ProductSchema,
    label: 'Nome',
    type: 'text',
    placeholder: 'Nome do produto',
  },
  {
    name: 'description' as keyof ProductSchema,
    label: 'Descrição',
    type: 'text',
    placeholder: 'Descrição do produto',
  },
  {
    name: 'producerName' as keyof ProductSchema,
    label: 'Nome do Produtor',
    type: 'text',
    placeholder: 'Apple Inc.',
  },
  {
    name: 'producerEmail' as keyof ProductSchema,
    label: 'Email do Produtor',
    type: 'email',
    placeholder: 'email@exemplo.com',
  },
  {
    name: 'cover' as keyof ProductSchema,
    label: 'URL da Capa',
    placeholder: 'https://exemplo.com/capa.jpg',
    type: 'url',
  },
  {
    name: 'thumbnail' as keyof ProductSchema,
    label: 'URL da Thumbnail',
    placeholder: 'https://exemplo.com/thumb.jpg',
    type: 'url',
  },
]
