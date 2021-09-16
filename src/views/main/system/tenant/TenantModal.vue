<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './tenant.data';
  import TenantService from '/@/api/tenant';
  import { useAbp } from '/@/hooks/abp/useAbp';
  //import { getDeptList } from '/@/api/demo/system';
  export default defineComponent({
    name: 'RoleModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { getLocalization: l } = useAbp();
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 150,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false, maskClosable: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
          updateSchema([
            {
              field: 'adminEmailAddress',
              required: false,
              show: false,
            },
            {
              field: 'adminPassword',
              required: false,
              show: false,
            },
          ]);
        } else {
          updateSchema([
            {
              field: 'adminEmailAddress',
              required: true,
              show: true,
            },
            {
              field: 'adminPassword',
              required: true,
              show: true,
            },
          ]);
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? l('AbpTenantManagement::NewTenant') : l('AbpTenantManagement::Tenants'),
      );

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          if (isUpdate.value) {
            await TenantService.update(values.id, values);
          } else {
            await TenantService.create(values);
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
