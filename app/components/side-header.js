import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from "@ember/service";

export default Component.extend({
  actions: {
    logout() {
      this.get('auth').logout().then(() => {
        this.sendAction('onLogout');
      });
    }
  },

  auth: service(),

  userLoggedIn: true
});