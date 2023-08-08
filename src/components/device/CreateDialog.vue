<script setup lang="ts">
import { ref } from 'vue'
import VueCookies from 'vue-cookies'
import { useDevice } from '@/stores/device'
import { useCreateDevice } from '@/stores/device/create-device'

interface Props {
  idProject: string
}

const propsData = defineProps<Props>()

const dialog = ref(false)
const storeCreateDevice = useCreateDevice()
const storeDevice = useDevice()
const getToken = VueCookies.get('token') as string

const onCreateDevice = async () => {
  storeCreateDevice.setToken(getToken)
  storeCreateDevice.setIdProject(propsData.idProject)
  await storeCreateDevice.createDevice()

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
        prepend-icon="mdi-plus"
      >
        Tambah
      </VBtn>
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
                v-model="storeCreateDevice.nameDevice"
                label="Nama Device"
                required
              />
            </VCol>
            <VCol cols="12">
              <VTextarea
                v-model="storeCreateDevice.description"
                label="Deskripsi Device"
                required
              />
            </VCol>
            <VCol cols="12">
              <VBtn
                :loading="storeCreateDevice.isLoading"
                class="btn btn-primary d-block w-100"
                @click="onCreateDevice"
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
