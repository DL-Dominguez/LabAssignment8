import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../localStorageService';
import {Router } from '@angular/router';
import {ToastService} from '../toast/toast.service';

export interface IUser {
  id?:number;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user:IUser = {username: '', password: '' };
  localStorageService: LocalStorageService<IUser>;
  currentUser: IUser = null;
  constructor(private router: Router, private toastService: ToastService) {
    this.localStorageService = new LocalStorageService('user');
  }

  ngOnInit() {
    this.currentUser = this.localStorageService.getItemsFromLocalStorage();
    console.log('this.currentUser.....', this.currentUser);
    if(this.currentUser != null) {
        this.router.navigate(['contacts']);
    }
  }

  login(user: IUser) {
    console.log('from login user: ', user);
    const defaultUser: IUser = {username: 'ldominguez', password: 'luis123'};
  if(user.username !== '' && user.password !== '') {
    if(user.username === defaultUser.username && user.password === defaultUser.password) {
      // log the user in
      // store user in localStorage
      this.localStorageService.saveItemsToLocalStorage(user);
      // navigate to contacts page
      this.router.navigate(['contacts', user]);
    }else {
          // show error toast user
    console.log('from else.........');
    this.toastService.showToast('danger', 15000, 'Login faild! Please check your username or password!');

    }
  } else{
    // show error toast user
    console.log('from else.........');
    this.toastService.showToast('danger', 15000, 'Login faild! Please specify user and password!');

  }
  
  }

}
