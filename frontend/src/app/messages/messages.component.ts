import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-messages',
  template: `
   <mat-card>
     <h4>Posts</h4>
   <div *ngFor= "let message of apiService.messages">
     <mat-card-content>
   {{message.mesg}}
</mat-card-content>
  </div>
</mat-card>
  `,
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public apiService:ApiService,private route:ActivatedRoute) { }

  ngOnInit(): void {
   
    const id= this.route.snapshot.params['id'];
    this.apiService.getMessages(id);
  }

}
