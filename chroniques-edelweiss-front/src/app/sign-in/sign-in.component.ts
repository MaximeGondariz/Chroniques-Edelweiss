import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  emailRegExp = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");

  passwordRegExp = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%\\^&*)(+=._-]).{8,}");

  passwordLengthRegExp = new RegExp(".{8,}")
  passwordNumberRegExp = new RegExp("(?=.*[0-9])");
  passwordLowerRegExp = new RegExp("(?=.*[a-z])");
  passwordUpperRegExp = new RegExp("(?=.*[A-Z])");
  passwordSpecialRegExp = new RegExp("(?=.*[!@#$%\\^&*)(+=._-])");

  password = '';

  emailExist = false;

  constructor(private authService: AuthService, private router: Router){}

  signIn(form: NgForm){
    let validation = true;
    if(!form.value.pseudo){
      const input = document.getElementById('pseudo');
      if(input) input.classList.add('error-input');
      validation = false;
    }else{
      const input = document.getElementById('pseudo');
      if(input) input.classList.remove('error-input');
    }

    if(!form.value.email.toLowerCase() || !this.emailRegExp.test(form.value.email.toLowerCase())){
      const input = document.getElementById('email');
      if(input) input.classList.add('error-input');
      validation = false;
    }else{
      const input = document.getElementById('email');
      if(input) input.classList.remove('error-input');
    }

    if(form.value.email.toLowerCase() !== form.value.confirmEmail.toLowerCase()){
      const input = document.getElementById('confirmEmail');
      if(input) input.classList.add('error-input');
      validation = false;
    }else{
      const input = document.getElementById('confirmEmail');
      if(input) input.classList.remove('error-input');
    }

    if(!form.value.password || !this.passwordRegExp.test(form.value.password)){
      const input = document.getElementById('password');
      if(input) input.classList.add('error-input');
      validation = false;
    }else{
      const input = document.getElementById('password');
      if(input) input.classList.remove('error-input');
    }

    if(form.value.password !== form.value.confirmPassword){
      const input = document.getElementById('confirmPassword');
      if(input) input.classList.add('error-input');
      validation = false;
    }else{
      const input = document.getElementById('confirmPassword');
      if(input) input.classList.remove('error-input');
    }

    if(validation){
      this.authService.checkSignIn(form.value.pseudo, form.value.email.toLowerCase(), form.value.password)
      .subscribe(value => {
        if(value === false){
          this.authService.signIn(form.value.pseudo, form.value.email.toLowerCase(), form.value.password);
          this.authService.login(form.value.email.toLowerCase(), form.value.password).subscribe();
          this.router.navigate(['/'])
        }else{
          this.emailExist = true;
        }
      });
    }
  }
}