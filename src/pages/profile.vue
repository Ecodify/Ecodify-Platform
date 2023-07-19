<script setup lang="ts">
import { ref } from 'vue'
import avatar1 from '@images/avatars/avatar-1.png'

const show = ref(false)
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <VCard
        class="pa-3"
        style="min-height: 230px;"
      >
        <div class="d-flex">
          <VAvatar
            size="100"
            class="ms-6 my-6"
            :image="avatar1"
          />

          <div class="my-6 me-auto">
            <VCardTitle>
              Admin
            </VCardTitle>

            <VCardSubtitle class="text-primary mt-0">
              admin@gmail.com
              <p class="text-secondary">
                @admin
              </p>
            </VCardSubtitle>
          </div>

          <VBtn
            rounded="lg"
            class="mt-6 me-6"
            icon="mdi-pencil"
            @click="show = !show"
          />
        </div>

        <VExpandTransition>
          <div v-show="show">
            <VDivider class="mx-3" />

            <VRow class="pa-4 mt-1">
              <VCol
                cols="12"
                sm="6"
              >
                <VTextField
                  label="Email"
                  required
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VTextField
                  label="kata Sandi"
                  required
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VTextField
                  label="Nama Depan"
                  required
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VTextField
                  label="Nama Belakang"
                  required
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VTextField
                  label="Username"
                  required
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VTextField
                  label="Nomor Telepon"
                  required
                />
              </VCol>
            </VRow>
            <VCol cols="12">
              <VBtn class="btn btn-primary d-block w-100">
                Simpan perubahan
              </VBtn>
            </VCol>
          </div>
        </VExpandTransition>
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VCard
        class="pa-3"
        style="min-height: 230px;"
      >
        <VCardTitle>
          Kunci Akses
        </VCardTitle>

        <VCardSubtitle class=" mt-0">
          Paste the token for connect the API data with IoT modul.
        </VCardSubtitle>
        <VCardText>
          <p class="text-h7 text-primary ma-0">
            Token
          </p>
          <p class="text-h8 text-info ma-0">
            zfsdfewr3124lkfasvczx
            <span>
              <VBtn
                variant="text"
                icon="mdi-content-copy"
              />
            </span>
          </p>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
