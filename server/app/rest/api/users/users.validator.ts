/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   15-12-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-12-2017
 */

import { check, validationResult } from 'express-validator/check';

export function userDataValidator()  {
  return [
    check('password', 'passwords must be at least 5 chars long and contain one number')
      .exists().withMessage('email is require')
      .isLength({ min: 5 })
      .matches(/\d/),
    check('email')
      .exists().withMessage('email is require')
      .isLength({ min: 5 }).withMessage('email must be at least 5 chars long')
      .isEmail().withMessage('field value must be an email')
      .trim()
      .normalizeEmail()
  ];
}
