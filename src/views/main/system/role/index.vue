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
              tooltip: l('AbpIdentity::Permission:Edit'),
            },
            {
              icon: 'ant-design:safety-outlined',
              onClick: handleChangePermissions.bind(null, record),
              ifShow: hasChangePermissions,
              tooltip: l('AbpIdentity::Permission:ChangePermissions'),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: l('AbpIdentity::RoleDeletionConfirmationMessage', record.name),
                confirm: handleDelete.bind(null, record),
              },
              ifShow: hasDelete,
              tooltip: l('AbpIdentity::Permission:Delete'),
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleModal @register="registerModal" @success="handleSuccess" />
    <ChangePermissionsModal @register="registerChangePermissionsModal" />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useModal } from '/@/components/Modal';
  import RoleModal from './RoleModal.vue';
  import ChangePermissionsModal from './ChangePermissionsModal.vue';

  import { columns, searchFormSchema } from './role.data';
  import IdentityModule from '/@/api/identity';
  import { useAbp } from '/@/hooks/abp/useAbp';
  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, RoleModal, TableAction, ChangePermissionsModal },
    setup() {
      const { getLocalization: l, getCrudPermission, isGranted } = useAbp();
      const [registerModal, { openModal }] = useModal();
      const [registerChangePermissionsModal, { openModal: openChangePermissionsModal }] =
        useModal();
      const [registerTable, { reload }] = useTable({
        title: l('AbpIdentity::Roles'),
        api: IdentityModule.IdentityRoleService.getPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        pagination: true,
        striped: true,
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
        IdentityModule.IdentityRoleService.delete(record.id).then(() => {
          handleSuccess();
        });
      }
      function handleChangePermissions(record: Recordable) {
        openChangePermissionsModal(true, {
          providerName: 'R',
          providerKey: record.name,
        });
      }
      const hasChangePermissions = computed(() => {
        return isGranted('AbpIdentity.Roles.ChangePermissions');
      });
      function handleSuccess() {
        reload();
      }
      let { hasCreate, hasDelete, hasUpdate } = getCrudPermission('AbpIdentity.Roles');
      return {
        registerTable,
        registerModal,
        registerChangePermissionsModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleChangePermissions,
        l,
        hasCreate,
        hasDelete,
        hasUpdate,
        hasChangePermissions,
      };
    },
  });
</script>
