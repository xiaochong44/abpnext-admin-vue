import { getAbpConfig } from '../api/abpconfig';
import { useAppStore } from '../store/modules/app';

export async function initAbpConfig() {
  const config = await getAbpConfig();
  const appStore = useAppStore();
  appStore.abpConfig = config;
}
