import { defineStore } from 'pinia'
import { api } from '@/services/api'

export const useControlling = defineStore('controlling', {
  state: () => ({
    key: '',
    isLoading: false,
    data: {} as any,
  }),
  actions: {
    getDataControlling(projectId: string | any, deviceId: string | any) {
      this.isLoading = true

      api.get('/controlling/' + `${projectId}` + '/' + `${deviceId}`)
        .then(result => {
          this.data = result.data
        }).catch(reason => {
          console.error(reason.message)

          return false
        }).finally(() => {
          this.isLoading = false
        })
    },
  },
  getters: {
    getDataControllingJson: state => {
      return JSON.stringify(state.data)
    },
  },
})
