import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/service/accounts.service';
import { DeleteConfirmationComponent } from '../../delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatorIntlService } from 'src/app/service/paginator-intl.service';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass:PaginatorIntlService}]
})
export class AccountTypeComponent {


  displayedColumns: string[] = ['id', 'type', 'alias', 'description', 'actions'];

  types: any[] = [];
  dataSource: any;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: AccountsService,
    private router: Router,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.fetchTypes();
  }

  fetchTypes() {
    this.service.getTypes().subscribe(
      (response) => {
        this.types = response;
        console.log(this.types);
        this.dataSource = new MatTableDataSource(this.types);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  openCreate() {
    this.router.navigateByUrl("create-type");
  }
  openCreateCash() {
    this.router.navigateByUrl("create-cash");
  }


  deleteType(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deleteType(id).subscribe(
          (response) => {
            console.log(`Type with ID ${id} deleted`);
            this.types = this.types.filter((type) => type.id !== id);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  editType(id: any) {
    const mode = 'edit';
    this.router.navigate(['create-type'], { queryParams: { id, mode } });
  }
}
