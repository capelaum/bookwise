import { Check, X } from '@/components/Icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Session } from 'next-auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AvatarProfile } from './AvatarProfile'
import { ButtonIcon } from './ui/ButtonIcon'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/Form'
import { Stars } from './ui/Stars'
import { Text } from './ui/Text'
import { Textarea } from './ui/Textarea'

const ratingFormSchema = z.object({
  description: z
    .string({
      required_error: 'Avaliação é obrigatória',
      invalid_type_error: 'Avaliação deve ser um texto'
    })
    .trim()
    .min(2, 'Avaliação deve ter no mínimo 2 caracteres')
    .max(1000, 'Avaliação deve ter no máximo 1000 caracteres'),
  rate: z
    .number({
      required_error: 'Nota é obrigatória',
      invalid_type_error: 'Nota deve ser um número'
    })
    .positive('Nota deve ser um número positivo')
    .int('Nota deve ser um número inteiro')
    .gte(1, 'Nota deve ser no mínimo 1')
    .lte(5, 'Nota deve ser no máximo 5')
})

export type RatingFormSchema = z.infer<typeof ratingFormSchema>

interface RatingCreateFormProps {
  setIsCreateRatingFormOpen: (isCreateRatingFormOpen: boolean) => void
  user: Session['user']
}

export function RatingCreateForm({
  setIsCreateRatingFormOpen,
  user
}: RatingCreateFormProps) {
  const [hover, setHover] = useState(0)

  const form = useForm<RatingFormSchema>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      description: '',
      rate: 0
    }
  })

  const { watch, reset, setValue, formState, getValues, clearErrors } = form

  const { rate } = getValues()

  function handleCloseCreateRatingForm() {
    setValue('rate', 0)
    setIsCreateRatingFormOpen(false)
  }

  function handleSetRating(rating: number) {
    setValue('rate', rating)
    clearErrors('rate')
  }

  function handleCreateRating(data: RatingFormSchema) {
    console.log('💥 ~ data:', data)
  }

  return (
    <Form {...form}>
      <form
        className="rounded-lg bg-gray-700 p-6"
        onSubmit={form.handleSubmit(handleCreateRating)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <AvatarProfile
              name={user.name ?? ''}
              avatarUrl={user.avatar_url ?? null}
            />

            <Text>{user.name}</Text>
          </div>

          <Stars
            rating={rate}
            size="lg"
            variant="button"
            error={!!formState.errors.rate}
            hover={hover}
            setHover={setHover}
            handleSetRating={handleSetRating}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Escreva sua avaliação"
                  className="mb-3 mt-6"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <ButtonIcon title="Cancelar" onClick={handleCloseCreateRatingForm}>
            <X size={24} weight="regular" className="text-purple-100" />
          </ButtonIcon>

          <ButtonIcon title="Avaliar" type="submit">
            <Check size={24} weight="regular" className="text-green-100" />
          </ButtonIcon>
        </div>
      </form>
    </Form>
  )
}

export default RatingCreateForm
