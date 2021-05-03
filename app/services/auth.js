import RSVP from 'rsvp';
import signInUserMutation from 'leit-ember-apollo/gql/mutations/signInUser.graphql';
import Service from '@ember/service';
import { inject as service } from "@ember/service";
import { computed } from '@ember/object';

const GC_USER_ID = '';
const GC_AUTH_TOKEN = '';

export default Service.extend( {
    authToken: null,
    userId: null,
    apollo: service(),

    isLoggedIn: computed('userId', function() {
        return !!this.get('userId');
      }),
      
    loginOrSignUp(state, name, email, password) {
        let variables;
        return new RSVP.Promise((resolve, reject) => {
          if (state) {
            variables = { email, password };
            this.get('apollo')
              .mutate({ mutation: signInUserMutation, variables }, 'signIn')
              .then(result => {
                this.saveUserData(result.user.id, result.user.authenticationToken);
                resolve();
              })
              .catch(error => reject(error));
          } else {
            // variables = { name, email, password };
            // this.get('apollo')
            //   .mutate({ createUser, variables }, 'user')
            //   .then(result => {
            //     this.saveUserData(result.user.id, result.token);
            //     resolve();
            //   })
            //   .catch(error => reject(error));
          }
        });
      },
      
    logout() {
        return new RSVP.Promise(resolve => {
            this.removeUserId();
            this.removeAuthToken();
            resolve();
        });
    },
    
    saveUserData(id, token) {
        this.setUserId(id);
        this.setAuthToken(token);
    },

    init() {
        this._super(...arguments);
        this.getUserId();
        this.getAuthToken();
    },
    
    getUserId() {
        const userId = localStorage.getItem(GC_USER_ID);
        this.setUserId(userId);
        return userId;
    },

    getAuthToken() {
        const token = localStorage.getItem(GC_AUTH_TOKEN);
        this.setAuthToken(token);
        return token;
    },
    
    removeUserId() {
        localStorage.removeItem(GC_USER_ID);
        this.set('userId', null);
    },
    
    removeAuthToken() {
        localStorage.removeItem(GC_AUTH_TOKEN);
        this.set('authToken', null);
    },
    
    setUserId(id) {
        localStorage.setItem(GC_USER_ID, id);
        this.set('userId', id);
    },
    
    setAuthToken(token) {
        localStorage.setItem(GC_AUTH_TOKEN, token);
        this.set('authToken', token);
    },
    
});
