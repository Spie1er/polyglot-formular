'use server'

import { signIn } from '@/auth'
import { prisma } from '@/prisma/prisma'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'
// import { createAuthSession, destroySession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export type AuthFormState = {
  errors?: {
    email?: string
    password?: string
    name?: string
  }
  success?: string
}

const emailRegex = /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/

export const signup = async (
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> => {
  const email = formData.get('email')?.toString().trim().toLowerCase() || ''
  const name = formData.get('name')?.toString().trim() || ''
  const password = formData.get('password')?.toString().trim() || ''

  const errors = {
    email: !emailRegex.test(email) ? 'enterValidEmail' : undefined,
    password: !passwordRegex.test(password) ? 'enterValidPassword' : undefined,
    name: name.length < 2 ? 'enterValidName' : undefined
  }

  if (Object.values(errors).every((error) => error === undefined)) {
    try {
      //Hashing the pasword
      const hashedPssword = await bcrypt.hash(password, 10)

      //Checking the user in DB
      const userExists = await prisma.user.findFirst({
        where: {
          email
        }
      })

      if (userExists) {
        return {
          errors: {
            email: 'emailAlreadyExists'
          }
        }
      }

      //Creating an user
      await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPssword
        }
      })

      return { success: 'successUserCreation' }
    } catch (error) {
      throw error
    }
  } else {
    return {
      errors
    }
  }
}

export const login = async (
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> => {
  const email = formData.get('email')?.toString().trim().toLowerCase() || ''
  const password = formData.get('password')?.toString().trim() || ''

  const errors = {
    email: !emailRegex.test(email) ? 'enterValidEmail' : undefined,
    password: !passwordRegex.test(password) ? 'enterValidPassword' : undefined
  }

  if (Object.values(errors).every((error) => error === undefined)) {
    try {
      const userExists = await prisma.user.findFirst({
        where: {
          email
        }
      })

      if (!userExists || !userExists.password || !userExists.email) {
        return {
          errors: {
            email: 'noSuchUser'
          }
        }
      }

      await signIn('credentials', {
        email: userExists.email,
        password: password,
        redirectTo: '/'
      })
      return { success: 'loginSuccess' }
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return {
              errors: {
                password: 'invalidCredentials'
              }
            }
          default:
            return {
              errors: {
                email: 'confirmEmailAddress'
              }
            }
        }
      }
      throw error
    }
  } else {
    return {
      errors
    }
  }
}

export const logout = async (): Promise<void> => {
  //   await destroySession()
  redirect('/login')
}
