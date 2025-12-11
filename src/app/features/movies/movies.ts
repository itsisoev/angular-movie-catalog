import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';
import {MovieCard} from '../../shared/ui-components/movie-card/movie-card';
import {MovieService} from '../../shared/services/movie.service';
import {IMovie} from '../../shared/models/movie.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Loading} from '../../shared/ui-components/loading/loading';
import {MovieModal} from '../movie-modal/movie-modal';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs';

@Component({
  selector: 'features-movies',
  imports: [
    MovieCard,
    Loading,
    MovieModal
  ],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Movies implements OnInit {
  private readonly movieService = inject(MovieService);
  private readonly destroyRef = inject(DestroyRef);

  movies = signal<IMovie[]>([]);
  page = signal<number>(1);
  limit = signal<number>(5);
  total = signal<number>(0);

  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  @ViewChild('movieModal') movieModal!: MovieModal;


  hasMore = computed(() => {
    return this.movies().length < this.total();
  });

  ngOnInit() {
    this.movieService.search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        this.isLoading.set(true);
        this.error.set(null);
        if (!query) return this.movieService.getMovies(1, this.limit());
        return this.movieService.searchMovies(query).pipe(
          map(data => ({
            first: 1,
            prev: null,
            next: null,
            last: 1,
            pages: 1,
            items: data.length,
            data
          }))
        );
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: response => {
        this.movies.set(response.data);
        this.total.set(response.items);
        this.page.set(1);
        this.isLoading.set(false);
      },
      error: err => {
        this.error.set(err.message || 'Ошибка при поиске');
        this.isLoading.set(false);
      }
    });
  }




  loadMovies() {
    this.isLoading.set(true);
    this.error.set(null);

    this.movieService.getMovies(this.page(), this.limit())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const moviesArray = Array.isArray(response.data) ? response.data : [];
          this.movies.set([...this.movies(), ...moviesArray]);
          this.total.set(response.items);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set(err?.message || 'Произошла ошибка при загрузке фильмов');
          this.isLoading.set(false);
        }
      });
  }

  openModal(movie: IMovie) {
    this.movieModal.open(movie);
  }

  showMore() {
    this.page.update(v => v + 1);
    this.loadMovies();
  }
}
