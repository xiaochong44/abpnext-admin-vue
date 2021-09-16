import { GetPermissionListResultDto, UpdatePermissionsDto } from './model';
import { defHttp } from '/@/utils/http/axios';

class PermissionManagementService {
  get(providerName: string, providerKey: string) {
    return defHttp.get<GetPermissionListResultDto>({
      url: `api/permission-management/permissions?providerName=${providerName}&providerKey=${providerKey}`,
    });
  }
  update(providerName: string, providerKey: string, permissions: UpdatePermissionsDto) {
    return defHttp.put({
      url: `api/permission-management/permissions?providerName=${providerName}&providerKey=${providerKey}`,
      data: permissions,
    });
  }
}

export default new PermissionManagementService();
