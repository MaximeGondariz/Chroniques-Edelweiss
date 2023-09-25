import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chroniques-edelweiss';
  loginStatus = false;

  constructor() {}

  changeLoginStatus(){
    this.loginStatus = !this.loginStatus;
  }

  receiveEmitStatus(status: boolean){
    this.loginStatus = status;
  }
}
