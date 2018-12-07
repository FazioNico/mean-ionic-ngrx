// import {CustomValidators} from '@app/shared/validators/custom.validators';
// import {FormControl} from '@angular/forms';

// describe('Custom validators', () => {

//   describe('password', () => {
//     const passwordValidatorFn = CustomValidators.password();
//     const formControl = new FormControl();

//     it('should invalidate password', () => {
//       const invalidPasswords = ['tarte', 'TARTE', '0123456', 'é3', '@', '$^^%'];
//       invalidPasswords.forEach((password: string) => {
//         formControl.setValue(password);
//         expect(passwordValidatorFn(formControl)).not.toBeNull();
//       });
//     });

//     it('should validate password', () => {
//       const validPasswords = ['tartoprune1', '1o', '1O', 'O1', 'o1', 'a1è!çà'];
//       validPasswords.forEach((password: string) => {
//         formControl.setValue(password);
//         expect(passwordValidatorFn(formControl)).toBeNull();
//       });
//     });

//   });

// });
