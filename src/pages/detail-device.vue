<script setup lang="ts">
import { useRoute } from 'vue-router'
import VueJsonPretty from 'vue-json-pretty'
import { useDevice } from '@/stores/device'
import 'vue-json-pretty/lib/styles.css'

const storeDevice = useDevice()
const route = useRoute()
const id = route.params.id

const filteredDevice = computed(() => {
  return storeDevice.getDeviceById(id)
})

const dataExample = [
  {
    path: '/',
    component: 'showHeader',
    children: [
      { path: '', component: 'showHome' },
      { path: '/contact', component: 'showContact' },
      { path: '/about', component: 'showAbout' },
    ],
  },
  {
    path: '/blog',
    component: 'showBlog',
    children: [
      { path: '', component: 'showPosts' },
      { path: '/blog/:id', name: 'post', component: 'showPost' },
    ],
  },
  { path: '/loading', component: 'showLoading' },
]

onMounted(() => {
  
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
        <h2>{{ filteredDevice?.name }}</h2>
        <p>{{ filteredDevice?.description }}</p>
      </div>
    </div>
    <VCard class="pa-6">
      <VCardTitle class="pa-0">
        <div class="d-flex justify-space-between">
          <p class="text-h5">
            Perangkat Anda <span class="text-primary">{{ filteredDevice?.name }}</span>
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
          :data="dataExample"
        />
      </VCard>
    </VCard>
  </div>
</template>
