import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

import { Input } from '../ui/input'
import { inputFields } from '@/components/form/form-input-fields'
import { Separator } from '../ui/separator'
import { FormCurrencyInput } from './form-currency-input'

import { FormCategoryList } from './form-category-list'
import { useFormContext } from 'react-hook-form'
import type { ProductSchema } from '@/schemas/product-schema'

export function ProductForm() {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<ProductSchema>()

  return (
    <div className="space-y-5 px-5 pb-4">
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categoria</FormLabel>
            <FormCategoryList
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isSubmitting}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />

      {inputFields.map((inputField) => (
        <FormField
          key={inputField.name}
          control={control}
          name={inputField.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{inputField.label}</FormLabel>
              <FormControl>
                <Input
                  type={inputField.type}
                  placeholder={inputField.placeholder}
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}

      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preço</FormLabel>
            <FormControl>
              <FormCurrencyInput isDisabled={isSubmitting} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
