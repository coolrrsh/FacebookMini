import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  
  
  constructor(private apiService: ApiService) { }
  postMsg:String='';
  
  
  post(){
    this.apiService.postMessages({mesg: this.postMsg});
  }

}
