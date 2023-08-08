<script setup lang="ts">
import { ref } from 'vue'
import VueCookies from 'vue-cookies'
import { useProject } from '@/stores/project'
import { useUpdateProject } from '@/stores/project/update-project'

interface Props {
  id: string
  projectName: string
  projectDescription: string
}

const propsData = defineProps<Props>()

const editedProjectName = ref(propsData.projectName)
const editedProjectDescription = ref(propsData.projectDescription)

const dialog = ref(false)
const storeUpdateProject = useUpdateProject()
const storeProject = useProject()
const getToken = VueCookies.get('token') as string

const onUpdateProject = async () => {
  storeUpdateProject.setToken(getToken)
  storeUpdateProject.setProjectId(propsData.id)
  storeUpdateProject.setProjectName(editedProjectName.value) // Use the store's projectName
  storeUpdateProject.setProjectDescription(editedProjectDescription.value) // Use the store's projectDescription
  storeUpdateProject.setType('all')
  await storeUpdateProject.updateProject()

  dialog.value = false
  await storeProject.getProject()
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
          <span class="text-h5 ">Update Proyek</span>
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
          Ubah proyek untuk kemudahan pemantauan unit.
        </p>
      </VCardSubtitle>
      <VCardText>
        <VContainer class="pa-0">
          <VRow class="d-block">
            <VCol cols="12">
              <VTextField
                v-model="editedProjectName"
                label="Nama Proyek"
                required
              />
            </VCol>
            <VCol cols="12">
              <VTextarea
                v-model="editedProjectDescription"
                label="Deskripsi Proyek"
                required
              />
            </VCol>
            <VCol cols="12">
              <VBtn
                :loading="storeUpdateProject.isLoading"
                class="btn btn-primary d-block w-100"
                @click="onUpdateProject"
              >
                Ubah
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
