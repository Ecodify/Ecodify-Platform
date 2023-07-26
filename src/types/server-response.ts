export interface ServerResponse<T> {
  status: number
  msg: string
  data: T
  dataUser: T
  meta?: Meta
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  next_page_url?: string
  path?: string
  per_page: number
  prev_page_url?: string
  to: number
  total: number
}

export interface AllProject {
  idProject: string
  nameProject: string
  descProject: string
  devices: Device[]
}

export interface Device {
  id: string
  name: string
  description: string
  size: number
}

export interface Project {
  idProject: string
  nameProject: string
  descriptionProject: string
}

export interface User {
  username: string
  nama: string
  email: string
  nohp: string
  token?: string
  package: Package
}

export interface Package {
  type_package: string
  description_package: string
  sum_of_device: string
}
