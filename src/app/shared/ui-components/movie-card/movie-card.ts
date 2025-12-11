import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {IMovie} from '../../models/movie.model';
import {SlicePipe} from '@angular/common';

@Component({
  selector: 'ui-movie-card',
  imports: [
    SlicePipe
  ],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCard {
  movie = input<IMovie>();
}
