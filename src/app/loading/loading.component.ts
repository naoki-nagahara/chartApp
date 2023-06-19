import { Component } from '@angular/core';
import { CryptServiceService } from '../service/cript-service.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  isLoading: boolean = false;
  constructor(private cryptService: CryptServiceService) {}
  ngOnInit() {
    this.cryptService.loadingSubject.subscribe(
      (data) => (this.isLoading = data)
    );
  }
}
