import router from '@/router'

export default function guest({ to, next }: any) {
  const token = localStorage.getItem('token')

  if (to.fullPath !== '/login' && !token)
    return router.push({ name: 'login' })

  if (token)
    return router.push({ name: 'dashboard' })

  next()
}
