import { FormSchema } from '/@/components/Form';
import { useAbp } from '/@/hooks/abp/useAbp';
const l = useAbp().getLocalization;

export const formSchema: FormSchema[] = [
  {
    field: 'passwordOld',
    label: l('AbpIdentity::DisplayName:CurrentPassword'),
    component: 'InputPassword',
    required: true,
    componentProps: {
      placeholder: l('AbpIdentity::DisplayName:CurrentPassword'),
    },
    rules: [
      {
        required: true,
        message: l('AbpIdentity::ThisFieldIsRequired.'),
      },
    ],
  },
  {
    field: 'passwordNew',
    label: l('AbpIdentity::DisplayName:NewPassword'),
    component: 'StrengthMeter',
    componentProps: {
      placeholder: l('AbpIdentity::DisplayName:NewPassword'),
    },
    rules: [
      {
        required: true,
        message: l('AbpIdentity::ThisFieldIsRequired.'),
      },
    ],
  },
  {
    field: 'confirmPassword',
    label: l('AbpIdentity::DisplayName:NewPasswordConfirm'),
    component: 'InputPassword',
    componentProps: {
      placeholder: l('AbpIdentity::DisplayName:NewPasswordConfirm'),
    },
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject(l('AbpIdentity::ThisFieldIsRequired.'));
            }
            if (value !== values.passwordNew) {
              return Promise.reject(l('AbpIdentity::Volo.Abp.Identity:PasswordConfirmationFailed'));
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];
