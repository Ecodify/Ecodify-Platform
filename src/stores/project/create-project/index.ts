import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import { api } from '@/services/api'
import type { Project } from '@/types/server-response'

export const useCreateProject = defineStore('create-project', {
  state: () => ({
    isLoading: false,
    token: '',
    projectName: '',
    description: '',
  }),
  actions: {
    async createProject() {
      this.isLoading = true

      const formData = new FormData()

      formData.append('token', this.token)
      formData.append('nameproject', this.projectName)
      formData.append('description', this.description)

      await api.post<Project>('/create/project', {
        body: formData,
      },
      ).then(result => {
        if (result.status) {
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Berhasil menambah proyek',
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
    setProjectName(value: string) {
      this.projectName = value
    },
    setProjectDescription(value: string) {
      this.description = value
    },

  },
})
