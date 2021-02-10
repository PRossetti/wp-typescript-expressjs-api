import ArtistService from '@services/Artist.service';
import AbstractControllerWrapper from '@routes/shared/abstract.controller';

const AbstractController = AbstractControllerWrapper(ArtistService);

export default class ArtistController extends AbstractController {}
