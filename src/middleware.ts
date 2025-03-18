import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
import { privateRoutes } from '@/routes'

const developmentUrl = 'http://localhost:3000'

//TODO changed when uploaded
const productionUrl = 'https://coolurl.com'

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
  const isLoggedIn = !!req.auth

  const { nextUrl } = req

  const isPrivateRoutes = privateRoutes.includes(nextUrl.pathname)
  const isAuthRoute = nextUrl.pathname.includes('/auth')
  const isApiRoute = nextUrl.pathname.includes('/api')

  if (isApiRoute) {
    return
  }

  if (isLoggedIn && isAuthRoute) {
    if (process.env.NODE_ENV === 'development') {
      return Response.redirect(`${developmentUrl}`)
    } else {
      return Response.redirect(`${productionUrl}`)
    }
  }

  if (isAuthRoute && !isLoggedIn) {
    return
  }

  if (!isLoggedIn && isPrivateRoutes) {
    if (process.env.NODE_ENV === 'development') {
      return Response.redirect(`${developmentUrl}/auth/login`)
    } else {
      return Response.redirect(`${productionUrl}/auth/login`)
    }
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
