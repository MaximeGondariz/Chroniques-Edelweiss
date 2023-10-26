import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { JDR, User } from 'src/assets/interfaces/interfaces';
import { Subscription } from 'rxjs';
import { JdrService } from '../service/jdr.service';
import { Router } from '@angular/router';

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
    private jdrService: JdrService,
    private router: Router
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

  goToUser(index: number){
    this.router.navigate(['modifyUser'], {
      queryParams: {
        userIndex: index,
      },
    });
  }

  goToJdr(index: number){
    this.router.navigate(['modifyJdr'], {
      queryParams: {
        userIndex: index,
      },
    });
  }

  goToCreateJdr(){
    this.router.navigate(['createJdr'])
  }

  changeMenu(menu: number){
    this.chosenMenu = menu
  }
}
