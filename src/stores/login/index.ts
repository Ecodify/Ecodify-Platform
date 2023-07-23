// import { defineStore } from 'pinia'
// import { navigateTo } from '#app'
// import { api } from '~/services/api'
// import { useAuth } from '~/stores/general/auth'

// export const useLogin = defineStore('login', {
//   state: () => ({
//     email: 'admin@vms.com',
//     password: '1234qwer',
//     isLoading: false,
//   }),
//   actions: {
//     setEmail(email: string) {
//       this.email = email
//     },
//     setPassword(password: string) {
//       this.password = password
//     },
//     onSubmitLogin() {
//       this.isLoading = true

//       api.post<User>('/api/v1/auth/login', {
//         body: {
//           email: this.email,
//           password: this.password,
//         },
//       },
//       ).then(result => {
//         const storeAuth = useAuth()

//         storeAuth.signIn(result.data.token, result.data.role_name, result.data.company_id, result.data.permissions)

//         navigateTo('/dashboard')
//       }).catch(reason => {
//         showToast.error(reason.message)

//         return false
//       }).finally(() => {
//         this.isLoading = false
//       })
//     },

//   },
// })
