import { Component } from '@angular/core';
import { AccountsService } from 'src/app/service/accounts.service';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.css']
})
export class AccountTypeComponent {
  types:any[]=[];
  constructor(private service:AccountsService){}
  ngOnInit(): void {
    this.fetchTypes();
  }

  fetchTypes() {
    this.service.getTypes().subscribe(
      (response) => {
        this.types = response;
        console.log(this.types);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
