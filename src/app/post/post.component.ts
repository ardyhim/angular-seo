import { Component, OnInit } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  data:FirebaseObjectObservable<any>
  comment:any = [];
  params:string;
  users:any;
  constructor(
    meta: Meta,
    title: Title,
    private FireData: AngularFireDatabase,
    private FireAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
    this.FireAuth.authState.subscribe(u => this.users = u);
    meta.addTags([
      { name: 'author',   content: 'ardyhim'},
      { name: 'keywords', content: 'angular seo, angular firebase'},
      { name: 'description', content: 'Ini contoh angular seo dan firebase' }
    ]);
    this.route.params.subscribe(p => {
      this.params = p.id;
      this.getCommentUsers(p.id, c => {
        this.comment = c.val();
      });
      this.data = this.FireData.object('/post/'+p.id);
      this.data.subscribe(d => {
        title.setTitle('Angular SEO - '+d.name);
      })
    })
  }

  getCommentUsers(k, cb){
    let commentRef = this.FireData.database.ref().child(`post/${k}/comment`);
    commentRef.on('child_added', snap => {
      let userRef = this.FireData.database.ref().child('users').child(snap.val().users);
      userRef.on('value', c => {
        let data = {
          description: snap.val().description,
          users: c.val(),
          createdAt: snap.val().createdAt
        }
        this.comment.push(data);
      });
    })
  }

  postComment(f){
    let data = {
      description: f.value.description,
      post: this.params,
      users: this.users.uid,
      createdAt: Date.now()
    };
    this.FireData.list(`/post/${this.params}/comment`).push(data)
    .then(res => f.description = "")
    .catch(err => console.log(err));
  }

  ngOnInit() {
  }

}
