<script setup lang="ts">
import { ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import DeleteDialog from './DeleteDialog.vue'
import EditDialog from './EditDialog.vue'
import heroEmpty2 from '@images/hero/hero-empty2.png'

const searchConnectedDevice = ref('')

const connectedDevicesHeaders = [
  { title: 'Nama Proyek', key: 'projectName' },
  { title: 'Deskripsi', key: 'description' },
  { title: 'Aksi', key: 'action' },
]

const connectedDevices = [
  {
    projectName: 'My_Smart-IoT',
    description: 'This project usefull for make API To connected to  IoT Smart Meter App...',
  },
  {
    projectName: 'My_Smart-IoT',
    description: 'This project usefull for make API To connected to  IoT Smart Meter App...',
  },
]

const filteredConnectedDevices = computed(() => {
  return connectedDevices.filter(dataDevices =>
    dataDevices.projectName.toLowerCase().includes(
      searchConnectedDevice.value.toLowerCase(),
    ),
  )
})
</script>

<template>
  <div v-if="connectedDevicesHeaders.length > 0">
    <VTextField
      v-model="searchConnectedDevice"
      append-icon="mdi-magnify"
      label="Cari"
      single-line
      hide-details
      class="border-0"
    />
    <VDataTable
      :headers="connectedDevicesHeaders"
      :items="filteredConnectedDevices"
      class="my-6 border rounded"
    >
      <template #item.action>
        <VBtn
          class="ma-2"
          variant="text"
          icon="mdi-eye-outline"
          color="info"
          :to="{ name: 'detail-project', params: { id: '1' } }"
        />

        <EditDialog />

        <DeleteDialog />
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
