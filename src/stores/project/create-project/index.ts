import { defineStore } from 'pinia'
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

      formData.append('token', this.token)
      formData.append('nameproject', this.projectName)
      formData.append('description', this.description)

      await api.post<Project>('/create/project', {
        body: formData,
      },
      ).then(result => {
        if (result.status)
          this.$reset()

        else
          console.error(result.msg)
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
