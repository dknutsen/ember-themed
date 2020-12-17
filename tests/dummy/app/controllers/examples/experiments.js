import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ExperimentsController extends Controller {
  @service emberThemed;

  width = 'small';
  height = 'small';
  y = null;
  x = null;

  gallerySize = 'small';
}
