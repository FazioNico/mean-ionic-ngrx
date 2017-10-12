/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   16-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 12-10-2017
 */

 import { async, fakeAsync, TestBed, tick, ComponentFixture } from '@angular/core/testing';
 import { IonicModule, Loading, LoadingController } from 'ionic-angular';
 import { LoadingControllerMock, ConfigMock, PlatformMock } from 'ionic-mocks';
 import {} from 'jasmine';

 import { StatusBar } from '@ionic-native/status-bar';
 import { SplashScreen } from '@ionic-native/splash-screen';

 import { MyApp } from './app.component';

 import { NgRxStoreModule } from "../store/store.module";

 describe('MyApp Component', () => {

   let component:MyApp;
   let fixture: ComponentFixture<MyApp>;

   let loadingCtrl: any;
   let loadingSpinner: any;

   beforeEach(async(() => {
     TestBed.configureTestingModule({
       declarations: [MyApp],
       imports: [
         NgRxStoreModule.forRoot(),
         IonicModule.forRoot(MyApp),
       ],
       providers: [
         StatusBar,
         SplashScreen,
         {provide: LoadingController, useFactory: () => LoadingControllerMock.instance()},
       ]
     })
   }));

   beforeEach(() => {
     fixture = TestBed.createComponent(MyApp);
     component = fixture.debugElement.componentInstance;

   });

   it ('should be created', () => {
     expect(fixture).toBeTruthy();
 		 expect(component).toBeTruthy();
     expect(component instanceof MyApp).toBe(true);
   });

   it ('should app initialise with a root page of LoginPage', () => {
    component.ngOnInit();
    expect(component['rootPage']).toBe('LoginPage');
   });

   it('should display Loader on call', fakeAsync(() => {
        loadingCtrl = fixture.componentInstance.loadingCtrl
        loadingSpinner = fixture.componentInstance.loadingCtrl.create();
         loadingCtrl.create.calls.reset();
         loadingSpinner.present.calls.reset();

         expect(loadingCtrl.create).not.toHaveBeenCalledTimes(1);
         expect(loadingSpinner.present).not.toHaveBeenCalledTimes(1);

         expect(loadingCtrl.create).not.toHaveBeenCalled();
         expect(loadingSpinner.present).not.toHaveBeenCalled();

         fixture.componentInstance.displayLoader();
         tick();

         expect(loadingCtrl.create).toHaveBeenCalledTimes(1);
         expect(loadingSpinner.present).toHaveBeenCalledTimes(1);

         expect(loadingCtrl.create).toHaveBeenCalled();
         expect(loadingSpinner.present).toHaveBeenCalled();
   }));


  it('should dismiss Loader on call', fakeAsync(() => {
       loadingCtrl = fixture.componentInstance.loadingCtrl
       loadingSpinner = fixture.componentInstance.loadingCtrl.create();
        loadingCtrl.create.calls.reset();
        loadingSpinner.present.calls.reset();

        expect(loadingCtrl.create).not.toHaveBeenCalledTimes(1);
        expect(loadingSpinner.present).not.toHaveBeenCalledTimes(1);

        expect(loadingCtrl.create).not.toHaveBeenCalled();
        expect(loadingSpinner.present).not.toHaveBeenCalled();

        fixture.componentInstance.displayLoader();
        tick();

        expect(loadingCtrl.create).toHaveBeenCalledTimes(1);
        expect(loadingSpinner.present).toHaveBeenCalledTimes(1);

        expect(loadingCtrl.create).toHaveBeenCalled();
        expect(loadingSpinner.present).toHaveBeenCalled();


        fixture.componentInstance.dismissLoader();
        tick();

        expect(loadingSpinner.dismiss).toHaveBeenCalledTimes(1);

        expect(loadingSpinner.dismiss).toHaveBeenCalled();
  }));

   //
  //  /**
  //   * NgRx Testing Reducer: AuthCheck
  //   * Inspiration from: http://redux.js.org/docs/recipes/WritingTests.html
  //   */
  //  it('should return correct state when user is not autenticate', () => {
  //      const state = { authChecked: false };
  //      const actual = fromAuthCheck.reducer(state, {type: MainActions.CHECK_AUTH_NO_USER});
  //      const expected = state;
  //      expect(actual).toEqual(expected);
  //  });
   //
  //  it('should return correct state when user is autenticate', () => {
  //      const state = { authChecked: true };
  //      const actual = fromAuthCheck.reducer(state, {type: MainActions.CHECK_AUTH_SUCCESS});
  //      const expected = state;
  //      expect(actual).toEqual(expected);
  //  });
   //
  //  it('should return correct state when check autentication failed', () => {
  //      const state = { authChecked: false };
  //      const actual = fromAuthCheck.reducer(state, {type: MainActions.CHECK_AUTH_FAILED});
  //      const expected = state;
  //      expect(actual).toEqual(expected);
  //  });
   //
  //  it('should return correct state when user login success', () => {
  //      const state = { authChecked: true, currentCreds: 'TOKEN_MOCKUP' };
  //      const actual = fromAuthCheck.reducer(state, {type: MainActions.LOGIN_SUCCESS,payload: {token:'TOKEN_MOCKUP'} });
  //      const expected = state;
  //      expect(actual).toEqual(expected);
  //  });
   //
  //  it('should return correct state when user logout success', () => {
  //      const state = { authChecked: false };
  //      const actual = fromAuthCheck.reducer(state, {type: MainActions.TOKEN_DELETE });
  //      const expected = state;
  //      expect(actual).toEqual(expected);
  //  });
 });
