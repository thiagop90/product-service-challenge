import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import type { SelectProps } from '@radix-ui/react-select'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/services/category-service'

export function FormCategoryList({ ...props }: SelectProps) {
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  return (
    <Select {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent>
        {data?.categories?.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
