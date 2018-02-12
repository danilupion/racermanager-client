import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rm-loading-button',
  templateUrl: './loadingButton.component.html',
  styleUrls: ['./loadingButton.component.scss'],
})
export class LoadingButtonComponent {
  @Output() push = new EventEmitter();
  @Input() disabled;
  @Input() loading;

  doClick() {
    this.push.emit();
  }
}
