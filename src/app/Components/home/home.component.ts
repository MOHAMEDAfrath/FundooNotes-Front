import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Name = '';
  Email = '';
  isGrid = true;
  isSearch = false;
  constructor() { }

  ngOnInit(): void {
    this.getFromLocalStorage()
  }
  getFromLocalStorage(){
      var user = JSON.parse(localStorage.getItem("FundooUser")!);
      this.Name = user.userName;
      this.Email = user.emailId;
  }
}
