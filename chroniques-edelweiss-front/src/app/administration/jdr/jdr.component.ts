import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { JdrService } from 'src/app/service/jdr.service';
import { JDR, User } from 'src/assets/interfaces/interfaces';

@Component({
  selector: 'app-jdr',
  templateUrl: './jdr.component.html',
  styleUrls: ['./jdr.component.scss']
})
export class JdrComponent implements OnInit{
  chosenJdr: JDR | undefined;
  connectedUser: User | undefined;

  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private jdrService: JdrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.jdrService.getJdrs().subscribe((jdrs) => {
        this.chosenJdr = jdrs[params['userIndex']];
      });
    });

    this.authService
      .checkAuth()
      .subscribe((user) => (this.connectedUser = user));
  }

  changeJdr(form: NgForm) {
    if(this.chosenJdr){
      this.chosenJdr.name = form.value.name;
      this.chosenJdr.description = form.value.description;
      console.log(this.chosenJdr);
      this.jdrService.changeJdr(this.chosenJdr);
    }
  }

  deleteJdr() {
    if (this.chosenJdr) {
      this.jdrService.deleteJdr(this.chosenJdr);
    }
  }
}
