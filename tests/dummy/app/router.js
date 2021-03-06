import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('posts', function() {
    this.route('intro');
    this.route('config');
    this.route('usage');
  });
  this.route('examples', function() {
    this.route('library');
    this.route('persistence');
    this.route('experiments');
  });
});
