import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ChatComponent } from './chat/chat.component';
import { ChanneladminComponent } from './channeladmin/channeladmin.component';
import { GroupadminComponent } from './groupadmin/groupadmin.component';

const routes: Routes = [{path: '', component: LoginComponent}, {path: 'admin', component: AdminComponent}, {path: 'channeladmin', component: ChanneladminComponent}, {path: 'groupadmin', component: GroupadminComponent}, {path: 'chat', component: ChatComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
