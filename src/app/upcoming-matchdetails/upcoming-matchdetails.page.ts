import { CancelmatchComponent } from '../cancelmatch/cancelmatch.component';
import { ModalController } from '@ionic/angular';
import { FeespayComponent  } from "../feespay/feespay.component";
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
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
  selector: 'app-upcoming-matchdetails',
  templateUrl: './upcoming-matchdetails.page.html',
  styleUrls: ['./upcoming-matchdetails.page.scss'],
})
export class UpcomingMatchdetailsPage implements OnInit {
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
  matchcandeled:boolean=false;
  response1_came:any=false;
  response2_came:any=false;
  skeleton:any=[];
  name:any;
    constructor(
      public modalController: ModalController,
      private filePath: FilePath,
      private transfer: FileTransfer,
      private file: File,
      private camera: Camera,
      private ref: ChangeDetectorRef,    
      public TransferObject:FileTransferObject,
      public router: Router,
      public actionSheetController: ActionSheetController, 
      public events: Events,   
      private platform: Platform,
      public apiservice:ApiService,
      public notifi:NotiService,
      public sanitizer:DomSanitizer,
      public ActivatedRoute:ActivatedRoute

    ) {      
     this.skeleton=[1,2,3,4,5,6,7,8,9,1,2,2,3,4,5,6,7,65,4,2,3,4,5,6,7,8]
     this.name= this.alldata.fname[0].toUpperCase()+this.alldata.fname.slice(1)+' '+this.alldata.lname[0].toUpperCase()+this.alldata.lname.slice(1);
  }
  ionViewDidEnter(){
    this.response2_came=false; 
    this.response1_came=false; 
    this.match_id= this.ActivatedRoute.snapshot.paramMap.get('_id');
    this.getjoinresult=[];   
    this.matchdetail();
    this.getJoinMatch();

}

  ngOnInit() {
  }
   async presentModal2() {
    const modal = await this.modalController.create({
      component: CancelmatchComponent,
      componentProps: {
        '_id': this.match_id
      }	
    });
    modal.onDidDismiss().then((detail) => {
     
      if(detail.data==1){
     this.matchcandeled=true;
      } 

    });
    return await modal.present();
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
  this.response2_came=true; 
  this.response=result;
  if(this.response.status == 1){     
  // this.notifi.presentToast(this.response.msg,'success'); 
  this.matchlist=this.response;
  this.title= this.matchlist.match.team1+' VS '+this.matchlist.match.team2
  console.log(this.matchlist);
  }

  },
  err => {
  this.response2_came=true; 
  this.notifi.stopLoading();
  this.notifi.presentToast('Internal error occured','danger');
  });

}

  getJoinMatch(){ 

this.apiservice.post('getJoinmatch',{match_id:this.match_id,_id:this._id},'').subscribe((result) => { 
this.response1_came=true; 
this.notifi.stopLoading();  
this.getjoinres=result;
console.log(this.getjoinres);

if(this.getjoinres.status == 1){   
   this.onlyplayers= this.getjoinres.playersList;
  for(let key of  this.getjoinres.playersList){
    this.getjoinresult.push(key._id);

  }         

  this.noOfPlayers= this.getjoinresult.length;
 
}else{
  this.getjoinresult=[];
 
}

},
err => {
 this.response1_came=true; 
this.notifi.stopLoading();
this.notifi.presentToast('Internal error occured','danger');
});

    }




}
