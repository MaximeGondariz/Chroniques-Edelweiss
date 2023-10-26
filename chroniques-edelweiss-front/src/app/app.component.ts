import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { User } from 'src/assets/interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'chroniques-edelweiss';
  loginStatus = false;
  isSideMenu = false;
  connectedUser: User | undefined;

  subscriptions: Subscription[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.checkAuth().subscribe((value) => {
        this.connectedUser = value;
        console.log(this.connectedUser);
      })
    );
  }

  changeLoginStatus() {
    this.loginStatus = !this.loginStatus;
  }

  changeSideMenuStatus() {
    this.isSideMenu = !this.isSideMenu;
  }

  logOut(){
    this.authService.logout();
    this.receiveCheckAuth();
  }

  receiveLoginStatus(status: boolean) {
    this.loginStatus = status;
  }

  receiveCheckAuth() {
    window.location.reload();
  }

  @HostListener('window:resize', ['$event'])
  checkScreenWidth(){
    if(window.innerWidth > 650){
      this.isSideMenu = false;
    }
  }
}
