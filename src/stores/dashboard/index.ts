import { defineStore } from 'pinia'
import { api } from '@/services/api'
import type { AllProject } from '@/types/server-response'

export const useDashboard = defineStore('dashboard', {
  state: () => ({
    key: '',
    isLoading: false,
    allProject: [] as AllProject[],
  }),
  actions: {
    getAllProject() {
      this.isLoading = true

      api.get<AllProject[]>('/all-project-device')
        .then(result => {
          this.allProject = result.data
        }).catch(reason => {
          console.error(reason.message)

          return false
        }).finally(() => {
          this.isLoading = false
        })
    },
  },
  getters: {
    getProjectDevice: state => {
      return state.allProject.map(value => ({
        deviceName: value.devices[0].name,
        projectName: value.nameProject,
      }))
    },
  },
})
