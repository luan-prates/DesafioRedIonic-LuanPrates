import {Injectable, EventEmitter, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Credencial} from "../model/credencial";
import firebase from "firebase";

@Injectable()
export class LoginProvider {

  currentUesr:any;
  autenticado:boolean;

  loginSucessoEventEmitter:EventEmitter<any>;
  loginFalhaEventEmitter:EventEmitter<any>;
  logoutEventEmitter:EventEmitter<any>;

  constructor(public http: Http, public ngZone: NgZone) {
    this.loginSucessoEventEmitter = new EventEmitter();
    this.loginFalhaEventEmitter = new EventEmitter();
    this.logoutEventEmitter = new EventEmitter();

    firebase.auth().onAuthStateChanged(usuario => {
      this.callbackStateChange(usuario);
    })
  }

  private callbackStateChange(usuario){
    this.ngZone.run( () => {
      if(usuario == null){
        this.currentUesr = null;
        this.autenticado = false;
      }else{
        this.currentUesr = usuario;
        this.autenticado = true;
      }
    })
  }


  loginComCredencial(credencial:Credencial){
    firebase.auth().signInWithEmailAndPassword(credencial.email, credencial.senha)
      .then(resultado => this.callbackSucessoLogin(resultado))
      .catch(error => this.callbackFalhaLogin(error))
  }

  loginComGoogle(){
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(resultado => this.callbackSucessoLogin(resultado))
      .catch(error => this.callbackFalhaLogin(error))
  }

  loginComFacebook(){
    let provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)
      .then(resultado => this.callbackSucessoLogin(resultado))
      .catch(error => this.callbackFalhaLogin(error))
  }

  redistrarUsuario(credencial:Credencial){
    firebase.auth().createUserWithEmailAndPassword(credencial.email, credencial.senha)
      .then(resultado => console.log(resultado))
      .catch(error => console.log(error));
  }

  sair(){
    firebase.auth().signOut()
      .then(() => this.logoutEventEmitter.emit(true))
      .catch(error => this.callbackFalhaLogin(error))
  }

  private callbackSucessoLogin(response){
    this.loginSucessoEventEmitter.emit(response.user);
  }

  private callbackFalhaLogin(error){
    this.loginFalhaEventEmitter.emit({
      code: error.code,
      message: error.message,
      email: error.email,
      credencial: error.credencial
    });
  }
}
