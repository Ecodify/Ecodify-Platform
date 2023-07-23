// import { defineStore } from 'pinia'
// import type { CookieOptions } from '#app'

// export const useAuth = defineStore('auth', {
//   state: () => ({
//     token: null as string | null,
//     role_name: null as string | null,
//     company_id: null as string | null,
//   }),

//   getters: {
//     getIsAuthenticated(): boolean {
//       return this.token !== ''
//     },

//     getIsRoleSuperAdmin(): boolean {
//       return this.role_name === 'super-admin'
//     },
//   },

//   actions: {
//     signIn(token: string | null, role_name: string | null, company_id: string | null, permissions: any[]) {
//       this.token = token
//       this.role_name = role_name
//       this.company_id = company_id

//       const options: CookieOptions = { sameSite: 'lax', secure: true }

//       const data = useCookie('data', options)

//       data.value = JSON.stringify({
//         token,
//         role_name,
//         company_id,
//         permissions,
//       })
//     },

//     signOut() {
//       this.token = null
//       this.role_name = null
//       this.company_id = null

//       const options: CookieOptions = { sameSite: 'lax', secure: true }

//       const data = useCookie('data', options)

//       data.value = null

//       // delay to make sure cookie is cleared
//       setTimeout(() => {
//         location.reload()
//       }, 100)
//     },
//   },
// })
