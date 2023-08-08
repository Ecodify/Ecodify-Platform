<script setup lang="ts">
import { ref } from 'vue'
import VueCookies from 'vue-cookies'
import { useDevice } from '@/stores/device'
import { useUpdateDevice } from '@/stores/device/update-device'

interface Props {
  projectId: string
  deviceId: string
  deviceName: string
  deviceDescription: string
}

const propsData = defineProps<Props>()

const editedDeviceName = ref(propsData.deviceName)
const editedDeviceDescription = ref(propsData.deviceDescription)

const dialog = ref(false)
const storeUpdateDevice = useUpdateDevice()
const storeDevice = useDevice()
const getToken = VueCookies.get('token') as string

const onUpdateDevice = async () => {
  storeUpdateDevice.setToken(getToken)
  storeUpdateDevice.setProjectId(propsData.projectId)
  storeUpdateDevice.setDeviceId(propsData.deviceId)
  storeUpdateDevice.setDeviceName(editedDeviceName.value) // Use the store's DeviceName
  storeUpdateDevice.setDeviceDescription(editedDeviceDescription.value) // Use the store's DeviceDescription
  storeUpdateDevice.setType('all')
  await storeUpdateDevice.updateDevice()

  dialog.value = false
  await storeDevice.getDevice(propsData.projectId)
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
        icon="mdi-pencil"
        color="warning"
      />
    </template>
    <VCard>
      <VCardTitle class="mt-6">
        <div class="d-flex justify-space-between">
          <span class="text-h5 ">Proyek baru</span>
          <VBtn
            variant="text"
            @click="dialog = false"
          >
            <VIcon>mdi-close</VIcon>
          </VBtn>
        </div>
      </VCardTitle>
      <VCardSubtitle>
        <p class="text-h12">
          Buat projek untuk kemudahan pemantauan unit.
        </p>
      </VCardSubtitle>
      <VCardText>
        <VContainer class="pa-0">
          <VRow class="d-block">
            <VCol cols="12">
              <VTextField
                v-model="editedDeviceName"
                label="Nama Device"
                required
              />
            </VCol>
            <VCol cols="12">
              <VTextarea
                v-model="editedDeviceDescription"
                label="Deskripsi Device"
                required
              />
            </VCol>
            <VCol cols="12">
              <VBtn
                class="btn btn-primary d-block w-100"
                @click="onUpdateDevice"
              >
                Buat
              </VBtn>
            </VCol>
          </VRow>
        </VContainer>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style scoped>
  .my-custom-dialog {
    align-self: flex-end;
  }
</style>
