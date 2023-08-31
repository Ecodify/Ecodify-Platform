import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import { api } from '@/services/api'
import type { Project } from '@/types/server-response'

export const useDeleteProject = defineStore('delete-project', {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    deleteProject(projectId: string) {
      this.isLoading = true

      api.delete<Project>(`/delete/${projectId}`,
      ).then(result => {
        if (result.status) {
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Berhasil menghapus proyek',
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
