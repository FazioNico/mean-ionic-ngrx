/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   21-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-04-2017
 */

 import { browser, element, by } from 'protractor';

 describe('MyApp', () => {

   beforeEach(() => {
     browser.get('');
   });

   it('should have a title', () => {
     expect(browser.getTitle()).toBeTruthy("Login");
   });

   it('should have {nav}', () => {
     expect(element(by.css('ion-navbar')).isPresent()).toBeTruthy();
   });

   it('should have correct nav text for Entry point', () => {
     expect(element(by.css('ion-navbar:first-child')).getText()).toBeTruthy('Login');
   });

 });
