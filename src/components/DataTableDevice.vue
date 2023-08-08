<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { VDataTable } from 'vuetify/labs/VDataTable'
import DeleteDialog from './device/DeleteDialog.vue'
import EditDialog from './device/EditDialog.vue'
import heroEmpty3 from '@images/hero/hero-empty3.png'
import { useDevice } from '@/stores/device'

const searchConnectedDevice = ref('')
const storeDevice = useDevice()
const router = useRouter()
const urlParams = new URLSearchParams(window.location.search)
const getProjectId = urlParams.get('projectId') as string

const connectedDevicesHeaders = [
  { title: 'Nama Perangkat', key: 'deviceName' },
  { title: 'Deksripsi', key: 'deviceDescription' },
  { title: 'Aksi', key: 'action' },
]

const filteredConnectedDevices = computed(() => {
  return storeDevice.getDataTableDevice.filter(value =>
    value.deviceName.toLowerCase().includes(
      searchConnectedDevice.value.toLowerCase(),
    ),
  )
})

function navigateToDetailDevice(deviceId: string, projectId: string, deviceName: string, deviceDescription: string, deviceSize: number) {
  router.push({
    name: 'detail-device',
    params: { id: deviceId },
    query: { deviceId, projectId, deviceName, deviceDescription, deviceSize },
  })
}

onMounted(() => {
  storeDevice.getDevice(getProjectId)
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
      <template #item.action="{ item }">
        <VBtn
          class="ma-2"
          variant="text"
          icon="mdi-eye-outline"
          color="info"
          @click="navigateToDetailDevice(item.raw.deviceId, getProjectId, item.raw.deviceName, item.raw.deviceDescription, item.raw.deviceSize)"
        />

        <EditDialog
          :project-id="getProjectId"
          :device-id="item.raw.deviceId"
          :device-name="item.raw.deviceName"
          :device-description="item.raw.deviceDescription"
        />
        <DeleteDialog
          :id-project="getProjectId"
          :id-device="item.raw.deviceId"
          :device-name="item.raw.deviceName"
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
