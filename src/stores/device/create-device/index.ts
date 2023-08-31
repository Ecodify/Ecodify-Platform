import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
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
        if (result.status) {
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Berhasil menambah device',
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
