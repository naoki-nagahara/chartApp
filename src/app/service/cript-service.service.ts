import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject, tap, Observable, catchError, BehaviorSubject } from 'rxjs';
import { JSonType } from '../crypt';

@Injectable({
  providedIn: 'root',
})
export class CryptServiceService {
  subjectApi = new Subject<JSonType>();
  cryptSubject = new BehaviorSubject<string>('BTC');
  loadingSubject = new BehaviorSubject<boolean>(false);
  ColorSubject = new BehaviorSubject<string>('RGB(236, 145, 33)');
  URL: string = 'https://api.coin.z.com/public/v1/orderbooks?symbol=';
  params: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  getAPIData() {
    this.setLoading(true);
    this.cryptSubject.subscribe((data) => (this.params = data));
    console.log(this.params, 'パラメーター取得');
    //APIデータだけを返す。監視してない
    return this.http.get<JSonType>(this.URL + this.params).pipe(
      tap((data: JSonType) => {
        console.log('データ生成');
        this.subjectApi.next(data);
      }),
      catchError((e): any => {
        console.log(e);
        setTimeout(() => {
          this.setLoading(false);
          this.router.navigate(['/error']);
        }, 1500);
      })
    );
  }

  setLoading(bool: boolean) {
    console.log(bool);
    return this.loadingSubject.next(bool);
  }

  setCryptColor(val: string) {
    console.log(val);
    return this.ColorSubject.next(val);
  }

  setCryptValue(val: string) {
    return this.cryptSubject.next(val);
  }

  getData(): Observable<JSonType> {
    return this.subjectApi.asObservable();
  }
}
