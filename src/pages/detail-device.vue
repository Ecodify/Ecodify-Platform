<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import { useRoute } from 'vue-router'
import { useData } from '@/stores/data'
import { useControlling } from '@/stores/controlling'

import CreateDialog from '@/components/controlling/CreateDialog.vue'

const urlParams = new URLSearchParams(window.location.search)
const getDeviceId = urlParams.get('deviceId') as string
const getProjectId = urlParams.get('projectId') as string
const getDeviceName = urlParams.get('deviceName') as string
const getDeviceDescription = urlParams.get('deviceDescription') as string

const route = useRoute()

const activeTab = ref(route.params.tab)

const storeData = useData()
const storeControlling = useControlling()

function copyToClipboard() {
  const el = document.createElement('textarea')

  el.value = storeData.getDataJson
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  alert('Teks JSON berhasil disalin ke clipboard!')
}

function copyDataControllingToClipboard() {
  const el = document.createElement('textarea')

  el.value = storeControlling.getDataControllingJson
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  alert('Teks JSON berhasil disalin ke clipboard!')
}

const tabs = [
  { title: 'Data', icon: 'bx-user', tab: 'data' },
  { title: 'Controlling', icon: 'bx-lock-open', tab: 'controlling' },
]

onMounted(() => {
  storeData.getData(getProjectId, getDeviceId)
  storeControlling.getDataControlling(getProjectId, getDeviceId)
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

    <div>
      <VTabs
        v-model="activeTab"
        show-arrows
      >
        <VTab
          v-for="item in tabs"
          :key="item.icon"
          :value="item.tab"
        >
          <VIcon
            size="20"
            start
            :icon="item.icon"
          />
          {{ item.title }}
        </VTab>
      </VTabs>
      <VDivider />

      <VWindow
        v-model="activeTab"
        class="mt-5 disable-tab-transition"
      >
        <!-- Data -->
        <VWindowItem value="data">
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
        </VWindowItem>

        <!-- Controlling -->
        <VWindowItem value="controlling">
          <VCard class="pa-6">
            <VCardTitle class="pa-0">
              <div class="d-flex justify-space-between">
                <p class="text-h5">
                  Perangkat Anda <span class="text-primary">{{ getDeviceName }}</span>
                </p>

                <CreateDialog
                  :id-project="getProjectId"
                  :id-device="getDeviceId"
                />
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
                  @click="copyDataControllingToClipboard"
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
                :data="storeControlling.data"
              />
            </VCard>
          </VCard>
        </VWindowItem>
      </VWindow>
    </div>
  </div>
</template>
