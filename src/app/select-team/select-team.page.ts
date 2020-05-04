import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import {NotiService } from '../services/noti/noti.service';
import {config} from '../config';
import { Events, ActionSheetController, Platform } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import {ModalController, NavParams} from '@ionic/angular'
import { InvitePlayerComponent } from "../invite-player/invite-player.component";
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var window: any; 
@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.page.html',
  styleUrls: ['./select-team.page.scss'],
})
export class SelectTeamPage implements OnInit {
  title="Players List";
  playerres:any;
  noplayerlist:boolean=false;
  playerlist:any=[];
  teamslist:any=[];
  nolocation:boolean=false;
  url:any=config.API_URL+'server/data/p_pics/';
  team_url:any=config.API_URL+'server/data/team/';
  errors:any=['',null,undefined,'null','undefined'];
  _id:any=localStorage.getItem('_id');
  response:any;
  ids:any;
  team:any;
  team_name:any;
  team_type:any;
  team_id:any;
  player_ids:any;
  constructor(
    public modalController: ModalController,
     public router: Router,
    public actionSheetController: ActionSheetController, 
    public events: Events, 	
    public apiservice:ApiService,
    public notifi:NotiService,
    public sanitizer:DomSanitizer,
    private geolocation: Geolocation,
    public navParams:NavParams
    
    ) {  
      this.team_name= this.navParams.get('team');
      this.team_type= this.navParams.get('type');
      this.team_id = this.navParams.get('team_id');
      this.player_ids = this.navParams.get('player_ids'); 
    
    }

    ngOnInit() {
    }

   ionViewDidEnter(){
     this.ids=[];
    this.notifi.presentLoading();
    this.getPlayers();
    this.getTeams();
   }


   async myDismiss(type, id, name) {  
     
    console.log('coming');

    if(type==1){
      console.log('1');
      var data:any ={
            type:1,
            team_id: id,
            name:name,
            team_type: this.team_type

      }

      await this.modalController.dismiss(data);


    }else{
      console.log('2');
      var data:any = {
        type:2,
        player_ids: this.ids,
        name:name,
        team_type: this.team_type
      
            }

      await this.modalController.dismiss(data);


    }
   
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: InvitePlayerComponent
    });
    return await modal.present();
  }

  getPlayers(){
    this.geolocation.getCurrentPosition().then((resp) => { 
      var req = this.errors.indexOf(this.player_ids)== -1 ? JSON.stringify(this.player_ids) : '';
      this.apiservice.post('getPlayersForAddMatch',{ids: req},'').subscribe((result) => {  
        this.nolocation=false;      
        this.notifi.stopLoading();              
        this.playerres=result;
              if(this.playerres.status == 1){     
                  console.log(this.playerres);
                  this.noplayerlist=false;
                
                  this.playerlist=this.playerres.data;   
              }
              else{
                this.noplayerlist=true;
                this.playerlist=[];
                  
              }
  },
  err => {
        this.notifi.stopLoading();
        this.notifi.presentToast('Internal server error. Try again','danger');
  });

     }).catch((error) => {
      this.notifi.stopLoading();
      this.nolocation=true;
      console.log(error)
     });
 

   }
   
   /////get teams/////

   getTeams(){
    this.geolocation.getCurrentPosition().then((resp) => { 
      var req = this.errors.indexOf(this.team_id)== -1 ? this.team_id : '';
      this.apiservice.post('getTeamsForAddMatch', {id: req} ,'').subscribe((result) => {  
      var res;
      res =result;    
        this.notifi.stopLoading();              
     
              if(res.status == 1){     
                   this.teamslist = res.data;   
              }
              else{
               
                this.teamslist=[];
                  
              }
  },
  err => {
        this.notifi.stopLoading();
        this.notifi.presentToast('Internal server error. Try again','danger');
  });

     }).catch((error) => {
      this.notifi.stopLoading();
     });
 

   }

   FieldsChange(values:any,id){
    if(values.currentTarget.checked){                       
        var index= this.ids.indexOf(id);
        this.ids.splice(index, 1);
        console.log(this.ids);
    }else{
      this.ids.push(id);
      console.log(this.ids);

    }         
    }

}

