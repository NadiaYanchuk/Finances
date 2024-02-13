import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { User } from "../../../../shared/models/user.modal";
import { AuthService } from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    date: Date = new Date();
    user!: User;

    constructor (
        private readonly router: Router,
        private readonly authService: AuthService
    ) { }

    ngOnInit() {
        const storedUser = window.localStorage.getItem('user');
        if (storedUser) {
            this.user = JSON.parse(storedUser);
        }
    }

    public onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
