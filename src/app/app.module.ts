import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './feature/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './feature/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
     HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ProductsComponent,
    SidenavComponent
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
