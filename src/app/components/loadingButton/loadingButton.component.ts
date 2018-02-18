import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rm-loading-button',
  templateUrl: './loadingButton.component.html',
  styleUrls: ['./loadingButton.component.scss'],
})
export class LoadingButtonComponent {
  @Output()
  private push = new EventEmitter();

  @Input()
  private disabled;

  @Input()
  private loading;

  private doClick() {
    this.push.emit();
  }
}
