import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SelectComponent extends Component {
  @action onChange(event) {
    if (this.args.onChange) this.args.onChange(event.target.value);
  }
}
