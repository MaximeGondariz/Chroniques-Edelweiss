import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  @Output() sideMenuEmitter = new EventEmitter<boolean>();

  closeSideMenu(){
    this.sideMenuEmitter.emit(false);
  }
}
