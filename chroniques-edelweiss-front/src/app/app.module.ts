import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { JdrPaginationComponent } from './jdr-pagination/jdr-pagination.component';
import { TeamComponent } from './team/team.component';
import { RecordComponent } from './record/record.component';
import { CookiePopUpComponent } from './cookie-pop-up/cookie-pop-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { LegalTermsComponent } from './legal-terms/legal-terms.component';
import { ArchivesComponent } from './archives/archives.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'jdr',
    component: JdrPaginationComponent
  },
  {
    path: 'records',
    component: RecordComponent
  },
  {
    path: 'archives',
    component: ArchivesComponent
  },
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'legalterms',
    component: LegalTermsComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    JdrPaginationComponent,
    TeamComponent,
    RecordComponent,
    CookiePopUpComponent,
    SignInComponent,
    LogInComponent,
    LegalTermsComponent,
    ArchivesComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
