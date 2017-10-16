/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   16-10-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 16-10-2017
*/

import { TestBed, getTestBed, fakeAsync } from '@angular/core/testing';
import { IonicModule, AlertController } from 'ionic-angular';
import { AlertControllerMock } from 'ionic-mocks';
import {} from 'jasmine';

import { AlertService } from './alert-service';

let alertService:AlertService;

describe('Provider: AlertService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
      ]
      });
  });
  beforeEach(() => {
    const testbed = getTestBed();
    alertService = testbed.get(AlertService);
  })

  it('should be created',  () => {
    expect(alertService).toBeTruthy();
  });

  it('should display Ionic Alert Component', fakeAsync(() => {

    let alert = alertService.doDisplayAlert({});
    alert.subscribe(res => {
      expect(res).toBeTruthy();
      expect(res).toEqual(true);
    })
  }));

});
