export interface RolesResponse {
  data: Role[]
  filter: Filter
  selectedRole: Role
}

export interface Role {
  id: number
  name: string
  type: UserType
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

export interface Filter {
  name: string
  type: string
}

export enum RoleStatus {
  ALL = 'all',
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export enum UserType {
  ADMIN = 'admin',
  JOB_ADMIN = 'job_admin'
}

export enum RoleType {
  ADMIN_ROLE = 'Administrator Role',
  JOB_ADMIN_ROLE = 'Job Administrator Role'
}
