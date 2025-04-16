import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { SigninComponent } from './components/signin/signin.component';
import { AboutComponent } from './components/about/about.component';
import { DonationComponent } from './components/donation/donation.component';
import { SignupComponent } from './components/signup/signup.component';
import { RequestAssistanceComponent } from './components/request-assistance/request-assistance.component';
import { DetailsComponent } from './components/details/details.component';
import { CardsComponent } from './components/cards/cards.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { RecommendedDonationsComponent } from './components/recommended-donations/recommended-donations.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { authGuard } from './guards/auth.guard';
import { EditDonationRequestsComponent } from './components/edit-donation-requests/edit-donation-requests.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AllCardsComponent } from './components/all-cards/all-cards.component';

export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"home", component:HomeComponent},
    {path:"about", component:AboutComponent},
    {path:"profile",component:ProfileComponent,canActivate:[authGuard],
      children:[
        {path:"",pathMatch:"full", redirectTo:"settings"},
        {path:"settings",component:ProfileSettingsComponent},
        {path:"recommended",component:RecommendedDonationsComponent},
        {path:"password",component:ChangePasswordComponent},
        {path:"EditDonationRequests",component:EditDonationRequestsComponent}
      ]
    },
    {path:"signin",component:SigninComponent},
    {path:"signup",component:SignupComponent},
    {path:"RequestAssistance",component:RequestAssistanceComponent,canActivate:[authGuard]},
    {path:"details/:id",component:DetailsComponent},
    {path:"allcards",component:AllCardsComponent,canActivate:[authGuard]},
    {path:"**",component:NotFoundComponent}
];
