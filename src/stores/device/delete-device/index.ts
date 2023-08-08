import { defineStore } from 'pinia'
import { api } from '@/services/api'
import type { Device } from '@/types/server-response'

export const useDeleteDevice = defineStore('delete-device', {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    deleteDevice(projectId: string, deviceId: string) {
      this.isLoading = true

      api.delete<Device>(`/delete/${projectId}/${deviceId}`,
      ).then(result => {
        if (result.status) {
          console.log('success delete data project')
          this.$reset()
        }
        else {
          console.error(result.msg)
        }
      }).catch(reason => {
        console.error(reason.msg)

        return false
      }).finally(() => {
        this.isLoading = false
      })
    },
  },
})
