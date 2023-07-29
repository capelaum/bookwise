import { api } from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { CategoryTagSkeleton } from './Skeletons/CategoryTagSkeleton'
import { Tag } from './ui/Tag'

export type Category = {
  id: string
  name: string
}

interface CategoriesFiltersProps {
  categoryId: string
  setCategoryId: (selectedCategory: string) => void
}

export function CategoriesFilters({
  categoryId,
  setCategoryId
}: CategoriesFiltersProps) {
  const { isLoading, data: categories } = useQuery(['categories'], async () => {
    const { data: categories } = await api('/api/categories')

    return categories as Category[]
  })

  const queryClient = useQueryClient()

  if (isLoading) {
    return <CategoryTagSkeleton />
  }

  return categories?.map((category) => (
    <Tag
      key={category.id}
      text={category.name}
      active={category.id === categoryId}
      onClick={async () => {
        setCategoryId(category.id)
        await queryClient.invalidateQueries(['books', 'categories'])
      }}
    />
  ))
}
