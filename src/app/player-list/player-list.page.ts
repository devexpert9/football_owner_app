import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import {NotiService } from '../services/noti/noti.service';
import {config} from '../config';
import { Events, ActionSheetController, Platform } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
declare var window: any; 
import { ModalController } from '@ionic/angular';
import { InvitePlayerComponent } from "../invite-player/invite-player.component";
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.page.html',
  styleUrls: ['./player-list.page.scss'],
})
export class PlayerListPage implements OnInit {
  title="Players List";
  playerres:any;
  noplayerlist:boolean=false;
  playerlist:any=[];
  nolocation:boolean=false;
  url:any=config.API_URL+'server/data/p_pics/';
  errors:any=['',null,undefined,'null','undefined'];
  _id:any=localStorage.getItem('_id');
  constructor(
    public modalController: ModalController,
     public router: Router,
    public actionSheetController: ActionSheetController, 
    public events: Events, 	
    public apiservice:ApiService,
    public notifi:NotiService,
    public sanitizer:DomSanitizer,
    private geolocation: Geolocation  
    ) {  }

    ngOnInit() {
    }
   ionViewDidEnter(){
    this.getPlayers();

   }
  async presentModal() {
    const modal = await this.modalController.create({
      component: InvitePlayerComponent
    });
    return await modal.present();
  }

  getPlayers(){
    this.notifi.presentLoading();
    this.geolocation.getCurrentPosition().then((resp) => { 
      this.apiservice.post('getnearbyUsers',{lat:resp.coords.latitude,lng:resp.coords.longitude,miles:50, _id: this._id},'').subscribe((result) => {  
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


}
