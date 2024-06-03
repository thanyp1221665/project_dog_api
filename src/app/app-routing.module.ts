import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BreedSelectorComponent } from './breed-selector/breed-selector.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'welcome',component:WelcomeComponent, canActivate: [AuthGuard]},
  {path:'register',component:RegisterComponent},
  {path: 'breed-selector', component: BreedSelectorComponent, canActivate: [AuthGuard] },
  {path:'',redirectTo:'login',pathMatch:'full'},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
