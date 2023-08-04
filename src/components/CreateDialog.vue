<script setup lang="ts">
import { ref } from 'vue'
import VueCookies from 'vue-cookies'
import { useProject } from '@/stores/project'
import { useCreateProject } from '@/stores/project/create-project'

const dialog = ref(false)
const storeCreateProject = useCreateProject()
const storeProject = useProject()
const getToken = VueCookies.get('token') as string

const onCreateProject = async () => {
  storeCreateProject.setToken(getToken)
  await storeCreateProject.createProject()

  // storeProject.getProject()
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
        variant="text"
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
                v-model="storeCreateProject.projectName"
                label="Nama Proyek"
                required
              />
            </VCol>
            <VCol cols="12">
              <VTextarea
                v-model="storeCreateProject.description"
                label="Deskripsi Proyek"
                required
              />
            </VCol>
            <VCol cols="12">
              <VBtn
               :loading="storeCreateProject.isLoading"
                class="btn btn-primary d-block w-100"
                @click="onCreateProject"
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
