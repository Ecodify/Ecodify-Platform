<script setup lang="ts">
import DataTableDevice from '@/components/DataTableDevice.vue'
import CreateDialog from '@/components/device/CreateDialog.vue'

const urlParams = new URLSearchParams(window.location.search)
const projectId = urlParams.get('projectId') as string
const projectName = urlParams.get('projectName') as string
const projectDescription = urlParams.get('projectDescription') as string
</script>

<template>
  <div>
    <div class="d-flex justify-space-between my-6">
      <VBtn
        icon="mdi-arrow-left"
        variant="text"
        @click="$router.go(-1)"
      />
      <div class="text-end">
        <h2>{{ projectName }}</h2>
        <p>{{ projectDescription }}</p>
      </div>
    </div>
    <VCard class="pa-6">
      <VCardTitle class="pa-0">
        <div class="d-flex justify-space-between">
          <span class="text-h5">Perangkat anda</span>

          <CreateDialog :id-project="projectId" />
        </div>
      </VCardTitle>
      <p class="text-primary">
        Jumlah : 20
      </p>

      <DataTableDevice />
    </VCard>
  </div>
</template>
