import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from "./auth/auth.module";
import { AppRoutingModule } from "./app-routing.module";
import { UsersService } from "./shared/services/users.service";
import { AuthService } from "./shared/services/auth.service";
import { SystemModule } from "./system/system.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AuthModule,
        AppRoutingModule,
        HttpClientModule,
        SystemModule
    ],
    providers: [UsersService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
