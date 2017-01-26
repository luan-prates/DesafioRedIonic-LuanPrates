import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RegistrarPage} from "../registrar/registrar";
import {LoginProvider} from "../../providers/login-provider";
import {Credencial} from "../../model/credencial";
import {HomePage} from "../home/home";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  credencial: Credencial;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loginProvider: LoginProvider) {
    this.credencial = new Credencial();
  }

  ionViewDidLoad() {

    this.loginProvider.loginSucessoEventEmitter.subscribe(
      user => this.navCtrl.setRoot(HomePage)
    )
    this.loginProvider.loginFalhaEventEmitter.subscribe(
      error => console.log(error)
    )
  }

  loginComCredencial(){
    this.loginProvider.loginComCredencial(this.credencial);
  }

  loginComFacebook(){
    this.loginProvider.loginComFacebook();
  }

  loginComGoogle(){
    this.loginProvider.loginComGoogle();
  }

  doRegister(){
    this.navCtrl.push(RegistrarPage);
  }
}
