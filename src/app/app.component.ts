import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
        apiKey: 'AIzaSyAik2NadwOOxHz4BRTqFAt6XQabu6xP5qE',
        authDomain: 'ng4-backend.firebaseapp.com',
        databaseURL: 'https://ng4-backend.firebaseio.com',
        projectId: 'ng4-backend',
        storageBucket: 'ng4-backend.appspot.com',
        messagingSenderId: '985943002913'
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
