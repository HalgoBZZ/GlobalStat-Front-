import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';
import { FormsModule }   from '@angular/forms';




import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { CourbesComponent } from './components/courbes/courbes.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { routing } from './app.rooting';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AdministrationService } from './services/administration.service';
import { QuestionsService } from './services/questions.service';
import { UsersService } from './services/users.service';
import { DebitComponent } from './components/debit/debit.component';
import { NouveauteComponent } from './components/nouveaute/nouveaute.component';
import { MydataComponent } from './components/mydata/mydata.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResponsesService } from './services/responses.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    BodyComponent,
    CourbesComponent,
    QuestionsComponent,
    AccueilComponent,
    DebitComponent,
    NouveauteComponent,
    MydataComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    routing,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    AdministrationService,
    QuestionsService,
    UsersService,
    ResponsesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
