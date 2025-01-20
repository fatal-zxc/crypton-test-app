import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'js-cookie'
import { Moon, Sun } from 'lucide-react'

import { SignIn, SignUp, Profile } from './components'

function App() {
  const [mode, setMode] = useState<'sign-up' | 'sign-in'>('sign-up')
  const [token, setToken] = useState(Cookies.get('authToken'))
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    } else if (savedTheme === 'light') {
      setTheme('light')
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else if (theme === 'light') {
      setTheme('dark')
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  const modeToggle = () => {
    if (mode === 'sign-in') {
      setMode('sign-up')
    } else {
      setMode('sign-in')
    }
  }

  const logout = () => {
    Cookies.remove('authToken')
    setToken(undefined)
    toast.success('Успешный выход из аккаунта')
  }

  const login = (token: string) => {
    Cookies.set('authToken', token, { secure: true, expires: 1 })
    setToken(token)
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Toaster />
      <div
        className="absolute top-5 left-5"
        onClick={toggleTheme}
      >
        {theme === 'dark' ? <Sun /> : <Moon />}
      </div>
      {token ? (
        <Profile logout={logout} />
      ) : mode === 'sign-up' ? (
        <SignUp
          className="animate-fadein"
          modeToggle={modeToggle}
          login={login}
        />
      ) : (
        <SignIn
          className="animate-fadein"
          modeToggle={modeToggle}
          login={login}
        />
      )}
    </div>
  )
}

export default App
