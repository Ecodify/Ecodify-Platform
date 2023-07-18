<script setup lang="ts">
import CreateDialog from '@/components/CreateDialog.vue'
import DataTableDashboard from '@/components/DataTableDashboard.vue'
</script>

<template>
  <div>
    <h2>Selamat Datang</h2>
    <p>Ingin pantau proyek IoT-mu yang mana?</p>

    <DataTableDashboard />

    <VCol
      lg="6"
      md="12"
      class="pa-0"
    >
      <VCard class="pa-6 col-6 mt-6 elevation-0">
        <VCardTitle class="pa-0">
          Ada Proyek Baru
        </VCardTitle>
        <p>Datarkan proyekmu terlebih dahulu</p>

        <CreateDialog />
      </VCard>
    </VCol>
  </div>
</template>
