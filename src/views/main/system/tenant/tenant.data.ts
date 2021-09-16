import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useAbp } from '/@/hooks/abp/useAbp';
const { getLocalization: l } = useAbp();

export const columns: BasicColumn[] = [
  {
    title: l('AbpTenantManagement::TenantName'),
    dataIndex: 'name',
    width: 100,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'filter',
    label: l('AbpIdentity::PagerSearch'),
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: l('AbpTenantManagement::TenantName'),
    component: 'Input',
    required: true,
  },
  {
    field: 'adminEmailAddress',
    label: l('AbpTenantManagement::DisplayName:AdminEmailAddress'),
    component: 'Input',
    required: true,
    componentProps: {
      type: 'email',
    },
    rules: [
      {
        type: 'email',
        message: l('AbpIdentity::ThisFieldIsNotAValidEmailAddress.'),
      },
      {
        required: true,
        message: l(
          'AbpIdentity::The {0} field is required.',
          l('AbpTenantManagement::DisplayName:AdminEmailAddress'),
        ),
      },
    ],
  },
  {
    field: 'adminPassword',
    label: l('AbpTenantManagement::DisplayName:AdminPassword'),
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'id',
    label: '',
    component: 'Input',
    show: false,
  },
];
