import { defineStore } from 'pinia'
import { api } from '@/services/api'

export const useData = defineStore('data', {
  state: () => ({
    key: '',
    isLoading: false,
    data: {} as any,
  }),
  actions: {
    getData(projectId: string | any, deviceId: string | any) {
      this.isLoading = true

      api.get('/data/' + `${projectId}` + '/' + `${deviceId}`)
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
    getDataJson: state => {
      return JSON.stringify(state.data)
    },
  },
})
