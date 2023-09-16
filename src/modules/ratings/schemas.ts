import { z } from 'zod'

export const ratingFormSchema = z.object({
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
    .min(1, 'Nota deve ser no mínimo 1')
    .max(5, 'Nota deve ser no máximo 5')
})

export type RatingFormSchema = z.infer<typeof ratingFormSchema>

export const createRatingRequestBodySchema = ratingFormSchema.extend({
  bookId: z.string()
})
