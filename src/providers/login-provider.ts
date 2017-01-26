import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Credencial} from "../model/credencial";
import firebase from "firebase";

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: Http) {
    console.log('Hello LoginProvider Provider');
  }

  redistrarUsuario(credencial:Credencial){
    firebase.auth().createUserWithEmailAndPassword(credencial.email, credencial.senha)
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }

}
