import { defineStore } from 'pinia'
import { api } from '@/services/api'
import { useAuth } from '@/stores/auth'
import type { User } from '@/types/server-response'

export const useLogin = defineStore('login', {
  state: () => ({
    username: 'develop',
    password: 'develop',
    isLoading: false,
  }),
  actions: {
    setUsername(username: string) {
      this.username = username
    },
    setPassword(password: string) {
      this.password = password
    },
    onSubmitLogin() {
      this.isLoading = true

      api.post<User>('/Login', {
        body: {
          username: this.username,
          password: this.password,
        },
      },
      ).then(result => {
        const storeAuth = useAuth()

        storeAuth.signIn(result.dataUser.token as string)
      }).catch(reason => {
        console.error(reason.message)

        return false
      }).finally(() => {
        this.isLoading = false
      })
    },

  },
})
