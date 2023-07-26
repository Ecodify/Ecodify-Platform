import VueCookies from 'vue-cookies'
import router from '@/router'

export default function user({to, next }: any) {
  const token = VueCookies.get('token')

  if (!token)
    return router.push({ name: 'login' })

  next()
}
