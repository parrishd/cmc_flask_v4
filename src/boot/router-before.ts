import { boot } from "quasar/wrappers";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router }) => {
  router.beforeEach((to, from, next) => {
    console.log("%%%%%%%%%%%% router.beforeEach %%%%%%%%%%%%");
    console.log(`to.meta: ${JSON.stringify(to.meta)}`);
    console.log(`from: ${from.name} --> to: ${to.name}`);
    console.log("%%%%%%%%%%%% /router.beforeEach %%%%%%%%%%%");
    return next();
  });
});
