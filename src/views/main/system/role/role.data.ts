import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useAbp } from '/@/hooks/abp/useAbp';
const { getLocalization: l } = useAbp();

export const columns: BasicColumn[] = [
  {
    title: l('AbpIdentity::DisplayName:RoleName'),
    dataIndex: 'name',
    width: 100,
    align: 'left',
  },
  {
    title: l('AbpIdentity::DisplayName:IsDefault'),
    dataIndex: 'isDefault',
    width: 100,
    customRender: ({ record }) => {
      if (record.isDefault) {
        return l('AbpIdentity::Yes');
      } else {
        return l('AbpIdentity::No');
      }
    },
  },
  {
    title: l('AbpIdentity::DisplayName:IsStatic'),
    dataIndex: 'isStatic',
    width: 100,
    customRender: ({ record }) => {
      if (record.isStatic) {
        return l('AbpIdentity::Yes');
      } else {
        return l('AbpIdentity::No');
      }
    },
  },
  {
    title: l('AbpIdentity::DisplayName:IsPublic'),
    dataIndex: 'isPublic',
    width: 100,
    customRender: ({ record }) => {
      if (record.isPublic) {
        return l('AbpIdentity::Yes');
      } else {
        return l('AbpIdentity::No');
      }
    },
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
    label: l('AbpIdentity::DisplayName:RoleName'),
    component: 'Input',
    required: true,
  },
  {
    field: 'isDefault',
    label: l('AbpIdentity::DisplayName:IsDefault'),
    component: 'Switch',
    defaultValue: false,
  },
  {
    field: 'isStatic',
    label: l('AbpIdentity::DisplayName:IsStatic'),
    component: 'Switch',
    defaultValue: false,
  },
  {
    field: 'isPublic',
    label: l('AbpIdentity::DisplayName:IsPublic'),
    component: 'Switch',
    defaultValue: true,
  },
  {
    field: 'id',
    label: '',
    component: 'Input',
    show: false,
  },
  {
    field: 'concurrencyStamp',
    label: '',
    component: 'Input',
    show: false,
  },
];
