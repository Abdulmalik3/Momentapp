import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
@NgModule({
  declarations: [AppComponent, DateAgoPipe],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DateAgoPipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
