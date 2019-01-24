import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public user: {email: string} = {email: ''};
  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  go(url: string) {
    if (!url) { return; }
    this._router.navigate([url]);
  }
}
