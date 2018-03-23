import { Component } from '@angular/core';
import { ApiService } from './async-services/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private apiService: ApiService) {}

  login() {
    this.apiService
      .makeRequest('http://localhost:3003/login')
      .subscribe((res) => {
        console.log('got data from API', res);
      });
  }

  logout() {
    this.apiService
      .makeRequest('http://localhost:3003/logout')
      .subscribe((res) => {
        console.log('got data from API', res);
      });
  }

  getPosts() {

    const gonfig = {
      chapter: 'mapList',
      object: 'assetsList',
      action: 'getAssetsList'
    };

    this.apiService
      .doRequest(gonfig);
  }

  getTree() {
    this.apiService
      .makeRequest('http://localhost:3003/books')
      .subscribe((res) => {
        console.log('got data from API', res);
      });
  }
}
