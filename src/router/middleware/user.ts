import router from '@/router'

export default function user({ next }: any) {
  const token = localStorage.getItem('token')

  if (!token)
    return router.push({ name: 'login' })

  next()
}
