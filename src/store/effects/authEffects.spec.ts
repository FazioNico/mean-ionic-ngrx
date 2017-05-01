/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   01-05-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 01-05-2017
*/

import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { async, TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {} from 'jasmine';

import { Observable } from 'rxjs/Observable';

import { AuthService } from "../../providers/auth-service/auth-service";
import { MainActions } from '../../store/actions/mainActions';
import { AuthEffects } from '../../store/effects/authEffects';
import * as fromAuthCheck from '../../store/reducers/authCheckedReducer';

describe('Auth Effects', () => {

  let runner, authEffects, authService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      AuthEffects,
      MainActions,
      {
        provide: AuthService,
        useValue: jasmine.createSpyObj('authService', ['isAuth'])
      }
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    authEffects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
  });

  describe('checkAuthAction$', () => {
    it('Get user auth status', inject([MainActions], (mainActions: any)=> {

      const resultToReturn =  mainActions.checkAuthNoUser()
      authService.isAuth.and.returnValue(Observable.of(resultToReturn));

      const expectedResult = resultToReturn;

      runner.queue(mainActions.checkAuth());

      authEffects.checkAuthAction$.subscribe(result => {
        expect(result).toEqual(expectedResult);
      });

    }));
  });

})
