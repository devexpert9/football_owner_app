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
import { AlertController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
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
  myname : any;
  mypic:any;
  constructor(
        public modalController: ModalController,
        public router: Router,
        public actionSheetController: ActionSheetController, 
        public events: Events, 	
        public apiservice:ApiService,
        public notifi:NotiService,
        public sanitizer:DomSanitizer,
        public alertController: AlertController,
        private socket: Socket,
  
    ) {  }

    ngOnInit() {
    }
   ionViewDidEnter(){
    this.playerlist = [];
    this._id = localStorage.getItem('_id');
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
    this.apiservice.post('getnearbyUsers',{_id: this._id},'').subscribe((result) => {  
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
 

   }

   msg_popup(name, toId){
      this. presentAlertPrompt(name, toId);
  }



  send_message(message, toId){
  
    this.apiservice.post('add_chat', {fromId: this._id, toId: toId, message : message},'').subscribe((res) => { 
      var result;
      result = res;
      if(result.status == 1){
        this.notifi.presentToast('Message sent','danger');
        this.socket.connect();
        this.socket.emit('send_message', {_id : result.data, fromId : this._id, message : message, toId : toId, createdAt : new Date() , user_name :  this.myname, user_image :  this.mypic});
    
      }
    },
    err => {
      console.log(err)
    });

    }

async presentAlertPrompt(name, toId) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Quick Message To '+name,
      mode:'ios',
      inputs: [
        {
          name: 'msg',
          type: 'text',
          placeholder: 'Type message...'
        }
      
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Send',
          handler: (value) => {
          
            
                  if(this.errors.indexOf(value.msg)==-1){
                  this.send_message(value.msg, toId );
                 
            }else{
              this.notifi.presentToast('Message was empty, not sent','danger');

            }

          }
        }
      ]
    });

    await alert.present();
  }



}
