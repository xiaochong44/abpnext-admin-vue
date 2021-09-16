import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { useAbp } from '/@/hooks/abp/useAbp';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/dept',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: t('routes.demo.system.moduleName'),
  },
  children: [
    {
      path: 'tenant',
      name: 'TenantManagement',
      meta: {
        title: 'AbpTenantManagement::Tenants',
        ignoreKeepAlive: true,
        permission: 'AbpTenantManagement.Tenants',
        hideMenu: () => !useAbp().isMultiTenancy.value,
      },
      component: () => import('/@/views/main/system/tenant/index.vue'),
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: 'AbpIdentity::Roles',
        ignoreKeepAlive: true,
        permission: 'AbpIdentity.Roles',
      },
      component: () => import('/@/views/main/system/role/index.vue'),
    },
    {
      path: 'user',
      name: 'UserManagement',
      meta: {
        title: 'AbpIdentity::Users',
        ignoreKeepAlive: true,
        permission: 'AbpIdentity.Users',
      },
      component: () => import('/@/views/main/system/user/index.vue'),
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: 'AbpIdentity::ChangePassword',
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/main/system/password/index.vue'),
    },
  ],
};

export default system;
