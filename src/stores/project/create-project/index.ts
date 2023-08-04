import { defineStore } from 'pinia'
import VueCookies from 'vue-cookies'
import { api } from '@/services/api'
import type { Project } from '@/types/server-response'

export const useCreateProject = defineStore('create-project', {
  state: () => ({
    isLoading: false,
    token: '',
    projectName: '',
    description: '',
  }),
  actions: {
    async createProject() {
      this.isLoading = true

      const formData = new FormData()
      const getToken = VueCookies.get('token') as string

      formData.append('token', this.token)
      formData.append('nameproject', this.projectName)
      formData.append('description', this.description)

      for (const pair of formData.entries())
        console.log(`${pair[0]}, ${pair[1]}`)

      await api.post<Project>('/create/project', {
        body: formData,
      },
      ).then(result => {
        if (result.status) {
          console.log(`status:${result.status}`)
          this.$reset()
        }
        else {
          console.error(result.msg)
        }
      }).catch(reason => {
        console.error(reason.msg)

        return false
      }).finally(() => {
        this.isLoading = false
      })
    },

    setToken(value: string) {
      this.token = value
    },
    setProjectName(value: string) {
      this.projectName = value
    },
    setProjectDescription(value: string) {
      this.description = value
    },

  },
})
