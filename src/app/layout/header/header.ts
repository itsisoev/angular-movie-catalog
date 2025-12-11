import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MovieService} from '../../shared/services/movie.service';

@Component({
  selector: 'layout-header',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly movieService = inject(MovieService);
  searchQuery = signal<string>('');

  onSearchChange(query: string) {
    this.searchQuery.set(query);
    this.movieService.setSearch(query);
  }
}
