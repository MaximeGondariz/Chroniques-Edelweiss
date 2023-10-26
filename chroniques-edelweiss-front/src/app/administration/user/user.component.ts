import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/assets/interfaces/interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  chosenUser: User | undefined;
  connectedUser: User | undefined;

  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.authService.getUsers().subscribe((users) => {
        this.chosenUser = users[params['userIndex']];
        console.log(this.chosenUser);
      });
    });

    this.authService
      .checkAuth()
      .subscribe((user) => (this.connectedUser = user));
  }

  changeUser(form: NgForm) {
    if (this.chosenUser) {
      this.chosenUser.flowers = form.value.flowers;
      this.chosenUser.status = form.value.status;
      this.authService.changeUser(this.chosenUser);
    }
  }

  deleteUser() {
    if (this.chosenUser) {
      this.authService.deleteAccount(this.chosenUser);
    }
  }
}
