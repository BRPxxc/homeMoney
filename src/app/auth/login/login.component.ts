import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "../../shared/services/users.service";
import { User } from "../../shared/models/users.model";
import { Message } from "../../shared/models/message.model";
import { AuthService } from "../../shared/services/auth.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { fadeStateTrigger } from "../../shared/animation/fade.animation";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;


  constructor(private usersService: UsersService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private title: Title) {
    title.setTitle('login')
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage({text: 'now you can logIn', type: 'success'})
        } else if (params['accessDenied']) {
          this.showMessage({text: 'you must log in', type: 'warning'})
        }
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(4)])
    })
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000)
  }

  onSubmit() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill'])
          } else {
            this.showMessage({text: 'password wrong', type: 'danger'})
          }
        } else {
          this.showMessage({text: 'no user', type: 'danger'})
        }
      })
  }

}
