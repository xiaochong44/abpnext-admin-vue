import { ListResultDto, PagedResultDto } from '../abpEntity/inteface';
import {
  GetIdentityRolesInput,
  IdentityRoleCreateDto,
  IdentityRoleDto,
  IdentityRoleUpdateDto,
} from './model';
import { defHttp } from '/@/utils/http/axios';

export class IdentityRoleService {
  create(role: IdentityRoleCreateDto) {
    return defHttp.post<IdentityRoleDto>({ url: 'api/identity/roles', data: role });
  }
  update(id: string, role: IdentityRoleUpdateDto) {
    return defHttp.put<IdentityRoleDto>({ url: 'api/identity/roles/' + id, data: role });
  }
  delete(id: string) {
    return defHttp.delete({ url: 'api/identity/roles/' + id });
  }
  get(id: string) {
    return defHttp.get<IdentityRoleDto>({ url: 'api/identity/roles/' + id });
  }
  getPage(page: GetIdentityRolesInput) {
    return defHttp.get<PagedResultDto<IdentityRoleDto>>({
      url: 'api/identity/roles',
      params: page,
    });
  }
  all() {
    return defHttp.get<ListResultDto<IdentityRoleDto>>({
      url: 'api/identity/roles/all',
    });
  }
}
