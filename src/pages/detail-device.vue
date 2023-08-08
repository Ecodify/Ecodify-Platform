<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty'
import { useData } from '@/stores/data'
import 'vue-json-pretty/lib/styles.css'

const urlParams = new URLSearchParams(window.location.search)
const getDeviceId = urlParams.get('deviceId') as string
const getProjectId = urlParams.get('projectId') as string
const getDeviceName = urlParams.get('deviceName') as string
const getDeviceDescription = urlParams.get('deviceDescription') as string

const storeData = useData()

function copyToClipboard() {
  const el = document.createElement('textarea')

  el.value = storeData.getDataJson
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  alert('Teks JSON berhasil disalin ke clipboard!')
}

onMounted(() => {
  storeData.getData(getProjectId, getDeviceId)
})
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
        <h2>{{ getDeviceName }}</h2>
        <p>{{ getDeviceDescription }}</p>
      </div>
    </div>
    <VCard class="pa-6">
      <VCardTitle class="pa-0">
        <div class="d-flex justify-space-between">
          <p class="text-h5">
            Perangkat Anda <span class="text-primary">{{ getDeviceName }}</span>
          </p>
        </div>
      </VCardTitle>
      <VSpacer />

      <VCard rounded="10">
        <VToolbar color="primary">
          <div class="px-4">
            <VIcon>
              mdi-xml
            </VIcon>
          </div>

          <VToolbarTitle>Kode</VToolbarTitle>

          <VSpacer />

          <VBtn
            icon
            color="white"
            @click="copyToClipboard"
          >
            <VIcon>mdi-content-copy</VIcon>
          </VBtn>

          <VBtn
            icon
            color="error"
          >
            <VIcon>mdi-delete</VIcon>
          </VBtn>

          <VBtn
            icon
            color="white"
          >
            <VIcon>mdi-dots-vertical</VIcon>
          </VBtn>
        </VToolbar>
        <VueJsonPretty
          class="pa-4"
          :data="storeData.data"
        />
      </VCard>
    </VCard>
  </div>
</template>
