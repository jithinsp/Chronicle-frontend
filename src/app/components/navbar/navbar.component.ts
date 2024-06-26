import { Component, DoCheck } from '@angular/core';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck {
  title = 'jwt-front';

  jwtTok:string | null;
  isLogged: boolean=false;
  isAdmin: boolean=false;
  role: string='';

  constructor(private jwtService: JwtService){}

  ngDoCheck(): void {
    this.jwtTok= localStorage.getItem('jwt');
    if(this.jwtTok!=null){
      this.isLogged=true;
      this.role=this.jwtService.extractRole();
      if(this.role === '[ROLE_ACCOUNTANT]'){
        this.isAdmin=true;
      } else{
        this.isAdmin=false;
      }
    } else{
      this.isLogged = false;
      this.isAdmin=false;
    }
  }
}
