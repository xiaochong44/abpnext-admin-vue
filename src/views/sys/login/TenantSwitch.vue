<template>
  <div class="mb-3 text-lg font-bold text-center cursor-pointer text-blue-600">
    <a @click="showModal">{{ name }}</a>
    <BasicModal
      v-bind="$attrs"
      destroyOnClose
      @register="register"
      :title="l('AbpUiMultiTenancy::SwitchTenant')"
      @ok="handleOk"
    >
      <div>
        <Form layout="vertical">
          <FormItem :label="l('AbpUiMultiTenancy::Tenant')">
            <Input v-model:value="tenantName" />
          </FormItem>
        </Form>
        <div class="text-gray-500">{{ l('AbpUiMultiTenancy::SwitchTenantHint') }}</div>
      </div>
    </BasicModal>
  </div>
</template>
<script lang="ts" setup>
  import { useAbp } from '/@/hooks/abp/useAbp';
  import { initAbpConfig } from '/@/abp/initAbpConfig';
  import { useAppStore } from '/@/store/modules/app';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Input, Form, FormItem, message } from 'ant-design-vue';
  import { findTenantByName } from '/@/api/abpTenant';
  import { ref, computed } from 'vue';
  const l = useAbp().getLocalization;
  const appStore = useAppStore();
  const tenantName = ref('');
  tenantName.value = appStore.currentTenant.name || '';
  const name = computed(() => appStore.currentTenant.name || l('AbpUiMultiTenancy::NotSelected'));
  const [register, { setModalProps }] = useModalInner();
  const handleOk = async function () {
    if (tenantName.value) {
      findTenantByName(tenantName.value).then(async (x) => {
        if (x.success) {
          if (!x.isActive) {
            message.warn(l('AbpUiMultiTenancy::GivenTenantIsNotAvailable', tenantName.value));
          } else {
            appStore.tenantId = x.tenantId;
            await initAbpConfig();
            setModalProps({ visible: false });
          }
        } else {
          message.error(l('AbpUiMultiTenancy::GivenTenantIsNotExist', tenantName.value));
        }
      });
    } else {
      appStore.tenantId = undefined;
      await initAbpConfig();
      setModalProps({ visible: false });
    }
  };
  const showModal = function () {
    setModalProps({ visible: true, minHeight: 100 });
  };
</script>
