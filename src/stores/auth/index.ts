import { defineStore } from 'pinia'
import type { CookiesConfig } from 'vue-cookies'
import VueCookies from 'vue-cookies'

export const useAuth = defineStore('auth', {
  state: () => ({
    token: null as string | null,
  }),

  getters: {
    getIsAuthenticated(): boolean {
      return this.token !== ''
    },
    getToken(): any {
      return this.token
    },
  },

  actions: {
    signIn(token: string | null) {
      this.token = token

      const options: CookiesConfig = { expires: '1h', sameSite: 'lax', secure: true }

      VueCookies.set('token', token, options)
    },

    signOut() {
      this.token = null

      const options: CookiesConfig = { sameSite: 'lax', secure: true }

      VueCookies.set('token', null, options)

      setTimeout(() => {
        location.reload()
      }, 100)
    },
  },
})
