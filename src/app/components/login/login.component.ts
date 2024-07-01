import { Component, OnDestroy, OnInit } from '@angular/core';
import OktaAuth from '@okta/okta-auth-js';
import {OktaSignIn} from '@okta/okta-signin-widget'
import { error } from 'jquery';
import oktaConfigs from 'src/app/Config/okta-configs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  oktaSignin: any;
  oktaAuth: OktaAuth;

  constructor() {
    this.oktaAuth = oktaConfigs.oidc.oktaAuth

    this.oktaSignin = new OktaSignIn({
      features: {
        registration: true
      },
      baseUrl: oktaConfigs.oidc.issuer.split('/oath2')[0],
      clientId: oktaConfigs.oidc.clientId,
      redirectUri: oktaConfigs.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: oktaConfigs.oidc.issuer,
        scopes: oktaConfigs.oidc.scopes
      }
    });
    // this.oktaAuth = new OktaAuth({
    //   issuer: oktaConfigs.oidc.authParams.issuer,
    //   clientId: oktaConfigs.oidc.clientId,
    //   redirectUri: oktaConfigs.oidc.redirectUri
    // });

    // this.logIn = new OktaSignIn({
    //   baseUrl: oktaConfigs.oidc.baseUrl,
    //   clientId: oktaConfigs.oidc.clientId,
    //   redirectUri: oktaConfigs.oidc.redirectUri,
    //   authParams: oktaConfigs.oidc.authParams
    // })
  }
  ngOnDestroy(): void {
   this.oktaSignin.remove();
  }


  ngOnInit(): void {
    this.oktaSignin.renderEl({ el: '#okta-signin-container' },
      (res: any) => {
        if (res.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error:any)=>{
        throw error;
      });
  }


  // async login(){
  //   await this.oktaAuth.signInWithRedirect();
  // }

  // async logout(){
  //   await this.oktaAuth.signOut();
  // }

}
