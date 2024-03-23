import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from 'src/app/service/accounts.service';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../delete-confirmation/delete-confirmation.component';
import { PaginatorIntlService } from 'src/app/service/paginator-intl.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass:PaginatorIntlService}]
})
export class CashComponent {
  cash: any[] = [];
  type: number;
  memberId:number;
  months: { value: number, name: string }[] = [
    { value: 0, name: 'All Months' }, 
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];

  dataSource: any;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  years: number[] = [2023, 2024];
  selectedYear: number;
  selectedMonth: number;


  displayedColumns: string[] = ['id', 'amount', 'date', 'memberName', 'accountType','remarks', 'actions' ];

  constructor(
    private service: AccountsService,
    private route: ActivatedRoute,    
    public dialog: MatDialog,
    private router: Router) 
    {

     }

  ngOnInit(): void {
    this.getServerData();
    this.route.paramMap.subscribe(params => {
      this.type = +params.get('type');
      this.memberId = +params.get('id');
    });
  }

  fetchCashByType(year?: number, month?: number) {
    // this.dataSource = new MatTableDataSource(this.cash);
if(this.type===-1){
  this.service.getCash(year, month).subscribe((res) => {
    console.log(res);
    this.cash=res;
    this.dataSource = new MatTableDataSource(this.cash);
    this.dataSource.paginator = this.paginatior;
    this.dataSource.sort = this.sort;
    console.log('DS:' + this.dataSource);
  },
    (error) => {
      console.error(error);
    }
  );

} else if(this.type===-2){
  this.service.getCashByMember(this.memberId, year, month).subscribe((res) => {
    console.log(res);
    this.cash=res;
    this.dataSource = new MatTableDataSource(this.cash);
    this.dataSource.paginator = this.paginatior;
    this.dataSource.sort = this.sort;
    console.log('DS:' + this.dataSource);
  },
    (error) => {
      console.error(error);
    }
  );

} else {
  this.service.getCashByType(this.type, year, month).subscribe((res) => {
    console.log(res);
    this.cash=res;
    this.dataSource = new MatTableDataSource(this.cash);
    this.dataSource.paginator = this.paginatior;
    this.dataSource.sort = this.sort;
    console.log("DS:" + this.dataSource);
  },
    (error) => {
      console.error(error);
    }
  );
}

  }
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  public getServerData(){
    this.route.params.subscribe((params) => {
      const type = params['type'];
      // this.datasource = params['data']; 
      const data = history.state.data;
      this.cash = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  editCash(id: number) {
    const mode ='edit';
    this.router.navigate(['create-cash'], { queryParams: { id, mode } });
  }
  deleteCash(id:number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.service.deleteCash(id).subscribe(
        (response) => {
          console.log(`Cash with ID ${id} deleted`);
          this.cash = this.cash.filter((cash) => cash.id !== id);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  });
}

openCreateCash() {
  this.router.navigateByUrl("create-cash");
}


}
