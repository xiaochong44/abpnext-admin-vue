import { useAppStore } from '/@/store/modules/app';
import { computed } from 'vue';
import { isDevMode } from '/@/utils/env';
import { interpolate } from '/@/utils';

export function useAbp() {
  const appStore = useAppStore();

  const isGranted = (permission: string) => {
    return appStore.auth.grantedPolicies[permission];
  };
  const getSetting = (key: string) => {
    return appStore.setting.values[key];
  };
  const getCrudPermission = (permission: string) => {
    const hasView = computed(() => {
      return isGranted(permission);
    });
    const hasCreate = computed(() => {
      return isGranted(permission + '.Create');
    });
    const hasDelete = computed(() => {
      return isGranted(permission + '.Delete');
    });
    const hasUpdate = computed(() => {
      return isGranted(permission + '.Update');
    });
    return {
      hasView,
      hasCreate,
      hasDelete,
      hasUpdate,
    };
  };
  const isMultiTenancy = computed(() => {
    return appStore.multiTenancy.isEnabled;
  });
  const getSettingNumber = (key: string) => {
    return Number(appStore.setting.values[key]);
  };
  const getLocalization = (key, ...interpolateParams) => {
    const state = appStore.abpConfig;
    if (!key) key = '';
    let defaultValue;
    if (typeof key !== 'string') {
      defaultValue = key.defaultValue;
      key = key.key;
    }
    const keys = key.split('::');
    const warn = (message) => {
      if (isDevMode()) console.warn(message);
    };
    if (keys.length < 2) {
      warn('The localization source separator (::) not found.');
      return defaultValue || key;
    }
    if (!state.localization) return defaultValue || keys[1];
    const sourceName = keys[0] || state.localization.defaultResourceName;
    const sourceKey = keys[1];
    if (sourceName === '_') {
      return defaultValue || sourceKey;
    }
    if (!sourceName) {
      warn(
        'Localization source name is not specified and the defaultResourceName was not defined!',
      );
      return defaultValue || sourceKey;
    }
    const source = state.localization.values[sourceName];
    if (!source) {
      warn('Could not find localization source: ' + sourceName);
      return defaultValue || sourceKey;
    }
    let localization = source[sourceKey];
    if (typeof localization === 'undefined') {
      return defaultValue || sourceKey;
    }
    interpolateParams = interpolateParams.filter((params) => params != null);
    if (localization) localization = interpolate(localization, interpolateParams);
    if (typeof localization !== 'string') localization = '';
    return localization || defaultValue || key;
  };
  const currentUser = computed(() => {
    return appStore.currentUser;
  });
  return {
    isGranted,
    isMultiTenancy,
    currentUser,
    getSetting,
    getSettingNumber,
    getLocalization,
    getCrudPermission,
  };
}
