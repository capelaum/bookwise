import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getAuthSession } from './lib/auth'

export async function middleware(req: NextRequest) {
  const session = await getAuthSession()

  if (!session || !session.user) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
}

export const config = {
  matcher: ['/profile/:id']
}
