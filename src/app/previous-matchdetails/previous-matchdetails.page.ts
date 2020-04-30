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
import { AddReviewComponent } from "../add-review/add-review.component";
@Component({
  selector: 'app-previous-matchdetails',
  templateUrl: './previous-matchdetails.page.html',
  styleUrls: ['./previous-matchdetails.page.scss'],
})
export class PreviousMatchdetailsPage implements OnInit {
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
results:any;
response1_came:any=false;
response2_came:any=false;
skeleton:any=[];
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
 
}


  ngOnInit() {
  }
 async presentModal() {
    const modal = await this.modalController.create({
      component: AddReviewComponent
    });
    return await modal.present();
  }

  ionViewDidEnter(){
   this.response2_came=false; 
  this.response1_came=false; 
  this.match_id= this.ActivatedRoute.snapshot.paramMap.get('_id');
  console.log(this.match_id);
  this.getjoinresult=[];  
  this.matchdetail();
  this.getJoinMatch();

}

matchdetail(){

  this.apiservice.post('p_matchdetails',{match_id:this.match_id},'').subscribe((result) => { 
  this.response2_came=true;  
  this.response=result;
  if(this.response.status == 1){     
  // this.notifi.presentToast(this.response.msg,'success'); 
  this.matchlist=this.response;
  this.title= this.matchlist.match.team1+' VS '+this.matchlist.match.team2;
  this.results= this.matchlist.results;

  console.log(this.results);
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
