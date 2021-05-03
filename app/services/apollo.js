import ApolloService from 'ember-apollo-client/services/apollo';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { inject as service } from "@ember/service";

class OverriddenApolloService extends ApolloService {
    @service()
    auth;

    clientOptions() {
      return {
        link: this.link(),
        cache: this.cache(),
      };
    }

    link() {
        let httpLink = super.link()
        
        let authLink = setContext((request, context) => {
            return this._runAuthorize(request, context);
        });
        
        return authLink.concat(httpLink);
    }

    _runAuthorize() {
        if (!this.get('auth.isLoggedIn')) {
          return {};
        }
        return new Promise(success => {
          let headers = {};
          let token = this.get('auth.authToken');
          headers['Authorization'] = `${token}`;
    
          success({ headers });
        });
    }
}

export default OverriddenApolloService;