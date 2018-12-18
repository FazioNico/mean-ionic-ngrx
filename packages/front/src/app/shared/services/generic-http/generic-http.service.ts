import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  of, from as fromPromise } from 'rxjs';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

const STORAGE_ITEM = 'authToken';

export abstract class GenericHttpService {

  public readonly apiEndPoint: string;
  // public path = '';
  public tokentStorage = '';

  constructor(public http: HttpClient) {
    this.apiEndPoint = environment.apiEndpoint;
  }

  protected get(_path: string): Observable<any> {
    // this.checkStorage();
    // Define Heders request
    const options: any = { headers: this.getHeaders() };
    // post request
    return this.http.get(`${this.apiEndPoint}${_path}`, options).pipe(map(res => {
      if ((res as any).token) { this.saveToken(res); }
      return res;
    }));
  }

  protected getFrontend(_path: string): Observable<any> {
    // this.checkStorage();
    // Define Heders request
    const options: any = { headers: this.getHeaders() };
    // post request
    return this.http.get(`/${_path}`, options).pipe(map(res => {
      return res;
    }));
  }

  protected post(_path: string, body: any): Observable<any> {
    // this.checkStorage();
    const options: any = { headers: this.getHeaders() };
    return this.http.post(`${this.apiEndPoint}${_path}`, body, options).pipe(map(res => {
      if ((res as any).token) { this.saveToken(res); }
      return res;
    }));
  }

  protected put(_path: string, body: any): Observable<any> {
    // this.checkStorage();
    const url = `${this.apiEndPoint}${_path}`; // see mdn.io/templateliterals
    const options: any = { headers: this.getHeaders() };
    return this.http.put(url, body, options).pipe(
      map(res => {
        if ((res as any).token) { this.saveToken(res); }
        return res;
      }),
    );
  }

  protected delete(_path: string, id?: string): Observable<any> {
    // this.checkStorage();

    const url = `${this.apiEndPoint}${_path}/${id}`;
    const options: any = { headers: this.getHeaders() };
    return this.http.delete( url, options).pipe(
      map(res => {
        if ((res as any).token) { this.saveToken(res); }
        return res;
      })
    );
  }

   /*
   * Methode to save user token to localstorage with request with `providerResponse` from request Http
   * @param providerResponse toto tutu
   */
  protected saveToken(providerResponse: any)  {
    return fromPromise(
      Promise.resolve(localStorage.setItem(STORAGE_ITEM, providerResponse.token))
      .then(_ => providerResponse.token)
      .catch(err => err)
    );
  }

  protected  dellToken(): Observable<void> {
    return fromPromise(
      Promise.resolve(localStorage.removeItem(STORAGE_ITEM))
    );
  }


  /*
  * [Deprecated]: see token-interceptor.ts
  * Check if localstorage exist with datas
  * */
  checkStorage(): void {
    console.warn('[Deprecated]: see token-interceptor.ts');
    const token: string|null = localStorage.getItem(STORAGE_ITEM);
    this.tokentStorage = token || '';
  }

  /*
  * Extendable methode to set Headers request.
  * Can be extended with more HttpHeaders
  * like this:
  *   let extendedHeaders = this.getHeaders()
  *                             .set(KEY,VALUE)
  *
  * or with extended class like this:
  *   getHeaders():HttpHeaders{
  *     return super.getHeaders().set(KEY,VALUE)
  *   }
  */
  getHeaders(): HttpHeaders {
    const header = new HttpHeaders().set('cache-control', 'no-cache');
    // if (this.tokentStorage) {
    //   console.warn('[Deprecated]: see token-interceptor.ts');
    //   header.set('x-access-token', this.tokentStorage);
    // }
    return header;
  }
}
