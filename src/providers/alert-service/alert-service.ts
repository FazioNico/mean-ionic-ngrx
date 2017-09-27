/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   19-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 26-09-2017
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

  constructor(
    private alertCtrl: AlertController
  ) {
  }

  /*
    Displaying State alert with Ionic AlertController
  */
  doDisplayAlert(_payload):Observable<any>{
    let alert:Alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: _payload,
      buttons: ['Dismiss']
    });
    alert.present();
    return Observable.create((observer) => {
      observer.next({ type: 'ERROR_DISPLAYED' })
    })
  }
}
