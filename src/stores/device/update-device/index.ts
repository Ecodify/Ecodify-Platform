import { defineStore } from 'pinia'
import { api } from '@/services/api'
import type { Device } from '@/types/server-response'

export const useUpdateDevice = defineStore('update-device', {
  state: () => ({
    isLoading: false,
    token: '',
    nameDevice: '',
    descriptionDevice: '',
    projectId: '',
    deviceId: '',
    type: '',
  }),
  actions: {
    setToken(value: string) {
      this.token = value
    },
    setDeviceName(value: string) {
      this.nameDevice = value
    },
    setDeviceDescription(value: string) {
      this.descriptionDevice = value
    },
    setProjectId(value: string) {
      this.projectId = value
    },
    setDeviceId(value: string) {
      this.deviceId = value
    },
    setType(value: string) {
      this.type = value
    },
    async updateDevice() {
      this.isLoading = true

      const params = new URLSearchParams()

      params.append('token', this.token)
      params.append('idProject', this.projectId)
      params.append('idDevice', this.deviceId)
      params.append('nameDevice', this.nameDevice)
      params.append('descriptionDevice', this.descriptionDevice)
      params.append('type', this.type)
      params.append('_method', 'PUT')

      for (const pair of params.entries())
        console.log(`${pair[0]}, ${pair[1]}`)

      await api.put<Device>('/edit/devices', {
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
