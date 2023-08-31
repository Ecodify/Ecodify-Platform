import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
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
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Berhasil menghapus device',
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })

          this.$reset()
        }
        else {
          Swal.fire({
            toast: true,
            icon: 'error',
            title: `${result.msg}`,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
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
