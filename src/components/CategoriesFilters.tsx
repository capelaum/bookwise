import { getCategories } from '@/modules/categories/api'
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
  const { isLoading, data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
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
            onClick={() => setCategoryId(category.id)}
          />
        ))
      )}
    </div>
  )
}
