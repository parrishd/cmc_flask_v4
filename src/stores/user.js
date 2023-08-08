import { defineStore } from "pinia";
import { LocalStorage } from "quasar";

export const useUserStore = defineStore("user", {
  state: () => ({
    authenticated: LocalStorage.getItem("authenticated") || false,
  }),
  actions: {
    authenticate() {
      this.authenticated = true;
      LocalStorage.set("authenticated", this.authenticated);
    },
    deAuthenticate() {
      this.authenticated = false;
      LocalStorage.set("authenticated", this.authenticated);
    },
  },
});
