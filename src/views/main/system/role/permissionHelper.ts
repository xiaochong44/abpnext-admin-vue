import {
  GetPermissionListResultDto,
  PermissionGrantInfoDto,
  PermissionGroupDto,
} from '/@/api/permission/model';
import { TreeItem } from '/@/components/Tree';
import { useAbp } from '/@/hooks/abp/useAbp';
const { getLocalization: l } = useAbp();

export function buildPermissionsTree(
  permissions: GetPermissionListResultDto,
  selectcheckedKeys: string[],
) {
  const treeData: TreeItem[] = [];
  permissions.groups.forEach((g) => {
    const node: TreeItem = { title: g.displayName, key: g.name, children: [] };
    buildChild(node, g.permissions, '', selectcheckedKeys);
    treeData.push(node);
  });
  return treeData;
}
export function removeNotExistsPermission(
  selectcheckedKeys: string[],
  permissionGroups: PermissionGroupDto[],
) {
  const selectedKeys: string[] = [];
  selectcheckedKeys.forEach((x) => {
    permissionGroups.forEach((g) => {
      g.permissions.forEach((p) => {
        if (p.name === x && selectedKeys.indexOf(x) < 0) {
          selectedKeys.push(x);
        }
      });
    });
  });
  return selectedKeys;
}

function buildChild(
  node: TreeItem,
  permissions: PermissionGrantInfoDto[],
  parentName = '',
  _selectcheckedKeys = new Array<string>(),
) {
  const parants = permissions.filter((x) =>
    !!parentName ? x.parentName === parentName : !x.parentName,
  );
  const permission = permissions.find((x) => x.name === node.key && x.isGranted);
  if (parants.length > 0 && node.children && parentName) {
    const findViewIndex = node.children.findIndex((x) => x.key === node.key + '.View');
    if (findViewIndex < 0) {
      node.children.push({
        title: l('AbpUiNavigation::Menu:Administration'),
        key: node.key + '.View',
        children: [],
      });
    }
    if (permission && _selectcheckedKeys.indexOf(permission.name + '.View') < 0) {
      _selectcheckedKeys.push(permission.name + '.View');
    }
  } else {
    if (permission && _selectcheckedKeys.indexOf(permission.name) < 0) {
      _selectcheckedKeys.push(permission.name);
    }
  }
  parants.forEach((p) => {
    const parentNode: TreeItem = {
      title: p.displayName,
      key: p.name,
      children: [],
    };
    buildChild(parentNode, permissions, p.name, _selectcheckedKeys);

    node.children?.push(parentNode);
  });
}
