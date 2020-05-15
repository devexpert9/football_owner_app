import { Component, ChangeDetectorRef, OnInit,} from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import {NotiService } from '../services/noti/noti.service';
import {config} from '../config';
import { Events, ActionSheetController, Platform } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import {ModalController, NavParams} from '@ionic/angular'
import { InvitePlayerComponent } from "../invite-player/invite-player.component";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
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
  limit:any;
  selected_player_ids:any;
  selected_team_id:any;
  skeleton:any;
  matches:any;
  response_came:any=false;
  team_static_name:any;
  constructor(
    public modalController: ModalController,
     public router: Router,
    public actionSheetController: ActionSheetController, 
    public events: Events, 	
    public apiservice:ApiService,
    public notifi:NotiService,
    public sanitizer:DomSanitizer,
    private geolocation: Geolocation,
    public navParams:NavParams,
    public alertController: AlertController,
    public cd:ChangeDetectorRef
    
    ) { 
      this.skeleton=[1,2,3,4,5,6,7,8,9,1,2,2,3,4,5,6,7,65,4,2,3,4,5,6,7,8];
      this.ids = [];
      this.team_name= this.navParams.get('team');
      this.team_type= this.navParams.get('type');
      this.team_id = this.navParams.get('team_id');
      this.player_ids = this.navParams.get('player_ids'); 
      this.team = this.navParams.get('player_ids'); 
      this.limit = Number(this.navParams.get('limit')); 
      this.team_name=  this.navParams.get('team'); 
      if(this.team_type==1){
       this.team_static_name = 'Team 1'
      }else{
        this.team_static_name = 'Team 2'
      }
      
      console.log(this.selected_team_id);
      this.cd.markForCheck();
      setTimeout(()=>{
        this.selected_player_ids = this.errors.indexOf(this.navParams.get('selected_player_ids')) ==-1 ? this.navParams.get('selected_player_ids') : [];
    
        this.selected_team_id = this.errors.indexOf(this.navParams.get('selected_team_id')) ==-1 ? this.navParams.get('selected_team_id') : null;

          if(this.errors.indexOf(this.navParams.get('selected_player_ids')) ==-1){

              this.ids= this.navParams.get('selected_player_ids');
      }
    
       },1000)
    
    }

    ngOnInit() {
    }

   ionViewDidEnter(){
    this.response_came=false;
    this.ids = [];
    this.selected_team_id = [];
    this.selected_player_ids= [];
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
    var req = this.errors.indexOf(this.player_ids)== -1 ? JSON.stringify(this.player_ids) : [];
    this.apiservice.post('getPlayersForAddMatch',{ids: req},'').subscribe((result) => {  
      this.response_came=true;
      this.nolocation=false;      
      this.notifi.stopLoading();              
      this.playerres=result;
            if(this.playerres.status == 1){     
              
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
 

   }
   
   /////get teams/////

   getTeams(){
    
    var req = this.errors.indexOf(this.team_id)== -1 ? this.team_id : '';
    this.apiservice.post('getTeamsForAddMatch', {id: req} ,'').subscribe((result) => {  
    var res;
    res =result;    
      this.notifi.stopLoading();              
   
            if(res.status == 1){     
                 this.teamslist = res.data;   
                 console.log(this.teamslist.length);
            }
            else{
              this.teamslist=[];
            }
},
err => {
      this.notifi.stopLoading();
      this.notifi.presentToast('Internal server error. Try again','danger');
});
 

   }

   FieldsChange(values:any,id){
     
    console.log(values.target.checked)

    if(values.target.checked){                       
      if(this.ids.length<this.limit){

        this.ids.push(id);

      }
       
    }else{

    
      var index= this.ids.indexOf(id);
      this.ids.splice(index, 1);
     

    }         
    }

    closeModal(){
      var data:any ={
        type:3,
       }

   this.modalController.dismiss(data);

    }

    async presentAlert(header, message) {
      const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: ['OK']
      });
  
      await alert.present();
    }
  
    myfunc(q){
        console.log(q);
      }

}

