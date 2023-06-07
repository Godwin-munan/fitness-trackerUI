import { NgModule } from '@angular/core';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { LoginComponent } from './authentication/login/login.component';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './authentication/service/auth.service';

const COMPONENTS: any[] = [ 
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent
]

const SERVICES: any[] = [ 
  AuthService
]

@NgModule({
  declarations: [ ...COMPONENTS, ],
  imports: [
    SharedModule,
  ],
  providers: [ ...SERVICES, ],
  exports: [ ...COMPONENTS, ]
})
export class CoreModule { }
