import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  @Input() loginStatus: boolean | undefined

  @Output() loginEmitter = new EventEmitter<boolean>();

  constructor(){}

  quitLoginElement(){
    this.loginStatus = !this.loginStatus;
    this.loginEmitter.emit(this.loginStatus);
  }
}
