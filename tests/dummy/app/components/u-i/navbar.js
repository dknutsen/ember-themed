import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class UINavbarComponent extends Component {
  @tracked toggleNav = false;
}
