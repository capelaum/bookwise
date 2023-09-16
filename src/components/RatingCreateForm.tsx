'use client'

import { Check, CheckCircle, X } from '@/components/Icons'
import { toast } from '@/hooks/use-toast'
import { useRatingMutations } from '@/modules/ratings/hooks'
import { RatingFormSchema, ratingFormSchema } from '@/modules/ratings/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Session } from 'next-auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AvatarProfile } from './AvatarProfile'
import { ButtonIcon } from './ui/ButtonIcon'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/Form'
import { Stars } from './ui/Stars'
import { Text } from './ui/Text'
import { Textarea } from './ui/Textarea'

interface RatingCreateFormProps {
  bookId: string
  setIsCreateRatingFormOpen: (isCreateRatingFormOpen: boolean) => void
  user: Session['user']
}

export function RatingCreateForm({
  bookId,
  setIsCreateRatingFormOpen,
  user
}: RatingCreateFormProps) {
  const [hover, setHover] = useState(0)

  const { createRatingMutation } = useRatingMutations()

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

  async function handleCreateRating(data: RatingFormSchema) {
    try {
      const { rate, description } = data

      await createRatingMutation.mutateAsync({
        rate,
        description,
        bookId
      })

      toast({
        title: 'Avaliação feita!',
        description: (
          <div className="mt-2 flex items-center gap-2 ">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="leading-none">Tudo pronto</span>
          </div>
        )
      })

      reset()
      handleCloseCreateRatingForm()
    } catch (error) {
      toast({
        title: '❌ Ocorreu um erro ao criar a avaliação',
        description: 'Por favor tente novamente mais tarde',
        variant: 'destructive'
      })
    }
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
