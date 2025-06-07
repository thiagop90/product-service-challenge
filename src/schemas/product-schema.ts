import { z } from 'zod'

export const productSchema = z.object({
  category: z.string({
    required_error: 'Selecione uma categoria para o produto.',
  }),
  name: z.string().min(2, {
    message: 'O nome deve ter pelo menos 2 caracteres.',
  }),
  description: z.string().min(2, {
    message: 'A descrição deve ter pelo menos 2 caracteres.',
  }),
  producerName: z.string().min(2, {
    message: 'O nome do produtor deve ter pelo menos 2 caracteres.',
  }),
  producerEmail: z.string().email({
    message: 'Digite um email válido.',
  }),
  cover: z.string().url({
    message: 'Digite uma URL válida para a imagem de capa.',
  }),
  thumbnail: z.string().url({
    message: 'Digite uma URL válida para a miniatura.',
  }),
  price: z.number(),
})

export type ProductSchema = z.infer<typeof productSchema>
