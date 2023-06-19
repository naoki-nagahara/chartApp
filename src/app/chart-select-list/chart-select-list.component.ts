import { Component } from '@angular/core';
import { ColoType, ColorObj } from '../crypt';
import { CryptServiceService } from '../service/cript-service.service';

@Component({
  selector: 'app-chart-select-list',
  templateUrl: './chart-select-list.component.html',
  styleUrls: ['./chart-select-list.component.scss'],
})
export class ChartSelectListComponent {
  constructor(private cryptService: CryptServiceService) {}
  cryptItem: ColoType = ColorObj;
  cryptValue: string[] = [];

  changeCrypt(val: string) {
    this.cryptService.setCryptValue(val);
    this.cryptService.setCryptColor(this.cryptItem[val]);
    this.cryptService.getAPIData().subscribe();
    console.log('クリプトを変更して、再発火');
  }

  ngOnInit() {
    this.cryptValue = Object.keys(this.cryptItem);
  }
}
