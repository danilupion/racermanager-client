import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rm-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  @Input()
  public transaction = '';

  constructor(
    private authService: AuthService,
  ) {
    console.log('TRANSACTIONsdsds', this.transaction);
    // console.log('USER OWNER', this.transaction.userId);
   }

  public ngOnInit() { }
}
