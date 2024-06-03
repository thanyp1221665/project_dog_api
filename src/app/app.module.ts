import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { BreedSelectorComponent } from './breed-selector/breed-selector.component';

import { DogService } from './dog.service';
import { HeadersInterceptor } from './headers.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    WelcomeComponent,
    NavbarComponent,
    BreedSelectorComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule
  ],
  providers: [DogService,
    {
      provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
