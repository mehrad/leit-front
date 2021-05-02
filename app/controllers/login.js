import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  actions: {
    changeLoginState() {
      this.toggleProperty('loginState');
    },

    loginOrSignUp() {
      const loginState = this.loginState;
      const email = this.get('email');
      const name = this.get('name');
      const password = this.get('password');
      return this.get('auth')
        .loginOrSignUp(loginState, name, email, password)
        .then(() => {
          this.transitionToRoute('/');
        })
        .catch(error => alert(error));
    }
  },

  auth: service(),

  loginState: true
});