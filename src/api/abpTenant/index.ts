import { FindTenantResult } from './model/findTenantResult';
import { defHttp } from '/@/utils/http/axios';

export const findTenantByName = (name: string) =>
  defHttp.get<FindTenantResult>({ url: 'api/abp/multi-tenancy/tenants/by-name/' + name });
export const findTenantById = (id: string) =>
  defHttp.get<FindTenantResult>({ url: 'api/abp/multi-tenancy/tenants/by-id/' + id });
