<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="l('AbpIdentity::Permission:ChangePermissions')"
    @ok="handleSubmit"
  >
    <BasicTree :treeData="treeData" ref="treeRef" :checkable="true" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useAbp } from '/@/hooks/abp/useAbp';
  import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree';
  import PermissionService from '/@/api/permission';
  import { buildPermissionsTree, removeNotExistsPermission } from './permissionHelper';
  import { PermissionGroupDto, ProviderInfoDto } from '/@/api/permission/model';
  //import { getDeptList } from '/@/api/demo/system';
  export default defineComponent({
    name: 'ChangePermissionsModal',
    components: { BasicModal, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const treeData = ref<TreeItem[]>([]);
      const permissionGroups = ref<PermissionGroupDto[]>([]);
      const providerInfo = reactive<ProviderInfoDto>({ providerKey: '', providerName: '' });
      const { getLocalization: l } = useAbp();
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false, maskClosable: false });
        providerInfo.providerName = data.providerName;
        providerInfo.providerKey = data.providerKey;
        const permissions = await PermissionService.get(data.providerName, data.providerKey);
        permissionGroups.value = permissions.groups;
        let selectedKeys: string[] = [];
        treeData.value = buildPermissionsTree(permissions, selectedKeys);
        treeRef.value?.setCheckedKeys(selectedKeys);
      });
      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }
      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          // TODO custom api
          const selectedKeys: string[] = treeRef.value?.getCheckedKeys() as string[];
          const updatePermissions = selectedKeys.map((x) => x.replace('.View', ''));
          const grantedPermissions = removeNotExistsPermission(
            updatePermissions,
            permissionGroups.value,
          );
          await PermissionService.update(providerInfo.providerName, providerInfo.providerKey, {
            permissions: grantedPermissions.map((x) => {
              return {
                name: x,
                isGranted: true,
              };
            }),
          });
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      return { registerModal, handleSubmit, l, treeRef, getTree, treeData };
    },
  });
</script>
