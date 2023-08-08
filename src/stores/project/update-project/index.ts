import { defineStore } from 'pinia'
import { api } from '@/services/api'
import type { Project } from '@/types/server-response'

export const useUpdateProject = defineStore('update-project', {
  state: () => ({
    isLoading: false,
    token: '',
    projectName: '',
    description: '',
    projectId: '',
    type: '',
  }),
  actions: {
    setToken(value: string) {
      this.token = value
    },
    setProjectName(value: string) {
      this.projectName = value
    },
    setProjectDescription(value: string) {
      this.description = value
    },
    setProjectId(value: string) {
      this.projectId = value
    },
    setType(value: string) {
      this.type = value
    },
    async updateProject() {
      this.isLoading = true

      const params = new URLSearchParams()

      params.append('token', this.token)
      params.append('idProject', this.projectId)
      params.append('nameProject', this.projectName)
      params.append('descProject', this.description)
      params.append('type', this.type)
      params.append('_method', 'PUT')

      await api.put<Project>('/edit/project', {
        body: params,
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

  },
})
