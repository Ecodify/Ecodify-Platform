// import { useAuth } from '~/stores/general/auth'

// export const api = {
//   provider: (url: string,
//     queryParams?: Record<string, string> | undefined,
//     body?: Record<string, string | '' | string[] | undefined | null> | FormData | undefined,
//     headers?: Record<string, string> | undefined): { newUrl: string; newHeaders: Record<string, string> } => {
//     const token = useAuth().token
//     const baseUrl = useRuntimeConfig().public.baseUrl

//     if (token) {
//       headers = {
//         ...headers,
//         Authorization: `Bearer ${token}`,
//       }
//     }

//     let newHeaders = {
//       ...headers,
//     }

//     if (!(body instanceof FormData)) {
//       newHeaders = {
//         'Content-Type': 'application/json',
//         ...headers,
//       }
//     }

//     newHeaders = {
//       Accept: 'application/json',
//       ...newHeaders,
//     }

//     const newUrl = queryParams ? `${baseUrl}${url}?${new URLSearchParams(queryParams)}` : `${baseUrl}${url}`

//     return { newUrl, newHeaders }
//   },

//   afterResponse: async <T>(response: Response) => {
//     const data: ServerResponse<T> = await response.json()

//     if (response.status >= 400) {
//       showToast.error(data.message)

//       throw new Error(data.message)
//     }

//     return data
//   },

//   get: async <T>(
//     url: string,
//     option?: {
//       queryParams?: Record<string, string>
//       headers?: Record<string, string>
//     }): Promise<ServerResponse<T>> => {
//     const { newUrl, newHeaders } = api.provider(url, option?.queryParams, option?.headers)

//     const response = await fetch(newUrl, {
//       method: 'GET',
//       headers: newHeaders,
//     })

//     return await api.afterResponse<T>(response)
//   },

//   post: async <T>(
//     url: string,
//     option?: {
//       queryParams?: Record<string, string>
//       body?: Record<string, string | '' | string[] | {}[] | {} | undefined | null> | FormData
//       headers?: Record<string, string>
//     },
//   ): Promise<ServerResponse<T>> => {
//     const { newUrl, newHeaders } = api.provider(url, option?.queryParams, option?.body, option?.headers)

//     const response = await fetch(newUrl, {
//       method: 'POST',
//       headers: newHeaders,
//       body: option?.body instanceof FormData ? option.body : JSON.stringify(option?.body),
//     })

//     return await api.afterResponse<T>(response)
//   },

//   put: async <T>(
//     url: string,
//     option?: {
//       queryParams?: Record<string, string>
//       body?: Record<any, any>
//       headers?: Record<string, string>
//     },
//   ): Promise<ServerResponse<T>> => {
//     const { newUrl, newHeaders } = api.provider(url, option?.queryParams, option?.body, option?.headers)

//     const response = await fetch(newUrl, {
//       method: 'PUT',
//       headers: newHeaders,
//       body: JSON.stringify(option?.body),
//     })

//     return await api.afterResponse<T>(response)
//   },

//   delete: async <T>(
//     url: string,
//     option?: {
//       queryParams?: Record<string, string>
//       body?: Record<any, any>
//       headers?: Record<string, string>
//     },
//   ): Promise<ServerResponse<T>> => {
//     const { newUrl, newHeaders } = api.provider(url, option?.queryParams, option?.body, option?.headers)

//     const response = await fetch(newUrl, {
//       method: 'DELETE',
//       headers: newHeaders,
//       body: JSON.stringify(option?.body),
//     })

//     return await api.afterResponse<T>(response)
//   },
// }
