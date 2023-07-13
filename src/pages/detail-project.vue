<script setup lang="ts">
import { ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import heroEmpty2 from '@images/hero/hero-empty2.png'

const searchConnectedDevice = ref('')
const dialog = ref(false)
const editDialog = ref(false)
const deleteDialog = ref(false)

const connectedDevicesHeaders = [
  { title: 'BROWSER', key: 'browser' },
  { title: 'DEVICE', key: 'device' },
  { title: 'LOCATION', key: 'location' },
  { title: '', key: 'action' },
]

const connectedDevices = [
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: { icon: 'bxl-windows', color: 'primary' },
  },

]

const filteredConnectedDevices = computed(() => {
  return connectedDevices.filter(dataDevices =>
    dataDevices.browser.toLowerCase().includes(
      searchConnectedDevice.value.toLowerCase(),
    ),
  )
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
        <h2>My_Smart-IOT</h2>
        <p>This project usefull for make API To Conenct  IoT Smart Meter App.</p>
      </div>
    </div>
    <VCard
      v-if="connectedDevicesHeaders.length > 0"
      class="pa-6"
    >
      <VCardTitle class="pa-0">
        <div class="d-flex justify-space-between">
          <span class="text-h5">Proyek anda</span>

          <VDialog
            v-model="dialog"
            persistent
            width="auto"
          >
            <template #activator="{ props }">
              <VBtn
                v-bind="props"
                prepend-icon="mdi-plus"
              >
                Tambah
              </VBtn>
            </template>
            <VCard>
              <VCardTitle class="mt-6">
                <div class="d-flex justify-space-between">
                  <span class="text-h5 ">Buat Proyek</span>
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
        </div>
      </VCardTitle>
      <p class="text-primary">
        Jumlah : 20
      </p>
      <VSpacer />
      <VTextField
        v-model="searchConnectedDevice"
        append-icon="mdi-magnify"
        label="Cari"
        single-line
        hide-details
        class="border-0"
      />
      <VDataTable
        :headers="connectedDevicesHeaders"
        :items="filteredConnectedDevices"
        class="my-6 border"
      >
        <template #item.action>
          <VBtn
            class="ma-2"
            variant="text"
            icon="mdi-eye-outline"
            color="info"
            :to="{ name: 'detail-device', params: { id: '1' } }"
          />

          <VDialog
            v-model="editDialog"
            persistent
            width="auto"
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
                  <span class="text-h5 ">Buat Proyek</span>
                  <VBtn
                    variant="text"
                    @click="editDialog = !editDialog"
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
                        @click="editDialog = !editDialog"
                      >
                        Ubah
                      </VBtn>
                    </VCol>
                  </VRow>
                </VContainer>
              </VCardText>
            </VCard>
          </VDialog>

          <VDialog
            v-model="deleteDialog"
            persistent
            width="auto"
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
                  <span class="text-h5 ">Buat Proyek</span>
                  <VBtn
                    variant="text"
                    @click="deleteDialog = !deleteDialog"
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
                        @click="deleteDialog = !deleteDialog"
                      >
                        Masuk
                      </VBtn>
                    </VCol>
                  </VRow>
                </VContainer>
              </VCardText>
            </VCard>
          </VDialog>
        </template>
      </VDataTable>
    </VCard>

    <VCard
      v-else
      class="pa-12"
    >
      <VRow class="d-flex align-center justify-center">
        <VCol
          col="12"
          class="d-flex justify-center"
        >
          <div>
            <VImg
              :src="heroEmpty2"
              width="400"
            />
            <h3 class="text-center text-primary mt-7">
              Kamu belum membuat proyek apapun.
            </h3>
            <h2 class="text-center">
              Buat proyek sekarang
            </h2>
          </div>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>
