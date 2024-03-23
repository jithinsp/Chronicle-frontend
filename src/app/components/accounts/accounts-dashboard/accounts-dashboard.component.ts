import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/service/accounts.service';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.css']
})
export class AccountsDashboardComponent {

  displayedColumns: string[] = ['id', 'type', 'alias', 'description', 'actions'];

  types: any[] = [];

  constructor(private service: AccountsService,
    private router: Router) { }
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

  openCreate() {
    this.router.navigateByUrl("create-type");
  }
  openCreateCash() {
    this.router.navigateByUrl("create-cash");
  }
  openMonthly() {
    this.service.getCash().subscribe((res) => {
    this.router.navigate(['/cash', -1], { state: { data: res } });
  },
  (error) => {
    console.error(error);
  }
);
}
        
  openType(type: number) {

    this.service.getCashByType(type).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/cash', type], { state: { data: res } });
    },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteType(id: number) {
    throw new Error('Method not implemented.');
  }
  editType(id: number) {
    throw new Error('Method not implemented.');
  }
}