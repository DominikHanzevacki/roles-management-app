export interface RolesResponse {
  roles: Role[]
}

export interface Role {
  id: number
  name: string
  type: string
  description: string
  editable: boolean
  active: boolean
  users?: User[] | null
  created_on: string
  modified_on: string
}
export interface User {
  id: number
  first_name: string
  last_name: string
  photo_url: string
}
