<script setup lang="ts">
import { ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import heroEmpty1 from '@images/hero/hero-empty1.png'

const searchConnectedDevice = ref('')

const connectedDevicesHeaders = [
  { title: 'Nama Perangkat', key: 'deviceName' },
  { title: 'Nama Proyek', key: 'projectName' },
]

const connectedDevices = [
  {
    deviceName: 'Chrome on Windows',
    projectName: 'HP Spectre 360',
  },
  {
    deviceName: 'Chrome on iPhone',
    projectName: 'iPhone 12x',
  },
  {
    deviceName: 'Chrome on Android',
    projectName: 'Oneplus 9 Pro',
  },
  {
    deviceName: 'Chrome on MacOS',
    projectName: 'Apple iMac',
  },
  {
    deviceName: 'Chrome on Windows',
    projectName: 'HP Spectre 360',
  },
  {
    deviceName: 'Chrome on Android',
    projectName: 'Oneplus 9 Pro',
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
  <VCard
    v-if="connectedDevices.length > 0"
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
      :headers="connectedDevicesHeaders"
      :items="filteredConnectedDevices"
      class="my-6 border"
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
