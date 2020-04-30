import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NotiService } from '../services/noti/noti.service';
import {config} from '../config'
import { Events, ActionSheetController, Platform } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-update-results',
  templateUrl: './update-results.page.html',
  styleUrls: ['./update-results.page.scss'],
})
export class UpdateResultsPage implements OnInit {
  title="Add Match Results";
  updatedata: FormGroup; 
  match_id_:any;
  response:any;
  is_submit:boolean=false;
  match_id:any;
  resultsMatch:any;
  response_came:boolean=false;
  errors:any=['',null,undefined,'null','undefined'];
  skeleton:any;
  constructor(	   
    public formBuilder: FormBuilder,	
    public router: Router,
    public actionSheetController: ActionSheetController, 
    public apiservice:ApiService,
    public notifi:NotiService,
    public sanitizer:DomSanitizer,
    public ActivatedRoute:ActivatedRoute  
       ) {
        this.makeform();
         this.skeleton=[1,2,3,4,5,6,7,8,9,1,2,2,3,4,5,6,7,65,4,2,3,4,5,6,7,8]
        }

  ngOnInit() {
  }
  ionViewDidEnter(){
     this.response_came=false;  
   this.match_id=  this.ActivatedRoute.snapshot.paramMap.get('id');
  
   this.getResults();

  }

  makeform(){
    this.updatedata= this.formBuilder.group({
         name: ['',Validators.compose([Validators.required])],
         location: ['',Validators.compose([Validators.required])],
         team1_score: ['',Validators.compose([Validators.required])],
         team2_score: ['',Validators.compose([Validators.required])],
         positions_team1: ['',Validators.compose([Validators.required])],
         positions_team2: ['',Validators.compose([Validators.required])],
         shots_ontarget_team1: ['',Validators.compose([Validators.required])],
         shots_ontarget_team2: ['',Validators.compose([Validators.required])],
         touches_team1: ['',Validators.compose([Validators.required])],
         touches_team2: ['',Validators.compose([Validators.required])],
         shots_team1: ['',Validators.compose([Validators.required])],
         shots_team2: ['',Validators.compose([Validators.required])],
      });
  }


  updateData(){
    this.is_submit=true;
    console.log(this.updatedata.value);
    const data={
      match_id: this.match_id,
      name: this.updatedata.value.name,
      location: this.updatedata.value.location,
      team1_score: this.updatedata.value.team1_score,
      team2_score: this.updatedata.value.team2_score,
      positions_team1: this.updatedata.value.positions_team1,
      positions_team2: this.updatedata.value.positions_team2,
      shots_ontarget_team1: this.updatedata.value.shots_ontarget_team1,
      shots_ontarget_team2: this.updatedata.value.shots_ontarget_team2,
      touches_team1: this.updatedata.value.touches_team1,
      touches_team2: this.updatedata.value.touches_team2,
      shots_team1: this.updatedata.value.shots_team1,
      shots_team2: this.updatedata.value.shots_team2
    }
    if(this.updatedata.valid){
      this.notifi.presentLoading();
      this.apiservice.post('addMatchResults', data,'').subscribe((result) => { 
       this.notifi.stopLoading();               
        this.response=result;
    if( this.response.status == 1){

      this.notifi.presentToast('Result has been updated','success');

    }
    else{
      
    }
  },
  err => {
        this.notifi.stopLoading();
        this.notifi.presentToast('Error while updating profile  ,Please try later','danger');
  });
    }
    

  }

  getResults(){
  
    this.apiservice.post('getResults', {_id:this.match_id},'').subscribe((result) => { 
    this.response_came=true;  
    this.notifi.stopLoading();   
    console.log(result);
    var res;
    res= result;
  if(res.status == 1){
      this.updatedata.patchValue({
        name: res.data.name,
        location: res.data.location,
        team1_score: res.data.team1_score,
        team2_score: res.data.team2_score,
        positions_team1: res.data.positions_team1,
        positions_team2: res.data.positions_team2,
        shots_ontarget_team1: res.data.shots_ontarget_team1,
        shots_ontarget_team2: res.data.shots_ontarget_team2,
        touches_team1: res.data.touches_team1,
        touches_team2: res.data.touches_team2,
        shots_team1: res.data.shots_team1,
        shots_team2: res.data.shots_team2,
      });   
   this.resultsMatch=true;


  }
  else{
    
  }
},
err => {
      this.response_came=true;
      this.notifi.stopLoading();
      this.notifi.presentToast('Error while updating profile  ,Please try later','danger');
});
  }


}
