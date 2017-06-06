import { Component, OnInit } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  datas:FirebaseListObservable<any>;
  constructor(
    meta: Meta,
    title: Title,
    private FireData: AngularFireDatabase
  ) {
    title.setTitle('Angular SEO - Home');

    meta.addTags([
      { name: 'author',   content: 'ardyhim'},
      { name: 'keywords', content: 'angular seo, angular firebase'},
      { name: 'description', content: 'Ini contoh angular seo dan firebase' }
    ]);
    this.datas = this.FireData.list('/post');
  }

  ngOnInit() {
  }

}
