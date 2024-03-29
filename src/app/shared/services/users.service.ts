import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { User } from "../models/user.modal";
import {BaseApi} from "../core/base-api";

@Injectable()
export class UsersService extends BaseApi{
    constructor (
        public override http: HttpClient
    ) {
        super(http);
    }

    getUserByEmail(email: string): Observable<User[]> {
        return this.get(`users?email=${email}`)
    }

    addNewUser(user: User): Observable<User> {
        return this.post('users', user);
    }

}
