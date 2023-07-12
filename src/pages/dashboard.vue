<script setup lang="ts">
import { ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import heroEmpty1 from '@images/hero/hero-empty1.png'

const searchConnectedDevice = ref('')
const dialog = ref(false)

const connectedDevicesHeaders = [
  { title: 'BROWSER', key: 'browser' },
  { title: 'DEVICE', key: 'device' },
  { title: 'LOCATION', key: 'location' },
  { title: 'RECENT ACTIVITY', key: 'recentActivity' },
]

const connectedDevices = [
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: { icon: 'bxl-windows', color: 'primary' },
  },
  {
    browser: 'Chrome on iPhone',
    device: 'iPhone 12x',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: { icon: 'bx-mobile', color: 'error' },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: { icon: 'bxl-android', color: 'success' },
  },
  {
    browser: 'Chrome on MacOS',
    device: 'Apple iMac',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: { icon: 'bxl-apple', color: 'secondary' },
  },
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: { icon: 'bxl-windows', color: 'primary' },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: { icon: 'bxl-android', color: 'success' },
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
    <h2>Selamat Datang</h2>
    <p>Ingin pantau proyek IoT-mu yang mana?</p>
    <VCard
      v-if="connectedDevices.length > 0"
      class="pa-6"
    >
      <VCardTitle class="pa-0">
        Perangkat yang terhubung
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
      />
    </VCard>

    <VCard
      v-else
      class="pa-12"
    >
      <VRow class="d-flex align-center">
        <VCol
          lg="6"
          md="12"
          class="d-flex justify-end"
        >
          <div>
            <VImg
              :src="heroEmpty1"
              width="300"
            />
          </div>
        </VCol>
        <VCol
          lg="3"
          md="12"
        >
          <h2 class="text-center">
            Ups, kamu belum <br> menghubungkan <br> perangkat apapun
          </h2>
        </VCol>
      </VRow>
    </VCard>

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

        <VDialog
          v-model="dialog"
          persistent
          width="auto"
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
                      Masuk
                    </VBtn>
                  </VCol>
                </VRow>
              </VContainer>
            </VCardText>
          </VCard>
        </VDialog>
      </VCard>
    </VCol>
  </div>
</template>
