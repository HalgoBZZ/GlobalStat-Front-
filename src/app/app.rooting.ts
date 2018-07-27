import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { DebitComponent } from './components/debit/debit.component';
import { NouveauteComponent } from './components/nouveaute/nouveaute.component';
import { MydataComponent } from './components/mydata/mydata.component';


const appRoutes :Routes=[
    { path: '', redirectTo: '/accueil', pathMatch: 'full'},
    { path: 'home', component:HomeComponent  },
    { path: 'admin', component: LoginComponent},
    { path: 'accueil', component:AccueilComponent},
    { path: 'debit', component:DebitComponent},
    { path: 'nouveaute', component:NouveauteComponent},
    { path: 'mydata', component:MydataComponent}
]
    export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);