<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

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
        <h2>My_Smart-IOT</h2>
        <p>This project usefull for make API To Conenct  IoT Smart Meter App.</p>
      </div>
    </div>
    <VCard class="pa-6">
      <VCardTitle class="pa-0">
        <div class="d-flex justify-space-between">
          <p class="text-h5">
            Perangkat Anda <span class="text-primary">Modul PI</span>
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
