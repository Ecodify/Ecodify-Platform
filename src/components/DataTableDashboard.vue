<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { useDashboard } from '@/stores/dashboard'
import heroEmpty1 from '@images/hero/hero-empty1.png'

const storeAllProject = useDashboard()
const searchConnectedDevice = ref('')

const connectedDevicesHeaders = [
  { title: 'Nama Perangkat', key: 'deviceName' },
  { title: 'Nama Proyek', key: 'projectName' },
]

const filteredConnectedDevices = computed(() => {
  return storeAllProject.getProjectDevice.filter(dataDevices =>
    dataDevices.projectName.toLowerCase().includes(
      searchConnectedDevice.value.toLowerCase(),
    ),
  )
})

onMounted(() => {
  storeAllProject.getAllProject()
})
</script>

<template>
  <VCard
    v-if="storeAllProject.allProject.length !== 0"
    class="pa-6"
  >
    <VCardTitle class="pa-0">
      Perangkat yang terhubung
    </VCardTitle>
    <p class="text-primary">
      Jumlah : 20
    </p>
    <VSpacer />
    <VTextField
      v-model="searchConnectedDevice"
      append-icon="mdi-magnify"
      label="Cari"
      single-line
      hide-details
      class="border-0"
    />

    <VDataTable
      :loading="storeAllProject.isLoading"
      :headers="connectedDevicesHeaders"
      :items="filteredConnectedDevices"
      class="my-6 border rounded"
    />
  </VCard>

  <VCard
    v-else
    class="pa-12"
  >
    <VRow class="d-flex align-center">
      <VCol
        lg="6"
        md="12"
        class="d-flex justify-end"
      >
        <div>
          <VImg
            :src="heroEmpty1"
            width="300"
          />
        </div>
      </VCol>
      <VCol
        lg="3"
        md="12"
      >
        <h2 class="text-center">
          Ups, kamu belum <br> menghubungkan <br> perangkat apapun
        </h2>
      </VCol>
    </VRow>
  </VCard>
</template>
