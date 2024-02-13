import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { UsersService } from "../../shared/services/users.service";
import { User } from "../../shared/models/user.modal";
import { Observable } from "rxjs";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    form!: FormGroup;

    constructor (
        private readonly router: Router,
        private readonly usersService: UsersService
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailsValidator.bind(this)),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'name': new FormControl(null, [Validators.required]),
            'agree': new FormControl(null, [Validators.requiredTrue])
        });
    }

    onSubmit() {
        const { email, password, name } = this.form.value;
        const user = new User(email, password, name);

        this.usersService.addNewUser(user)
            .subscribe(() => {
                this.router.navigate(['/login'], {
                    queryParams: {
                        nowCanLogin: true,
                    }
                });
            });
    }

    forbiddenEmailsValidator(control: AbstractControl): Observable<any> {
        return new Observable((observer) => {
            this.usersService.getUserByEmail(control.value)
                .subscribe((users: User[]) => {
                    if (users && users.length > 0) {
                        observer.next({ forbiddenEmail: true });
                    } else {
                        observer.next(null);
                    }
                    observer.complete();
                });
        });
    }
}
