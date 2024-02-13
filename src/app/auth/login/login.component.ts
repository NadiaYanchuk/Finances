import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { UsersService } from "../../shared/services/users.service";
import { User } from "../../shared/models/user.modal";
import { Message } from "../../shared/models/message.modal";
import { AuthService } from "../../shared/services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

    form!: FormGroup;
    message!: Message;

    constructor (
        private readonly userService: UsersService,
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.queryParams
            .subscribe((params: Params) => {
                if (params['nowCanLogin']) {
                    this.showMessage("Now you can log in", 'success');
                }
            })

        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }

    private showMessage(text: string, type: string = 'danger') {
        this.message = new Message(type, text);
        window.setTimeout(() => {
            this.message.text = '';
        }, 5000);
    }

    onSubmit() {
        const formData = this.form.value;

        this.userService.getUserByEmail(formData.email)
            .subscribe((users: User[]) => {
                if (users.length > 0) {
                    const user = users[0];
                    if (user.password === formData.password) {
                        window.localStorage.setItem('user', JSON.stringify(user))
                        this.authService.login();
                        this.router.navigate(['/system', 'bill']);
                    } else {
                        this.showMessage("Invalid password!");
                    }
                } else {
                    this.showMessage("No user exists with the provided email!");
                }
            });
    }
}
