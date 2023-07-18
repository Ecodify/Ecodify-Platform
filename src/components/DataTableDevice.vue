<script setup lang="ts">
import { ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import DeleteDialog from './DeleteDialog.vue'
import EditDialog from './EditDialog.vue'
import heroEmpty2 from '@images/hero/hero-empty2.png'

const searchConnectedDevice = ref('')

const connectedDevicesHeaders = [
  { title: 'BROWSER', key: 'browser' },
  { title: 'DEVICE', key: 'device' },
  { title: 'LOCATION', key: 'location' },
  { title: '', key: 'action' },
]

const connectedDevices = [
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: { icon: 'bxl-windows', color: 'primary' },
  },
]

const filteredConnectedDevices = computed(() => {
  return connectedDevices.filter(dataDevices =>
    dataDevices.browser.toLowerCase().includes(
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
            :src="heroEmpty2"
            width="400"
          />
          <h3 class="text-center text-primary mt-7">
            Kamu belum membuat proyek apapun.
          </h3>
          <h2 class="text-center">
            Buat proyek sekarang
          </h2>
        </div>
      </VCol>
    </VRow>
  </div>
</template>
