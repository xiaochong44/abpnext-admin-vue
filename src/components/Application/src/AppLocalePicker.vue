<!--
 * @Author: Vben
 * @Description: Multi-language switching component
-->
<template>
  <Dropdown
    placement="bottomCenter"
    :trigger="['click']"
    :dropMenuList="localeList"
    :selectedKeys="selectedKeys"
    @menuEvent="handleMenuEvent"
    overlayClassName="app-locale-picker-overlay"
  >
    <span class="cursor-pointer flex items-center">
      <Icon icon="ion:language" />
      <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
    </span>
  </Dropdown>
</template>
<script lang="ts" setup>
  import type { LocaleType } from '/#/config';
  import type { DropMenu } from '/@/components/Dropdown';
  import { ref, watchEffect, unref, computed } from 'vue';
  import { Dropdown } from '/@/components/Dropdown';
  import { Icon } from '/@/components/Icon';
  import { useLocale } from '/@/locales/useLocale';
  //import { localeList } from '/@/settings/localeSetting';
  import { useAppStore } from '/@/store/modules/app';

  const appStore = useAppStore();

  const props = defineProps({
    /**
     * Whether to display text
     */
    showText: { type: Boolean, default: true },
    /**
     * Whether to refresh the interface when changing
     */
    reload: { type: Boolean },
  });

  const selectedKeys = computed(() => {
    return [appStore.localization.currentCulture.cultureName];
  });

  const { changeLocale, getLocale } = useLocale();

  const getLocaleText = computed(() => appStore.localization.currentCulture.displayName);
  const localeList = computed(() => {
    return appStore.localization.languages.map((x) => {
      return {
        text: x.displayName,
        event: x.cultureName,
      };
    });
  });

  async function toggleLocale(lang: LocaleType | string) {
    await changeLocale(lang as LocaleType);
    //selectedKeys.value = [lang as string];
    props.reload && location.reload();
  }

  function handleMenuEvent(menu: DropMenu) {
    if (unref(getLocale) === menu.event) {
      return;
    }
    toggleLocale(menu.event as string);
  }
</script>

<style lang="less">
  .app-locale-picker-overlay {
    .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }
</style>
