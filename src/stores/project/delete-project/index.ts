import { defineStore } from 'pinia'
import { api } from '@/services/api'
import type { Project } from '@/types/server-response'

export const useDeleteProject = defineStore('delete-project', {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    deleteProject(projectId: string) {
      this.isLoading = true

      api.delete<Project>(`/delete/${projectId}`,
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
