import toast from 'react-hot-toast'
import { Mail, KeyRound } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { useFetchUserQuery } from '@/service/crypton'
import { Skeleton } from './ui/skeleton'

interface Props {
  className?: string
  logout: VoidFunction
}

const Profile: React.FC<Props> = ({ className, logout }) => {
  const { data, error } = useFetchUserQuery()

  if (error) toast.error('Ошибка при загрузке пользователя')

  const handlerCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${type} скопирован`)
    } catch {
      toast.error('Ошибка при копированнии')
    }
  }

  return (
    <>
      <Card className={cn('flex flex-col gap-4 w-96', className)}>
        {data ? (
          <>
            <CardHeader>
              <CardTitle className="text-2xl self-center">Профиль</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div
                className="flex flex-col gap-2 border-slate-200 border-2 rounded-md p-3 select-none cursor-pointer"
                onClick={() => handlerCopy(data.email, 'Email')}
              >
                <span className="flex items-center gap-2 h-4 text-sm">
                  <Mail size={16} />
                  Ваш Email
                </span>
                <span className="font-semibold">{data.email}</span>
              </div>
              <div
                className="flex flex-col gap-2 border-slate-200 border-2 rounded-md p-3 select-none cursor-pointer"
                onClick={() => handlerCopy(data.id, 'ID')}
              >
                <span className="flex items-center gap-2 h-4 text-sm">
                  <KeyRound size={16} />
                  Ваш ID
                </span>
                <span className="font-semibold">{data.id}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={logout}
              >
                Выйти
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader className="w-full">
              <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-8 w-full" />
            </CardFooter>
          </>
        )}
      </Card>
    </>
  )
}

export default Profile
