<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" :disabled="!hasCreate">
          {{ l('AbpIdentity::Permission:Create') }}
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
              ifShow: hasUpdate,
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: l('AbpTenantManagement::TenantDeletionConfirmationMessage', record.name),
                confirm: handleDelete.bind(null, record),
              },
              ifShow: hasDelete,
            },
          ]"
        />
      </template>
    </BasicTable>
    <TenantModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useModal } from '/@/components/Modal';
  import TenantModal from './TenantModal.vue';

  import { columns, searchFormSchema } from './tenant.data';
  import TenantService from '/@/api/tenant';
  import { useAbp } from '/@/hooks/abp/useAbp';
  export default defineComponent({
    name: 'TenantManagement',
    components: { BasicTable, TenantModal, TableAction },
    setup() {
      const { getLocalization: l, getCrudPermission } = useAbp();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: l('AbpTenantManagement::Tenants'),
        api: TenantService.getPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        pagination: true,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 80,
          title: l('::Actions'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        TenantService.delete(record.id).then(() => {
          handleSuccess();
        });
      }

      function handleSuccess() {
        reload();
      }
      let { hasCreate, hasDelete, hasUpdate } = getCrudPermission('AbpTenantManagement.Tenants');
      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        l,
        hasCreate,
        hasDelete,
        hasUpdate,
      };
    },
  });
</script>
