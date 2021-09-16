import { PagedResultDto } from '../abpEntity/inteface';
import { GetTenantInput, TenantDto, TenantCreateDto, TenantUpdateDto } from './model';
import { defHttp } from '/@/utils/http/axios';

class TenantService {
  get(id: string) {
    return defHttp.get<TenantDto>({ url: 'api/multi-tenancy/tenants/' + id });
  }
  getPage(page: GetTenantInput) {
    return defHttp.get<PagedResultDto<TenantDto>>({
      url: 'api/multi-tenancy/tenants',
      params: page,
    });
  }
  create(tenant: TenantCreateDto) {
    return defHttp.post<TenantDto>({ url: 'api/multi-tenancy/tenants', data: tenant });
  }
  delete(id: string) {
    return defHttp.delete({ url: 'api/multi-tenancy/tenants/' + id });
  }
  update(id: string, tenant: TenantUpdateDto) {
    return defHttp.put({ url: 'api/multi-tenancy/tenants/' + id, data: tenant });
  }
  getConnectionString(id: string) {
    return defHttp.get<string>({
      url: `api/multi-tenancy/tenants/${id}/default-connection-string`,
    });
  }
  updateConnectionString(id: string, connectionString: string) {
    return defHttp.put({
      url: `api/multi-tenancy/tenants/${id}/default-connection-string?defaultConnectionString=${connectionString}`,
    });
  }
  deleteConnectionString(id: string) {
    return defHttp.delete({ url: `api/multi-tenancy/tenants/${id}/default-connection-string` });
  }
}

export default new TenantService();
