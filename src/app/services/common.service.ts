import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http_call: HttpClient, private router: Router) {}
  public eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  async postCall(endPoint: any, payload: any) {
    try {
      let res: any = this.http_call
        .post(endPoint, payload, { observe: 'body' })
        .toPromise();
      return res;
    } catch (error) {
      return error;
    }
  }
  async getCall(endPoint: any) {
    try {
      let res: any = this.http_call
        .get(endPoint, { observe: 'body' })
        .toPromise();
      return res;
    } catch (error) {
      return error;
    }
  }
}
