import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loading {

}
