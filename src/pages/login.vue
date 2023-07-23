<script setup lang="ts">
import axios from 'axios'
import { RouterLink, useRouter } from 'vue-router'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@images/logo.svg?raw'

const baseUrl = import.meta.env.VITE_PUBLIC_API_BASE_URL

const form = ref({
  username: 'develop',
  password: 'develop',
  remember: false,
})

const router = useRouter()
const isPasswordVisible = ref(false)
let isLoading = false

async function login() {
  try {
    isLoading = true

    const response = await axios.post(
      `${baseUrl}/Login`, {
        username: form.value.username,
        password: form.value.password,
      },
    )

    localStorage.setItem('token', response.data.dataUser.token)
    localStorage.setItem('data_user', JSON.stringify(response.data.dataUser))
    router.push('/dashboard')
  }
  catch (error) {
    console.error(error)
  }
  finally {
    setTimeout(() => (isLoading = false), 3000)
  }
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex justify-center">
            <div
              class="d-flex text-primary w-75"
              v-html="logo"
            />
          </div>
        </template>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h4 mb-1">
          Welcome Back! 👋🏻
        </h5>
        <p class="mb-0">
          Enter to handle the technology around you!
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="$router.push('/')">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                autofocus
                placeholder="johndoe@email.com"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />

                <RouterLink
                  class="text-primary ms-2 mb-1"
                  to="javascript:void(0)"
                >
                  Forgot Password?
                </RouterLink>
              </div>

              <!-- login button -->
              <VBtn
                :loading="isLoading"
                block
                type="submit"
                @click="login"
              >
                masuk
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Belum mendaftarkan akun?</span>
              <RouterLink
                class="text-primary text-decoration-underline ms-2"
                to="/register"
              >
                Daftar akun
              </RouterLink>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
