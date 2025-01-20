import { Loader } from 'lucide-react'
import { FieldValues, useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { useRegisterUserMutation } from '@/service/crypton'

interface Props {
  className?: string
  modeToggle: VoidFunction
  login: (token: string) => void
}

const SignUp: React.FC<Props> = ({ className, modeToggle, login }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const passwordValue = useWatch({ control, name: 'password' })

  const [registerUser, { isLoading }] = useRegisterUserMutation()

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await registerUser(data).unwrap()
      login(res.token)
      toast.success('Успешный логин')
    } catch (e) {
      const err = e as FetchBaseQueryError
      if (err.status === 422) {
        toast.error('Email занят')
      } else {
        toast.error('Неизвестная ошибка')
      }
    }
  }

  const onInvalid = () => {
    if (errors.email && errors.email.type === 'required') toast.error('Email обязателен')
    else if (errors.email && errors.email.type === 'pattern') toast.error('Email некорректный')
    else if (errors.password && errors.password.type === 'minLength')
      toast.error('Password должен быть больше 6 символов')
    else if (errors.repeatPassword && errors.repeatPassword.type === 'validate') toast.error('Пароли должны совпадать')
  }

  return (
    <Card className={cn('flex flex-col gap-4 w-80', className)}>
      <CardHeader>
        <CardTitle className="text-2xl self-center">Регистрация</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <span>Email</span>
              <Input
                id="email"
                type="email"
                placeholder="Введите ваш Email"
                {...register('email', { required: true, pattern: /^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })}
              />
            </div>
            <div className="grid gap-2">
              <span className="">Password</span>
              <Input
                id="password"
                type="password"
                placeholder="Придумайте пароль"
                {...register('password', { required: true, minLength: 6 })}
              />
            </div>
            <div className="grid gap-2">
              <span className="">Repeat password</span>
              <Input
                id="repeatPassword"
                type="password"
                placeholder="Повторите пароль"
                {...register('repeatPassword', {
                  required: true,
                  minLength: 6,
                  validate: (value) => value === passwordValue,
                })}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
            >
              {isLoading ? <Loader className="animate-spin" /> : 'Создать аккаунт'}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            <span className="mr-2">Уже есть аккаунт?</span>
            <span
              className="underline underline-offset-4 cursor-pointer"
              onClick={modeToggle}
            >
              Войти
            </span>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default SignUp
