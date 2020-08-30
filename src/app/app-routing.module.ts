import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { UserSelectorComponent } from './routes/user-selector/user-selector.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { RepoComponent } from './routes/repo/repo.component';


const routes: Routes = [{
  path: '', component: DefaultComponent,
  children: [{
    path: '',
    component: UserSelectorComponent
  }, {
    path: 'profile/:username',
    component: ProfileComponent
  }, {
    path: 'repo',
    component: RepoComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
