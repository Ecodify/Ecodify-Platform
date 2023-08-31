import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import { api } from '@/services/api'
import type { Controlling } from '@/types/server-response'

export const useCreateControlling = defineStore('create-controlling', {
  state: () => ({
    isLoading: false,
    token: '',
    idProject: '',
    idDevice: '',
    data: '',
  }),
  actions: {
    async createControlling() {
      this.isLoading = true

      const formData = new FormData()

      formData.append('token', this.token)
      formData.append('idProject', this.idProject)
      formData.append('idDevice', this.idDevice)
      formData.append('data', this.data)
      for (const pair of formData.entries())
        console.log(`${pair[0]}, ${pair[1]}`)

      await api.post<Controlling>('/addControlling', {
        body: formData,
      },
      ).then(result => {
        if (result.status) {
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Berhasil menambah data',
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
            title: 'Data yang diinput tidak berbentuk JSON',
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
    setIdDevice(value: string) {
      this.idDevice = value
    },
    setData(value: string) {
      this.data = value
    },

  },
})
