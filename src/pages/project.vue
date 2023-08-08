<script setup lang="ts">
import DataTableProject from '@/components/DataTableProject.vue'
import CreateDialog from '@/components/project/CreateDialog.vue'
</script>

<template>
  <div>
    <h2>Proyek</h2>
    <p>Buat sebuah proyek dan hubungkan dengan perangkat favorit mu</p>

    <VCard class="pa-6">
      <VCardTitle class="pa-0">
        <div class="d-flex justify-space-between">
          <span class="text-h5">Proyek anda</span>

          <CreateDialog />
        </div>
      </VCardTitle>
      <p class="text-primary">
        Jumlah : 20
      </p>
      <VSpacer />

      <DataTableProject />
    </VCard>
  </div>
</template>
