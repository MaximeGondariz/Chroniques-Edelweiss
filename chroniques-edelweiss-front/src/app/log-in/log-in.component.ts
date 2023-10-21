import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  @Input() loginStatus: boolean | undefined;
  @Input() isSideMenu: boolean | undefined;

  @Output() loginEmitter = new EventEmitter<boolean>();
  @Output() checkEmitter = new EventEmitter();

  isWrong = false;

  constructor(private authService: AuthService){}

  logIn(form: NgForm){
    this.authService.login(form.value.email, form.value.password).subscribe(value => {
      if(!value){
        this.isWrong = true;
      }else{
        this.isWrong = false;
        this.checkEmitter.emit();
      }
    })
  }

  quitLoginElement(){
    this.loginStatus = !this.loginStatus;
    this.loginEmitter.emit(this.loginStatus);
  }
}
