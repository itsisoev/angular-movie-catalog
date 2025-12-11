import {ChangeDetectionStrategy, Component, input, model, signal} from '@angular/core';
import {IMovie} from '../../shared/models/movie.model';

@Component({
  selector: 'features-movie-modal',
  imports: [],
  templateUrl: './movie-modal.html',
  styleUrl: './movie-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieModal {
  movie = model<IMovie>();

  isOpen = signal(false);

  open(movie: IMovie) {
    this.movie.set(movie);
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }
}
