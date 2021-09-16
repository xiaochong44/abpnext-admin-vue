import type { App } from 'vue';
import { createPinia } from 'pinia';
import createPersistedState from './persisted';

const store = createPinia();
const persistedStores = ['app'];
store.use(
  createPersistedState({
    key: '_pinia_',
    replace: true,
    filter: (id) => {
      return persistedStores.indexOf(id) >= 0;
    },
  }),
);
export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
