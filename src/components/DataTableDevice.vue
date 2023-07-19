<script setup lang="ts">
import { ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import DeleteDialog from './DeleteDialog.vue'
import EditDialog from './EditDialog.vue'
import heroEmpty3 from '@images/hero/hero-empty3.png'

const searchConnectedDevice = ref('')

const connectedDevicesHeaders = [
  { title: 'No', key: 'no' },
  { title: 'Nama Perangkat', key: 'deviceName' },
  { title: 'Aksi', key: 'action' },
]

const connectedDevices = [
  {
    no: '1',
    deviceName: 'Modul_PI',
  },
]

const filteredConnectedDevices = computed(() => {
  return connectedDevices.filter(dataDevices =>
    dataDevices.deviceName.toLowerCase().includes(
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
          :to="{ name: 'detail-device', params: { id: '1' } }"
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
            :src="heroEmpty3"
            width="400"
          />
          <h3 class="text-center text-primary font-weight-light mt-7">
            Kamu <span class="font-weight-medium">belum mendaftarkan perangkat</span> apapun.
          </h3>
        </div>
      </VCol>
    </VRow>
  </div>
</template>
