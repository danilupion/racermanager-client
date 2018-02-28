import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rm-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})
export class DriverComponent implements OnInit {

  @Input()
  driverCode: string;

  urlDriver: string;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.urlDriver = `../../../assets/pilots/${this.driverCode}.jpg`;
  }

  changingPilot() {
    alert('CHANGING PILOT');
  }
}
