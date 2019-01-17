import { createApp } from './app';

export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp();
  router.push(context.url);
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
      return reject({ code: 404 });
    }
    Promise.all(matchedComponents.map((Component) => {
      if (Component.getAsyncDataAtServer) {
        // 必须返回Promise（eg. dispatch action）
        return Component.getAsyncDataAtServer({
          store,
        });
      }
      return Component;
    })).then(() => {
      context.state = store.state;
      resolve(app);
    }).catch(reject);
  }, reject);
});
