import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import {NotiService } from '../services/noti/noti.service';
import {config} from '../config';
import { Events, ActionSheetController, Platform } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
declare var window: any; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title="Home";
  
    slideOptsOne = {
    initialSlide: 1,
    speed: 400,
    autoplay:true,
    loop: true

  };
  
  public win: any = window; 
  response:any;
  profileData: any;
  IsLoggedIn: any = localStorage.getItem('isLoggedIn');
  IsPasswordUpadte: any = false;
  profileImage: any = null;
  imageURI: any;
  errors:any=['',null,undefined,'null','undefined',' '];
  slideOpts:any;
  fileUrl: any = null;
  respData: any; 
  userId:any; 
  username:any;
  imagedata:any;
  allpics:boolean=false;
  lastpic:any;
  camerapic:boolean=false;
  totalimages:any;
  morethan9:boolean=false;
  yes:boolean=false;
  realemail='asdc';

  firstname:any;
  lastname:any;
  email:any;
  contact:any;
  image:any;
  propic:any;
  profile:any;
  url:any=config.API_URL+'server/data/match/';
  is_submit:any=false;
  filevar:any;
  _id:any;
  matches:any;
  rate:any;
  onRateChange:any;
  presentModal:any;
  imgpath:any;
  imgblob:any;
  alldata:any=JSON.parse(localStorage.getItem('user'));
  second_form:any=false;  
  img_selected:any=false; 
  matchlist:any;
  upcominglist:any;
  upcomingres:any;
  searchlist:any;
  searchres:any;
  searching:any=false;
  keyword:any;
  noresults:any=false;

  noToday:any=false;
  noUpcoming:any=false;
    skeleton:any=[];
  response1_came:any=false;
  response2_came:any=false;
  constructor(	   
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
    public sanitizer:DomSanitizer  
       )  {  
      this.skeleton=[1,2,3,4,5,6,7,8,9,1,2,2,3,4,5,6,7,65,4,2,3,4,5,6,7,8]
    }
          
       ionViewDidEnter(){
            this.response2_came=false; 
            this.response1_came=false;          
            this.upcominglist=[];
            this.matchlist=[];
            this.todayMatches(); 
            this.upcomingMatches(); 
          }

  ngOnInit() {
  }
   todayMatches(){
      this.apiservice.post('todayMatches','','').subscribe((result) => {  
      this.response1_came=true;  
      this.notifi.stopLoading();              
      this.response=result;
  if(this.response.status == 1){     
      // this.notifi.presentToast(this.response.msg,'success'); 
      this.matchlist=this.response.data;
      // console.log(this.matchlist);
     
  }
  else{
     
    this.noToday=true;
  }
},
err => {
      this.response1_came=true;  
      this.notifi.stopLoading();
      this.notifi.presentToast('Internal server error','danger');
});

   }


   upcomingMatches(){
    this.apiservice.post('upcomingMatches','','').subscribe((result) => {  
       this.response2_came=true;  
      this.notifi.stopLoading();              
      this.upcomingres=result;
  if(this.upcomingres.status == 1){     
      // this.notifi.presentToast(this.response.msg,'success'); 
      // console.log(this.upcomingres.data);
      this.upcominglist=this.upcomingres.data;
   
     
  }
  else{
    this.noUpcoming=true;
      
  }
},
err => {
      this.response2_came=true;  
      this.notifi.stopLoading();
      this.notifi.presentToast('Internal server error','danger');
});

   }

   searchmatch(ev){
     if(this.errors.indexOf(ev.target.value)==-1){
      this.keyword=ev.target.value;
      this.searching=true;
      this.apiservice.post('searchhome',{keyword:ev.target.value},'').subscribe((result) => {  
        this.notifi.stopLoading();              
        this.searchres=result;
    if(this.searchres.status == 1){     
     
      this.upcominglist= this.searchres.data;
      if(this.upcominglist.length==0){
        this.noresults= true;
      }else{
        this.noresults= false;
      }
      
    }
    else{
      this.noresults= true;
      this.upcominglist= []; 
      
    }
  },
  err => {
        this.notifi.stopLoading();
        this.notifi.presentToast('Internal server error','danger');
  });

     }else{
      this.noresults= false;
      this.searching=false;
      this.upcomingMatches();

     }
                
         
   }


}
