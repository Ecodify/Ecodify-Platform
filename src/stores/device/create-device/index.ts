import { defineStore } from 'pinia'
import { api } from '@/services/api'
import type { Device } from '@/types/server-response'

export const useCreateDevice = defineStore('create-device', {
  state: () => ({
    isLoading: false,
    token: '',
    idProject: '',
    nameDevice: '',
    description: '',
  }),
  actions: {
    async createDevice() {
      this.isLoading = true

      const formData = new FormData()

      formData.append('token', this.token)
      formData.append('idProject', this.idProject)
      formData.append('nameDevice', this.nameDevice)
      formData.append('description', this.description)
      for (const pair of formData.entries())
        console.log(`${pair[0]}, ${pair[1]}`)

      await api.post<Device>('/create/devices', {
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
    setIdProject(value: string) {
      this.idProject = value
    },
    setDeviceName(value: string) {
      this.nameDevice = value
    },
    setDeviceDescription(value: string) {
      this.description = value
    },

  },
})
