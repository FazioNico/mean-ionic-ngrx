/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   19-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 05-01-2018
 */

import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { AlertController, Alert } from 'ionic-angular';

/*
  Generated class for the AlertService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AlertService {

  private alert:Alert;

  constructor(
    private alertCtrl: AlertController
  ) {
  }

  /*
    Displaying State alert with Ionic AlertController
  */
  doDisplayAlert(_payload:any):Observable<boolean>{
    this.alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: _payload.message || 'Error...',
      buttons: ['Dismiss']
    });

    return Observable.create((observer:any) => {
      this.alert.present()
                .then(_=> observer.next(true))
                .catch(_=> observer.next(false))
    })
  }
}
