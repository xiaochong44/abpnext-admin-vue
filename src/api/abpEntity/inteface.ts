export interface Dictionary<T = any> {
  [key: string]: T;
}

export interface ListResultDto<T> {
  items?: T[];
}

export interface PagedResultDto<T> extends ListResultDto<T> {
  totalCount?: number;
}

export interface LimitedResultRequestDto {
  maxResultCount: number;
}

export interface PagedResultRequestDto extends LimitedResultRequestDto {
  skipCount?: number;
}

export interface PagedAndSortedResultRequestDto extends PagedResultRequestDto {
  sorting?: string;
}

export interface EntityDto<TKey = string> {
  id?: TKey;
}

export interface CreationAuditedEntityDto<TPrimaryKey = string> extends EntityDto<TPrimaryKey> {
  creationTime?: string | Date;
  creatorId?: string;
}

export interface CreationAuditedEntityWithUserDto<TUserDto, TPrimaryKey = string>
  extends CreationAuditedEntityDto<TPrimaryKey> {
  creator?: TUserDto;
}

export interface AuditedEntityDto<TPrimaryKey = string>
  extends CreationAuditedEntityDto<TPrimaryKey> {
  lastModificationTime?: string | Date;
  lastModifierId?: string;
}

export interface AuditedEntityWithUserDto<TUserDto, TPrimaryKey = string>
  extends AuditedEntityDto<TPrimaryKey> {
  creator?: TUserDto;
  lastModifier?: TUserDto;
}

export interface FullAuditedEntityDto<TPrimaryKey = string> extends AuditedEntityDto<TPrimaryKey> {
  isDeleted?: boolean;
  deleterId?: string;
  deletionTime?: Date | string;
}

export interface FullAuditedEntityWithUserDto<TUserDto, TPrimaryKey = string>
  extends FullAuditedEntityDto<TPrimaryKey> {
  creator?: TUserDto;
  lastModifier?: TUserDto;
  deleter?: TUserDto;
}

export interface ExtensibleObject {
  extraProperties: Dictionary<any>;
}

export interface ExtensibleEntityDto<TKey = string> extends ExtensibleObject {
  id: TKey;
}

export interface ExtensibleCreationAuditedEntityDto<TPrimaryKey = string>
  extends ExtensibleEntityDto<TPrimaryKey> {
  creationTime: Date | string;
  creatorId?: string;
}

export interface ExtensibleAuditedEntityDto<TPrimaryKey = string>
  extends ExtensibleCreationAuditedEntityDto<TPrimaryKey> {
  lastModificationTime?: Date | string;
  lastModifierId?: string;
}

export interface ExtensibleAuditedEntityWithUserDto<TPrimaryKey = string, TUserDto = any>
  extends ExtensibleAuditedEntityDto<TPrimaryKey> {
  creator: TUserDto;
  lastModifier: TUserDto;
}

export interface ExtensibleCreationAuditedEntityWithUserDto<TPrimaryKey = string, TUserDto = any>
  extends ExtensibleCreationAuditedEntityDto<TPrimaryKey> {
  creator: TUserDto;
}

export interface ExtensibleFullAuditedEntityDto<TPrimaryKey = string>
  extends ExtensibleAuditedEntityDto<TPrimaryKey> {
  isDeleted: boolean;
  deleterId?: string;
  deletionTime: Date | string;
}

export interface ExtensibleFullAuditedEntityWithUserDto<TPrimaryKey = string, TUserDto = any>
  extends ExtensibleFullAuditedEntityDto<TPrimaryKey> {
  creator: TUserDto;
  lastModifier: TUserDto;
  deleter: TUserDto;
}
