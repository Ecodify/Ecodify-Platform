<script setup lang="ts">
import { ref } from 'vue'
import { useDeleteDevice } from '@/stores/device/delete-device'
import { useDevice } from '@/stores/device'

interface Props {
  idProject: string
  idDevice: string
  deviceName: string
}

const propsData = defineProps<Props>()
const storeDevice = useDevice()
const storeDeleteDevice = useDeleteDevice()
const dialog = ref(false)

const onDeleteDevice = async () => {
  await storeDeleteDevice.deleteDevice(propsData.idProject, propsData.idDevice)

  dialog.value = false
  await storeDevice.getDevice(propsData.idProject)
}
</script>

<template>
  <VDialog
    v-model="dialog"
    persistent
    width="auto"
    content-class="my-custom-dialog"
  >
    <template #activator="{ props }">
      <VBtn
        v-bind="props"
        class="ma-2"
        variant="text"
        icon="mdi-delete"
        color="error"
      />
    </template>
    <VCard>
      <VCardTitle class="mt-6">
        <div class="d-flex justify-space-between">
          <p class="text-h5 ">
            Hapus Proyek <span class="text-primary">{{ deviceName }}</span>
          </p>
        </div>
      </VCardTitle>
      <VCardSubtitle>
        <p class="text-h12">
          Apakah anda yakin akan menghapus proyek ini?
        </p>
      </VCardSubtitle>
      <VCardText class="d-flex justify-end">
        <VBtn
          color="black"
          class="d-block"
          variant="text"
          @click="dialog = false"
        >
          Batal
        </VBtn>
        <VBtn
          :loading="storeDeleteDevice.isLoading"
          color="error"
          @click="onDeleteDevice"
        >
          Hapus
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
  .my-custom-dialog {
    align-self: flex-end;
  }
</style>
