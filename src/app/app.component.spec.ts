/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   16-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 16-04-2017
 */


  import { async, TestBed, ComponentFixture } from '@angular/core/testing';
  import { IonicModule } from 'ionic-angular';

  import { StatusBar } from '@ionic-native/status-bar';
  import { SplashScreen } from '@ionic-native/splash-screen';

  import {} from 'jasmine';

  import { MyApp } from './app.component';
  import { HomePage } from '../pages/home/home';

  describe('MyApp Component', () => {

    let component:MyApp;
    let fixture: ComponentFixture<MyApp>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [MyApp],
        imports: [
          IonicModule.forRoot(MyApp)
        ],
        providers: [
          StatusBar,
          SplashScreen
        ]
      })
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(MyApp);
      component = fixture.componentInstance;
    });

    it ('should be created', () => {
      expect(fixture).toBeTruthy();
  		expect(component).toBeTruthy();
      expect(component instanceof MyApp).toBe(true);
    });

    it ('should app initialise with a root page of HomePage', () => {
      expect(component['rootPage']).toBe(HomePage);
    });

  });
