import { defineStore } from 'pinia'
import { api } from '@/services/api'
import type { Project } from '@/types/server-response'

export const useProject = defineStore('project', {
  state: () => ({
    key: '',
    isLoading: false,
    project: [] as Project[],
  }),
  actions: {
    getProject() {
      this.isLoading = true

      api.get<Project[]>('/listProject')
        .then(result => {
          this.project = result.data
        }).catch(reason => {
          console.error(reason.message)

          return false
        }).finally(() => {
          this.isLoading = false
        })
    },
    getProjectById(id: string | any) {
      return this.project.find(value => value.idProject === id) || null
    },
  },
  getters: {
    getDataTableProject: state => {
      return state.project.map(value => ({
        projectId: value.idProject,
        projectName: value.nameProject,
        projectDescription: value.descriptionProject,
      }))
    },
  },
})
