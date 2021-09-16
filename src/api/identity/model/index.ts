import {
  ExtensibleEntityDto,
  ExtensibleObject,
  PagedResultRequestDto,
} from '../../abpEntity/inteface';

export interface IdentityRoleCreateDto extends ExtensibleObject {
  name: string;
  isDefault: boolean;
  isPublic: boolean;
}

export interface IdentityRoleUpdateDto extends ExtensibleObject {
  name: string;
  isDefault: boolean;
  isPublic: boolean;
  concurrencyStamp: string;
}

export interface IdentityRoleDto extends ExtensibleEntityDto<string> {
  name: string;
  isDefault: boolean;
  isPublic: boolean;
  concurrencyStamp: string;
}

export interface GetIdentityRolesInput extends PagedResultRequestDto {
  filter?: string;
}

export interface IdentityUserCreateDto extends ExtensibleObject {
  userName: string;
  name?: string;
  surname?: string;
  email: string;
  phoneNumber?: string;
  lockoutEnabled: boolean;
  roleNames?: string[];
  password: string;
}

export interface IdentityUserUpdateDto extends ExtensibleObject {
  userName: string;
  name?: string;
  surname?: string;
  email: string;
  phoneNumber?: string;
  lockoutEnabled: boolean;
  roleNames?: string[];
  concurrencyStamp: string;
}

export interface IdentityUserDto extends ExtensibleEntityDto<string> {
  tenantId?: string;
  userName: string;
  name?: string;
  surname?: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  lockoutEnabled: boolean;
  lockoutEnd?: string;
  concurrencyStamp: string;
}

export interface GetIdentityUsersInput extends PagedResultRequestDto {
  filter?: string;
}

export interface IdentityUserUpdateRolesDto {
  roleNames: string[];
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface ProfileDto extends ExtensibleObject {
  userName: string;
  name?: string;
  surname?: string;
  email: string;
  phoneNumber?: string;
  isExternal: boolean;
  hasPassword: boolean;
  concurrencyStamp: string;
}

export interface UpdateProfileDto extends ExtensibleObject {
  userName: string;
  name?: string;
  surname?: string;
  email: string;
  phoneNumber?: string;
  concurrencyStamp: string;
}
