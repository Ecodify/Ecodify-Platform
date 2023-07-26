import { defineStore } from 'pinia'
import { api } from '@/services/api'
import type { Device } from '@/types/server-response'

export const useDevice = defineStore('device', {
  state: () => ({
    key: '',
    isLoading: false,
    device: [] as Device[],
  }),
  actions: {
    getDevice(id: string | any) {
      this.isLoading = true

      api.get<Device[]>('/listDevices/' + `${id}`)
        .then(result => {
          this.device = result.data
        }).catch(reason => {
          console.error(reason.message)

          return false
        }).finally(() => {
          this.isLoading = false
        })
    },
    getDeviceById(id: string | any) {
      return this.device.find(value => value.id === id) || null
    },
  },
  getters: {
    getDataTableDevice: state => {
      return state.device.map(value => ({
        deviceId: value.id,
        deviceName: value.name,
        deviceDescription: value.description,
        deviceSize: value.size,
      }))
    },
  },
})
