import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useAbp } from '/@/hooks/abp/useAbp';
import { formatToDateTime } from '/@/utils/dateUtil';
const { getLocalization: l } = useAbp();

export const columns: BasicColumn[] = [
  {
    title: l('AbpIdentity::DisplayName:UserName'),
    dataIndex: 'userName',
    width: 100,
    align: 'left',
  },
  {
    title: l('AbpIdentity::DisplayName:Name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: l('AbpIdentity::DisplayName:Surname'),
    dataIndex: 'surname',
    width: 100,
  },
  {
    title: l('AbpIdentity::DisplayName:Email'),
    dataIndex: 'email',
    width: 100,
  },
  {
    title: l('AbpIdentity::DisplayName:PhoneNumber'),
    dataIndex: 'phoneNumber',
    width: 100,
  },
  {
    title: l('AbpIdentity::CreationTime'),
    dataIndex: 'creationTime',
    width: 180,
    customRender: ({ record }) => {
      return formatToDateTime(record.creationTime);
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
    field: 'userName',
    label: l('AbpIdentity::DisplayName:UserName'),
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: l('AbpIdentity::DisplayName:Name'),
    component: 'Input',
  },
  {
    field: 'surname',
    label: l('AbpIdentity::DisplayName:Surname'),
    component: 'Input',
  },
  {
    field: 'email',
    label: l('AbpIdentity::DisplayName:Email'),
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
        message: l('AbpIdentity::The {0} field is required.', l('AbpIdentity::DisplayName:Email')),
      },
    ],
  },
  {
    field: 'phoneNumber',
    label: l('AbpIdentity::DisplayName:PhoneNumber'),
    component: 'Input',
  },
  {
    field: 'password',
    label: l('AbpIdentity::DisplayName:Password'),
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'lockoutEnabled',
    label: l('AbpIdentity::DisplayName:LockoutEnabled'),
    component: 'Switch',
    defaultValue: true,
  },
  {
    field: 'roleNames',
    label: l('AbpIdentity::Roles'),
    component: 'Select',
    componentProps: {
      mode: 'multiple',
      options: [],
    },
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
