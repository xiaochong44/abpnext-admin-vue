import { watch, unref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { useTitle as usePageTitle } from '@vueuse/core';
import { useGlobSetting } from '/@/hooks/setting';
import { useRouter } from 'vue-router';

import { REDIRECT_NAME } from '/@/router/constant';
import { useAbp } from '../abp/useAbp';

/**
 * Listening to page changes and dynamically changing site titles
 */
export function useTitle() {
  const { title } = useGlobSetting();
  const { t } = useI18n();
  const { currentRoute } = useRouter();
  const l = useAbp().getLocalization;

  const pageTitle = usePageTitle();

  watch(
    () => currentRoute.value.path,
    () => {
      const route = unref(currentRoute);

      if (route.name === REDIRECT_NAME) {
        return;
      }
      const routeTitle = route?.meta?.title as string;
      const tTitle = routeTitle && routeTitle.indexOf('::') >= 0 ? l(routeTitle) : t(routeTitle);
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
    },
    { immediate: true },
  );
}
