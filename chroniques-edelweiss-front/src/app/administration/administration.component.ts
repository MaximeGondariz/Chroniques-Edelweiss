import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { JDR, User } from 'src/assets/interfaces/interfaces';
import { Subscription } from 'rxjs';
import { JdrService } from '../service/jdr.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit{
  Users: User[] = [];
  JDRs: JDR[] = [];

  connectedUser: User | undefined;

  chosenMenu = 1;

  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private jdrService: JdrService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.checkAuth().subscribe((value) => {
        this.connectedUser = value;
      })
    );

    this.subscriptions.push(
      this.authService.getUsers().subscribe((value) => {
        this.Users = value;
      })
    );

    this.subscriptions.push(
      this.jdrService.getJdrs().subscribe((value) => {
        this.JDRs = value;
      })
    );
  }

  changeMenu(menu: number){
    this.chosenMenu = menu
  }

  changeStatus(index: number){
    const select = <HTMLSelectElement>document.getElementById('status'+index);
    const user = this.Users[index];

    this.authService.changeStatus(user, select.value);
  }

  startAdd(index: number){
    const before = document.getElementById('beforeAdd'+index);
    const after = document.getElementById('afterAdd'+index);

    if(before && after){
      before.classList.add('no-display');
      after.classList.remove('no-display');
    }
  }

  stopAdd(index: number){
    const before = document.getElementById('beforeAdd'+index);
    const after = document.getElementById('afterAdd'+index);
    const input = <HTMLInputElement>document.getElementById('inputAdd'+index);
    const user = this.Users[index]

    if(before && after){
      after.classList.add('no-display');
      before.classList.remove('no-display');
    }

    this.authService.changeFlowers(user, Number(input.value))
  }

  startSubstract(index: number){
    const before = document.getElementById('beforeSubstract'+index);
    const after = document.getElementById('afterSubstract'+index);

    if(before && after){
      before.classList.add('no-display');
      after.classList.remove('no-display');
    }
  }

  stopSubstract(index: number){
    const before = document.getElementById('beforeSubstract'+index);
    const after = document.getElementById('afterSubstract'+index);
    const input = <HTMLInputElement>document.getElementById('inputSubstract'+index);
    const user = this.Users[index];

    if(before && after){
      after.classList.add('no-display');
      before.classList.remove('no-display');
    }

    this.authService.changeFlowers(user, -Number(input.value))
  }

  startDelete(index: number){
    const before = document.getElementById('beforeDelete'+index);
    const after = document.getElementById('afterDelete'+index);

    if(before && after){
      before.classList.add('no-display');
      after.classList.remove('no-display');
    }
  }

  stopDelete(index: number){
    const before = document.getElementById('beforeDelete'+index);
    const after = document.getElementById('afterDelete'+index);

    if(before && after){
      after.classList.add('no-display');
      before.classList.remove('no-display');
    }
  }

  deleteAccount(index: number){
    const before = document.getElementById('beforeDelete'+index);
    const after = document.getElementById('afterDelete'+index);
    const user = this.Users[index];

    if(before && after){
      after.classList.add('no-display');
      before.classList.remove('no-display');
    }

    this.authService.deleteAccount(user);
  }
}
