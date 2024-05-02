import { api } from '@/lib/axios'

interface SignUpProps {
  name: string
  email: string
  password: string
}

type SignUpResponse = {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  message?: string
}

async function signUp({ name, email, password }: SignUpProps) {
  const { status, data } = await api.post<SignUpResponse>('/users', { name, email, password })

  return { status, data }
}

type SignInProps = {
  email: string
  password: string
}

type SignInResponse = {
  token: string
  message?: string
  name?: string
}

async function signIn({ email, password }: SignInProps) {
  const { status, data } = await api.post<SignInResponse>('/sign-in', { email, password })

  return { status, data }
}

export { signUp, signIn }
