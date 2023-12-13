import { Component } from '@angular/core';
import { AccountsService } from 'src/app/service/accounts.service';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent {
  cash: any[]=[];

  constructor(private service:AccountsService){}

  ngOnInit(): void {
    this.fetchCash();
  }



  fetchCash() {
    this.service.getCash().subscribe(
      (response) => {
        this.cash = response;
        console.log(this.cash);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
