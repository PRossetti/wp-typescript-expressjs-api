import ReleaseService from '@services/Release.service';
import AbstractControllerWrapper from '@routes/shared/abstract.controller';

const AbstractController = AbstractControllerWrapper(ReleaseService);

export default class ArtistController extends AbstractController {}
