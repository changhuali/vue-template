// es6 shim
import 'babel-polyfill';
import { createApp } from './app';

const { app, store, router } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  app.$mount('#vue-view');
});
