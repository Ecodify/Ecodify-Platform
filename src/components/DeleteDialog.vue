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
            Hapus Proyek <span class="text-primary">My_Smart_IoT</span>
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
          color="error"
          @click="dialog = false"
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
