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
    // getDataTableDevice: state => {
    //   return state.device.map(value => ({
    //     deviceId: value.id,
    //     deviceName: value.name,
    //     deviceDescription: value.description,
    //     deviceSize: value.size,
    //   }))
    // },
  },
})
