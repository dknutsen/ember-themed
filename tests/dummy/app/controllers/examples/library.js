import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ExamplesLibraryController extends Controller {
  @service emberThemed;

  alertVariant = 'default';
  buttonVariant = 'default';
}
