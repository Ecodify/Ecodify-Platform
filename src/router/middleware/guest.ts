import VueCookies from 'vue-cookies'
import router from '@/router'

export default function guest({ to, from, next }: any) {
  const token = VueCookies.get('token')

  if (to.fullPath !== '/login' && !token)
    return router.push({ name: 'login' })

  if (token)
    return router.push({ name: 'dashboard' })

  next()
}
