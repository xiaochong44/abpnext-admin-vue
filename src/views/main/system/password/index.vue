<template>
  <PageWrapper :title="l('AbpIdentity::ChangePassword')" content="">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> {{ l('AbpIdentity::Clear') }} </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit">
          {{ l('AbpIdentity::Submit') }}
        </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';

  import { formSchema } from './pwd.data';
  import { useAbp } from '/@/hooks/abp/useAbp';
  import IdentityModule from '/@/api/identity';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();

  export default defineComponent({
    name: 'ChangePassword',
    components: { BasicForm, PageWrapper },
    setup() {
      const [register, { validate, resetFields }] = useForm({
        size: 'large',
        labelWidth: 200,
        showActionButtonGroup: false,
        schemas: formSchema,
      });
      const l = useAbp().getLocalization;
      async function handleSubmit() {
        try {
          const values = await validate();
          const { passwordOld, passwordNew } = values;
          await IdentityModule.ProfileService.changePassword({
            currentPassword: passwordOld,
            newPassword: passwordNew,
          });
          createMessage.success(l('AbpIdentity::PasswordChangedMessage'));
          useUserStore().logout(true);
          // const { router } = useRouter();
          // router.push(pageEnum.BASE_LOGIN);
        } catch (error) {}
      }

      return { register, resetFields, handleSubmit, l };
    },
  });
</script>
