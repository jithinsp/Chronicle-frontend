import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { JwtService } from 'src/app/service/jwt.service';
import { loadUser } from 'src/app/state/user.actions';
import { getuserlist } from 'src/app/state/user.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Define a property to hold user data
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  @ViewChild(MatSort)sort!:MatSort;

  constructor(private jwtService: JwtService, private store: Store) {}

  // ngOnInit() {
  //   this.jwtService.getAllUsers().subscribe(
  //     (data: any) => {
  //       this.users = data; // Assuming your API returns an array of users
  //       console.log(data);
  //     },
  //     error => {
  //       console.error('Error fetching user data:', error);
  //     }
  //   );
  // }
  ngOnInit() {
    this.store.dispatch(loadUser());
    this.store.select(getuserlist).subscribe(item=>{
      this.users = item;
      console.log(this.users);
      // this.users.paginator=this.paginator;
    });
  }
}
