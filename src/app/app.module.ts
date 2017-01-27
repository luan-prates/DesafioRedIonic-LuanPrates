import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrarPage } from '../pages/registrar/registrar';
import {LoginProvider} from "../providers/login-provider";
import firebase from "firebase";
import {SwingStackComponent, SwingCardComponent} from "angular2-swing";

const firebaseConfig = {
  apiKey: "AIzaSyBp6ffPiYFFLbUwNqUQx_sQEHlX2f9Kv0w",
  authDomain: "desafioredionic.firebaseapp.com",
  databaseURL: "https://desafioredionic.firebaseio.com",
  storageBucket: "desafioredionic.appspot.com",
  messagingSenderId: "96984805756"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrarPage,
    SwingStackComponent,
    SwingCardComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrarPage,
    SwingStackComponent,
    SwingCardComponent
  ],
  providers: [LoginProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
  constructor(){
    firebase.initializeApp(firebaseConfig);
  }
}
