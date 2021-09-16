import { ListResultDto, PagedResultDto } from '../abpEntity/inteface';
import {
  GetIdentityUsersInput,
  IdentityRoleDto,
  IdentityUserCreateDto,
  IdentityUserDto,
  IdentityUserUpdateDto,
  IdentityUserUpdateRolesDto,
} from './model';
import { defHttp } from '/@/utils/http/axios';

export class IdentityUserService {
  create(role: IdentityUserCreateDto) {
    return defHttp.post<IdentityUserDto>({ url: 'api/identity/users', data: role });
  }
  update(id: string, role: IdentityUserUpdateDto) {
    return defHttp.put<IdentityUserDto>({ url: 'api/identity/users/' + id, data: role });
  }
  delete(id: string) {
    return defHttp.delete({ url: 'api/identity/users/' + id });
  }
  get(id: string) {
    return defHttp.get<IdentityUserDto>({ url: 'api/identity/users/' + id });
  }
  getPage(page: GetIdentityUsersInput) {
    return defHttp.get<PagedResultDto<IdentityUserDto>>({
      url: 'api/identity/users',
      params: page,
    });
  }
  getRoles(id: string) {
    return defHttp.get<ListResultDto<IdentityRoleDto>>({ url: `api/identity/users/${id}/roles` });
  }
  updateRoles(id: string, roles: IdentityUserUpdateRolesDto) {
    return defHttp.put({ url: `api/identity/users/${id}/roles`, data: roles });
  }
  assignableRoles() {
    return defHttp.get<ListResultDto<IdentityRoleDto>>({
      url: `api/identity/users/assignable-roles`,
    });
  }
  findByUserName(userName: string) {
    return defHttp.get<IdentityUserDto>({ url: `api/identity/users/by-username/${userName}` });
  }
  findByEmail(email: string) {
    return defHttp.get<IdentityUserDto>({ url: `api/identity/users/by-email/${email}` });
  }
}
