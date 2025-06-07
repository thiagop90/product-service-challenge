'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '../ui/button'
import { Plus, Save, Loader2 } from 'lucide-react'

import { ProductForm } from './form-fields'
import { ScrollArea } from '../ui/scroll-area'

import { productSchema, type ProductSchema } from '@/schemas/product-schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '@/services/product-service'
import { Form } from '../ui/form'
import { useState } from 'react'

export function ProductCreateForm() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      producerName: '',
      producerEmail: '',
      cover: '',
      thumbnail: '',
      price: 1,
    },
  })

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  async function onSubmit(values: ProductSchema) {
    try {
      await createProductFn({
        categoryId: values.category,
        name: values.name,
        description: values.description,
        producerName: values.producerName,
        producerEmail: values.producerEmail,
        cover: values.cover,
        thumbnail: values.thumbnail,
        price: values.price.toFixed(2),
      })

      form.reset()
      setOpen(false)
      toast.success('Produto criado com sucesso!')
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro inesperado ao criar produto'

      toast.error(errorMessage)
    }
  }

  const {
    formState: { isSubmitting },
  } = form

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      dismissible={!isSubmitting}
      direction="right"
    >
      <DrawerTrigger asChild>
        <Button className="rounded-full">
          <Plus />
          Adicionar Produto
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-5">
          <DrawerTitle>Adicionar um produto</DrawerTitle>
          <DrawerDescription>
            Preencha os campos abaixo para criação de um novo produto.
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="overflow-hidden">
          <Form {...form}>
            <form id="product-form" onSubmit={form.handleSubmit(onSubmit)}>
              <ProductForm />
            </form>
          </Form>
        </ScrollArea>

        <DrawerFooter className="border-t px-5">
          <DrawerClose asChild>
            <Button
              type="button"
              className="rounded-full"
              variant="outline"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </DrawerClose>

          <Button
            type="submit"
            form="product-form"
            className="rounded-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />}
            Salvar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
