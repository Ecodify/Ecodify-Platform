<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { VDataTable } from 'vuetify/labs/VDataTable'
import DeleteDialog from './project/DeleteDialog.vue'
import EditDialog from './project/EditDialog.vue'
import heroEmpty2 from '@images/hero/hero-empty2.png'
import { useProject } from '@/stores/project'

const searchConnectedDevice = ref('')
const storeProject = useProject()
const router = useRouter()

const projectHeaders = [
  { title: 'Nama Proyek', key: 'projectName' },
  { title: 'Deskripsi', key: 'projectDescription' },
  { title: 'Aksi', key: 'action' },
]

const filteredlistProject = computed(() => {
  return storeProject.getDataTableProject.filter(value =>
    value.projectName.toLowerCase().includes(
      searchConnectedDevice.value.toLowerCase(),
    ),
  )
})

function navigateToDetailProject(projectId: string, projectName: string, projectDescription: string) {
  router.push({
    name: 'detail-project',
    params: { id: projectId },
    query: { projectId, projectName, projectDescription },
  })
}

onMounted(() => {
  storeProject.getProject()
})
</script>

<template>
  <div v-if="storeProject.project.length !== 0">
    <VTextField
      v-model="searchConnectedDevice"
      append-icon="mdi-magnify"
      label="Cari"
      single-line
      hide-details
      class="border-0"
    />
    <VDataTable
      :headers="projectHeaders"
      :items="filteredlistProject"
      class="my-6 border rounded"
    >
      <template #item.action="{ item }">
        <VBtn
          class="ma-2"
          variant="text"
          icon="mdi-eye-outline"
          color="info"
          @click="navigateToDetailProject(item.raw.projectId, item.raw.projectName, item.raw.projectDescription)"
        />

        <EditDialog
          :id="item.raw.projectId"
          :project-name="item.raw.projectName"
          :project-description="item.raw.projectDescription"
        />

        <DeleteDialog
          :id="item.raw.projectId"
          :project-name="item.raw.projectName"
        />
      </template>
    </VDataTable>
  </div>

  <div
    v-else
    class="pa-12"
  >
    <VRow class="d-flex align-center justify-center">
      <VCol
        col="12"
        class="d-flex justify-center"
      >
        <div>
          <VImg
            :src="heroEmpty2"
            width="400"
          />
          <h3 class="text-center text-primary font-weight-light mt-7">
            Kamu <span class="font-weight-medium">belum membuat proyek</span> apapun.
          </h3>
          <h2 class="text-center text-primary font-weight-light">
            <span class="font-weight-medium">Buat proyek</span> sekarang
          </h2>
        </div>
      </VCol>
    </VRow>
  </div>
</template>
