import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {configProperties} from '../config.properties';
const helper = new JwtHelperService();
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  public listPostSubject : Subject<any> = new Subject();

  constructor(private _http: HttpClient) { }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._http.post(configProperties.local_server_path + 'users/register', user, {headers: headers});
  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._http.post(configProperties.local_server_path + 'users/authenticate', user, {headers: headers});
  }

  getProfile(){
    this.loadToken();
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.authToken});
    return this._http.get(configProperties.local_server_path + 'users/profile', {headers: headers});
  }

  savePost(postData){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._http.post(configProperties.local_server_path + 'posts/create', postData, {headers: headers});
  }

  getPosts(){
    this.loadToken();
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.authToken});
    return this._http.get(configProperties.local_server_path + 'posts/list', {headers: headers});
  }

  storeUserData(token, user){
      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.authToken = token;
      this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    const isExpired = helper.isTokenExpired(localStorage.getItem('id_token'));
    return !isExpired;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
