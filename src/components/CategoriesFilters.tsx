import { api } from '@/lib/api'
import { Category } from '@/types/app'
import { useQuery } from '@tanstack/react-query'
import { CategoryTagSkeleton } from './Skeletons/CategoryTagSkeleton'
import { Tag } from './ui/Tag'

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

  return (
    <div className="mb-12 mt-10 flex flex-wrap gap-3">
      {isLoading ? (
        <CategoryTagSkeleton />
      ) : (
        categories?.map((category) => (
          <Tag
            key={category.id}
            text={category.name}
            active={category.id === categoryId}
            onClick={async () => setCategoryId(category.id)}
          />
        ))
      )}
    </div>
  )
}
