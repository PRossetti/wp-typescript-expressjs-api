import LabelService from '@services/Label.service';
import AbstractControllerWrapper from '@routes/shared/abstract.controller';

const AbstractController = AbstractControllerWrapper(LabelService);

export default class ArtistController extends AbstractController {}
