<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
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
                label="Nama Proyek"
                required
              />
            </VCol>
            <VCol cols="12">
              <VTextarea
                label="Deskripsi Proyek"
                required
              />
            </VCol>
            <VCol cols="12">
              <VBtn
                class="btn btn-primary d-block w-100"
                @click="dialog = false"
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
