import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TextfieldComponent } from './shared/textfield/textfield.component';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { OfferComponent } from './pages/offer/offer.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SearchComponent } from './pages/search/search.component';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		NavbarComponent,
		TextfieldComponent,
		RegisterComponent,
		OfferComponent,
		SearchComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		LeafletModule,
		LeafletDrawModule,
		ToastrModule.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
