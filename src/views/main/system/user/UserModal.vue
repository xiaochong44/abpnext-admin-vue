<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './user.data';
  import IdentityModule from '/@/api/identity';
  import { useAbp } from '/@/hooks/abp/useAbp';
  //import { getDeptList } from '/@/api/demo/system';
  export default defineComponent({
    name: 'UserModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { getLocalization: l } = useAbp();
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false, maskClosable: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          const roles = await IdentityModule.IdentityUserService.getRoles(data.record.id);
          const roleNames = roles.items?.map((x) => x.name);
          setFieldsValue({
            ...data.record,
            roleNames: roleNames,
          });
          updateSchema({
            field: 'password',
            required: false,
          });
        } else {
          updateSchema({
            field: 'password',
            required: true,
          });
        }
        const roles = await IdentityModule.IdentityUserService.assignableRoles();
        const rolesOptions = roles.items?.map((x) => {
          return { label: x.name, value: x.name };
        });
        updateSchema({
          field: 'roleNames',
          componentProps: { options: rolesOptions },
        });
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? l('AbpIdentity::NewUser') : l('AbpIdentity::Users'),
      );

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          if (isUpdate.value) {
            await IdentityModule.IdentityUserService.update(values.id, values);
          } else {
            await IdentityModule.IdentityUserService.create(values);
          }
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit, l };
    },
  });
</script>
