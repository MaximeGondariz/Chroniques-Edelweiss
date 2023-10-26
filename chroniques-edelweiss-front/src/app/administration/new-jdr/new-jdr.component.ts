import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { JdrService } from 'src/app/service/jdr.service';
import { JDR, User, newJDR } from 'src/assets/interfaces/interfaces';

@Component({
  selector: 'app-new-jdr',
  templateUrl: './new-jdr.component.html',
  styleUrls: ['./new-jdr.component.scss']
})
export class NewJdrComponent {
  connectedUser: User | undefined;

  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private jdrService: JdrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authService
      .checkAuth()
      .subscribe((user) => (this.connectedUser = user));
  }

  createJdr(form: NgForm) {
    if(form.value.name && form.value.description){
      const newJdr: newJDR = {
        name: form.value.name,
        description: form.value.description
      }
      this.jdrService.createJdr(newJdr);
    }
  }
}
