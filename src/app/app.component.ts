import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular SEO';
  users:any = null;
  constructor(
    private FireData: AngularFireDatabase,
    private FireAuth: AngularFireAuth
  ){
    this.FireAuth.authState.subscribe(u => {
      if(u){
        this.FireData.object('/users/'+u.uid).set(u.providerData[0]);
        this.users = u;
      }
    })
  }

  login(){
    this.FireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.FireAuth.auth.signOut().then(r => this.users = null);
  }

}
