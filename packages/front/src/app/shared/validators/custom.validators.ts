import {AbstractControl, ValidationErrors, ValidatorFn, Validators, FormGroup, FormArray} from '@angular/forms';

export namespace CustomValidators {

  export function emptyOrPattern(pattern: RegExp | string): ValidatorFn {
    if (!pattern) {
      return Validators.nullValidator;
    }
    return (control: AbstractControl): ValidationErrors | null => {
      if (typeof pattern === 'string') {
        if (!pattern.startsWith('^')) {
          pattern = '^' + pattern;
        }
        if (!pattern.endsWith('$')) {
          pattern += '$';
        }
        pattern = new RegExp(pattern);
      }
      if (control.value && !pattern.test(control.value)) {
        return {'emptyOrPattern': {value: control.value}};
      }
      return null;
    };
  }

  export function emptyOrNumber(control: AbstractControl, allowNegative = false): ValidationErrors | null {
    if (emptyOrPattern('[0-9]*')(control)) {
      return {'emptyOrNumber': {value: control.value}};
    }
    return null;
  }

  export function integerOnly(allowNegative = false): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (control.value === null && control.value === undefined) {
        return { 'integerOnly': { value: control.value } };
      }
      const pattern = allowNegative ? '-?[0-9]*' : '[0-9]*';
      if (emptyOrPattern(pattern)(control)) {
        return {'integerOnly': {value: control.value}};
      }
      return null;
    };
  }

  export function fromList(list: any[]): ValidatorFn {
    if (!list) {
      return Validators.nullValidator;
    }
    return (control: AbstractControl): {[key: string]: any} => {
      if (list.find(item => item.toString() === control.value.toString()) === undefined) {
        return {'fromList': {value: control.value}};
      }
      return null;
    };
  }

  let oneFromFormGroupRequiredValidation = false;
  export function oneFromFormGroupRequired(controlNames: string[]): ValidatorFn {
    if (!controlNames) {
      return Validators.nullValidator;
    }
    return (control: AbstractControl): {[key: string]: any} => {
      // Don't validate until parent is defined
      if (!control.parent) {
        return null;
      }
      // Get controls
      const ctrls: AbstractControl[] = [];
      for (const name of controlNames) {
        ctrls.push(control.parent.controls[name]);
      }
      // Validate all controls, prevent infinite validation loop using flag
      if (!oneFromFormGroupRequiredValidation) {
        oneFromFormGroupRequiredValidation = true;
        ctrls.forEach(ctrl => ctrl.updateValueAndValidity());
        oneFromFormGroupRequiredValidation = false;
      }
      // Validate current control
      if (ctrls.find(ctrl => ctrl.value !== '') === undefined) {
        return {'oneFromFormGroupRequired': {value: control.value}};
      }
      return null;
    };
  }

  export function numberOnly(control: AbstractControl): {[key: string]: any} {
    if (control.value !== null && control.value !== undefined && control.value !== '' &&
        (!isNaN(parseFloat(control.value)) && isFinite(control.value))) {
      return null;
    }
    return {'numberOnly': {value: control.value}};
  }

  export function password(allowEmpty = false): ValidatorFn {
    const passwordRegex = /(?=.*[a-zA-Z])(?=.*[0-9]+).*/;
    return (control: AbstractControl): ValidationErrors | null  => {
      if (!passwordRegex.test(control.value) && !allowEmpty) {
        return {'password': {requiredPattern: passwordRegex, value: control.value}};
      } else {
        return null;
      }
    };
  }
  export function email(allowEmpty = false): ValidatorFn {
    const emailRegex = /\S+@\S+\.\S+/;
    return (control: AbstractControl): ValidationErrors | null  => {
      if (!emailRegex.test(control.value) && !allowEmpty) {
        return {'email': {requiredPattern: emailRegex, value: control.value}};
      } else {
        return null;
      }
    };
  }

  // Force display error messages, used at form submit
  export function forceFormValidation(form: FormGroup | FormArray) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control) {
        if (control instanceof FormGroup || control instanceof FormArray) {
          forceFormValidation(control);
        } else {
          // force status change
          if (control.errors) {
            const errors = control.errors;
            control.setErrors(null);
            control.setErrors(errors);
          }
        }
      }
    });
  }
}
