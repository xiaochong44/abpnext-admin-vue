import { PiniaPluginContext } from 'pinia';
import { merge } from 'lodash-es';

interface Storage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: any) => void;
  removeItem: (key: string) => void;
}

export interface Option {
  key: string;
  replace: boolean;
  storage?: Storage;
  filter?: (id: string) => boolean;
}

export default function createPersistedState(option?: Option) {
  const options = merge(option, { key: '_pinia_', replace: true });
  const storage = options.storage || localStorage;
  function getState(id: string) {
    const storageState = storage.getItem(options.key + id);
    if (storageState) {
      return JSON.parse(storageState);
    }
  }
  return function persited(content: PiniaPluginContext) {
    const cacheState = getState(content.store.$id);
    if (cacheState && (!options.filter || (options.filter && options.filter(content.store.$id)))) {
      if (options.replace) {
        content.store.$patch(cacheState);
      } else {
        content.store.$patch(merge(cacheState, content.store.$state));
      }
    }
    content.store.$subscribe((mu, state) => {
      if (!options.filter || (options.filter && options.filter(mu.storeId))) {
        storage.setItem(options.key + mu.storeId, JSON.stringify(state));
      }
    });
  };
}
