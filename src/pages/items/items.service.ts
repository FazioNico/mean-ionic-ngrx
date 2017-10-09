/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   27-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 09-10-2017
 */

import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { HttpService } from "../../providers/http-service/http.service";

import { EnvVariables } from '../../app/environment/environment.token';
import { IEnvironment } from "../../app/environment/env-model";

/**
 * Items Accessor class for httpService
 */
@Injectable()
export class ItemsService extends HttpService {

  private readonly ref:string = '/todos'

  constructor(
    public http: Http,
    @Inject(EnvVariables) public envVariables:IEnvironment
  ) {
    super(http,envVariables);
    this.path = this.ref
  }

}
