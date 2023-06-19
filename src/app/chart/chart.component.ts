import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Route, Router } from '@angular/router';
import { Asks, JSonType } from '../crypt';
import { Subscription, Observable, catchError } from 'rxjs';
import { CryptServiceService } from '../service/cript-service.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  createChart: any;
  jsonData!: JSonType;
  Asks!: Asks[];
  price!: any;
  size!: string[];
  chartColor: string = '';
  subscription!: Subscription;
  cryptName: string = '';

  constructor(
    private cryptService: CryptServiceService,
    private router: Router
  ) {}

  // createCharts() {
  //   this.subscription = this.cryptService.ColorSubject.subscribe(
  //     (data) => (this.chartColor = data)
  //   );
  //   this.subscription = this.cryptService.getData().subscribe((data) => {
  //     console.log('チャートできあがる');
  //     this.jsonData = data;
  //     this.cryptName = this.jsonData.data.symbol;
  //     this.price = this.jsonData.data.asks.map((data) => data.price);
  //     this.size = this.jsonData.data.asks.map((data) => data.size);
  //     this.Chart();
  //     this.cryptService.setLoading(false);
  //   });
  //   this.cryptService.getAPIData().subscribe();
  // }
  createCharts() {
    this.subscription = this.cryptService.ColorSubject.subscribe(
      (data) => (this.chartColor = data)
    );
    this.subscription = this.cryptService.getData().subscribe((data) => {
      console.log('チャートできあがる');
      try {
        this.jsonData = data;
        this.cryptName = this.jsonData.data.symbol;
        this.price = this.jsonData.data.asks.map((data) => data.price);
        this.size = this.jsonData.data.asks.map((data) => data.size);
        this.Chart();
        this.cryptService.setLoading(false);
      } catch (e) {
        //エラー画面遷移
        setTimeout(() => {
          this.cryptService.setLoading(false);
          this.router.navigate(['/error']);
        }, 1500);
        console.log(e, 'エラーだよ！！！！');
      }
    });
    this.cryptService.getAPIData().subscribe();
  }

  Chart() {
    if (this.createChart) {
      this.createChart.destroy();
    }
    Chart.register(...registerables);
    this.createChart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.size,
        datasets: [
          {
            label: this.cryptName,
            data: this.price,
            borderColor: [this.chartColor],
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
          },
        },
      },
    });
  }

  ngOnInit() {
    this.createCharts();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('データ破棄');
  }
}
