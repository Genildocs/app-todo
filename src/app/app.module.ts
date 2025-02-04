import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsModule } from './icons/icons/icons.module';
import { ComponentsModule } from './shared/components/components.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { provideHttpClient } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    ComponentsModule,
    AngularSvgIconModule.forRoot(),
    RouterLink,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
