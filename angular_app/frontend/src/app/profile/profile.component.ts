import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { EmailValidator } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile:any={};
  
  constructor(private apiService:ApiService, private route:ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    let id_= this.route.snapshot.params['id'];
    (await this.apiService.getProfile(id_)).subscribe(data =>{
      this.profile= JSON.parse(JSON.stringify(data))
     });
  }

}
