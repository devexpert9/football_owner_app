import { ModalController } from '@ionic/angular';
import { FeespayComponent  } from "../feespay/feespay.component";
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import {NotiService } from '../services/noti/noti.service';
import {config} from '../config'
import { Events, ActionSheetController, Platform } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import { SelectFavComponent } from "../select-fav/select-fav.component";
declare var window: any; 

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.page.html',
  styleUrls: ['./match-details.page.scss'],
})
export class MatchDetailsPage implements OnInit {
   
    title="";
    public win: any = window; 
    response:any;
    errors:any=['',null,undefined,'null','undefined'];
    slideOpts:any;
    fileUrl: any = null;
    respData: any; 
    userId:any; 
    username:any;
    imagedata:any; 
    url:any=config.API_URL+'server/data/pic/';  
    purl:any=config.API_URL+'server/data/p_pics/';  
    _id:any=localStorage.getItem('_id');
    matches:any;
    imgpath:any;
    matchlist:any;
    upcominglist:any;
    upcomingres:any;
    searchlist:any;
    searchres:any;
    searching:any=false;
    keyword:any;
    noresults:any=false;
    favres:any;
    favlist:any=[];
    match_id:any;
    getjoinres:any;
    getjoinresult:any=[];
    noOfPlayers:any=0;
    indexArray:any=[];
    alldata:any=JSON.parse(localStorage.getItem('user'));
    onlyplayers:any=[];
    response1_came:any=false;
    response2_came:any=false;
    skeleton:any=[];
    team_1:any;
    team_2:any;
    team_1_players:any;
    team_2_players:any;
    team_3_players:any;

  constructor(
          public modalController: ModalController,  
          public router: Router,
          public actionSheetController: ActionSheetController, 
          public events: Events,   
          public apiservice:ApiService,
          public notifi:NotiService,
          public sanitizer:DomSanitizer,
          public ActivatedRoute:ActivatedRoute
              ) { this.skeleton=[1,2,3,4,5,6,7,8,9,1,2,2,3,4,5,6,7,65,4,2,3,4,5,6,7,8]}

  ngOnInit() {
  }

    ionViewDidEnter(){
    this._id = localStorage.getItem('_id');
    this.response2_came=false; 
    this.response1_came=false; 
    this.match_id= this.ActivatedRoute.snapshot.paramMap.get('_id');
    this.getjoinresult=[];
    this.matchdetail();
    this.getJoinMatch();

  }

  
  async presentModal2() {
    const modal = await this.modalController.create({
      component: FeespayComponent
    });
    return await modal.present();
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
	async presentModal() {
		const modal = await this.modalController.create({
		  component: SelectFavComponent,
      componentProps: {
        '_id': this.match_id
      }	
  });
  

		return await modal.present();
	  }

      matchdetail(){

          this.apiservice.post('p_matchdetails',{match_id:this.match_id},'').subscribe((result) => {  
          this.response1_came=true; 
          this.response=result;
          if(this.response.status == 1){     
          // this.notifi.presentToast(this.response.msg,'success'); 
          this.matchlist=this.response;
          this.team_1 = this.matchlist.match.team1
          this.team_2 = this.matchlist.match.team2
          this.title= this.matchlist.match.team1+' VS '+this.matchlist.match.team2
          console.log(this.matchlist);
          }
   
          },
          err => {
          this.response1_came=true; 
          this.notifi.stopLoading();
          this.notifi.presentToast('Internal error occured','danger');
          });

        }

          getJoinMatch(){ 
   
        this.apiservice.post('newGetJoinmatch',{match_id:this.match_id,_id:this._id},'').subscribe((result) => {
         this.response2_came=true;  
        this.notifi.stopLoading();  
        this.getjoinres=result;
        console.log(this.getjoinres);
      
        if(this.getjoinres.status == 1){   

        this.team_1_players = this.getjoinres.players1
        this.team_2_players = this.getjoinres.players2
        this.team_3_players = this.getjoinres.players3
        this.getjoinresult = this.getjoinres.players
        this.noOfPlayers = this.getjoinres.players.length
          
        }else{
          this.getjoinresult=[];
         
        }

        },
        err => {
         this.response2_came=true; 
        this.notifi.stopLoading();
        this.notifi.presentToast('Internal error occured','danger');
        });

            }
}
