import EmberRouter from '@ember/routing/router';
import config from 'leit-ember-apollo/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('boxes', { path: '/' });
  this.route('box-create');
  this.route('login');
});
