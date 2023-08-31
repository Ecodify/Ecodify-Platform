<script setup lang="ts">
import { ref } from 'vue'
import VueCookies from 'vue-cookies'
import { useControlling } from '@/stores/controlling'
import { useCreateControlling } from '@/stores/controlling/create-controlling'

interface Props {
  idProject: string
  idDevice: string
}

const propsData = defineProps<Props>()

const dialog = ref(false)
const storeCreateControlling = useCreateControlling()
const storeControlling = useControlling()
const getToken = VueCookies.get('token') as string

const onCreateDevice = async () => {
  storeCreateControlling.setToken(getToken)
  storeCreateControlling.setIdProject(propsData.idProject)
  storeCreateControlling.setIdDevice(propsData.idDevice)
  await storeCreateControlling.createControlling()

  dialog.value = false
  await storeControlling.getDataControlling(propsData.idProject, propsData.idDevice)
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
                v-model="storeCreateControlling.data"
                label="Data"
                placeholder="{&quot;relay&quot;:1}"
                required
              />
            </VCol>
            <VCol cols="12">
              <VBtn
                :loading="storeCreateControlling.isLoading"
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
