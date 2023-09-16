import { SimpleRating } from '@/types/app'
import clsx, { ClassValue } from 'clsx'
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUserNameInitials = (name: string) => {
  const nameArray = name.split(' ')

  if (nameArray.length === 0) {
    return ''
  }

  if (nameArray.length === 1) {
    return (name[0] + name[1]).toUpperCase()
  }

  return (
    nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0)
  ).toUpperCase()
}

export const getUserFirstName = (name: string) => {
  const nameArray = name.split(' ')

  if (nameArray.length === 0) {
    return ''
  }

  return nameArray[0]
}

export function createArrayFrom1ToN(n: number) {
  return Array.from({ length: n }, (_, index) => index + 1)
}

export function getAverageRating(ratings: SimpleRating[]) {
  const sumRatings = ratings.reduce((acc, rating) => acc + rating.rate, 0)
  const averageRating = Math.round(sumRatings / ratings.length)

  return averageRating
}

export function formatDatetimeToBrazilianFormat(dbDatetime: Date): string {
  const brazilianTimezone = 'America/Sao_Paulo'
  const brazilianDatetime = utcToZonedTime(dbDatetime, brazilianTimezone)

  const brazilianDatetimeStr = format(brazilianDatetime, 'dd/MM/yy - HH:mm')

  return brazilianDatetimeStr
}
