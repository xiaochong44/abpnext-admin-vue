import {
  PagedAndSortedResultRequestDto,
  ExtensibleObject,
  ExtensibleEntityDto,
} from '../../abpEntity/inteface';

export interface GetTenantInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface TenantCreateDto extends ExtensibleObject {
  name: string;
  adminEmailAddress: string;
  adminPassword: string;
}

export interface TenantUpdateDto {
  name: string;
  concurrencyStamp: string;
}

export interface TenantDto extends ExtensibleEntityDto<string> {
  name: string;
  concurrencyStamp: string;
}
