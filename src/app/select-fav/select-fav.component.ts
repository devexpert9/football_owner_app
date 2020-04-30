import {ModalController, NavParams} from '@ionic/angular'
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
@Component({
  selector: 'app-select-fav',
  templateUrl: './select-fav.component.html',
  styleUrls: ['./select-fav.component.scss'],
})


export class SelectFavComponent implements OnInit {
  public win: any = window; 
  response:any;
  errors:any=['',null,undefined,'null','undefined',' '];
  slideOpts:any;
  fileUrl: any = null;
  respData: any; 
  userId:any; 
  username:any;
  imagedata:any; 
  url:any=config.API_URL+'server/data/pic/';  
  purl:any=config.API_URL+'server/data/p_pics/';  
  ownerr_id:any=localStorage.getItem('_id');
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
  ids:any=[]; 
  response_came:boolean=false;
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
        public ActivatedRoute:ActivatedRoute,
        public navParams: NavParams
            ) {
              this.skeleton=[1,2,3,4,5,6,7,8,9,1,2,2,3,4,5,6,7,65,4,2,3,4,5,6,7,8]
              this.match_id=navParams.get('_id');
}

ionViewDidEnter(){
//   this.match_id= this.ActivatedRoute.snapshot.paramMap.get('_id');
this.response_came=false;
this.getJoinMatch();

}

  ngOnInit() {}
  async myDismiss() {
    this.sendInvitation();
    const result: Date = new Date();
    
    await this.modalController.dismiss(result);
  }

  getJoinMatch(){ 
   
    this.apiservice.post('getaAllPlayers',{_id:this.match_id},'').subscribe((result) => { 
    this.response_came=true;
    this.notifi.stopLoading();  
    this.getjoinres=result;
    console.log(this.getjoinres);
  
    if(this.getjoinres.status == 1){   
       this.onlyplayers= this.getjoinres.data;
     
    }else{
      this.getjoinresult=[];
    }

    },
    err => {
      this.response_came=true;
    this.notifi.stopLoading();

    });
        }

search(ev){ 
          var keyword =  ev.target.value;  
          this.keyword=  ev.target.value;  
          console.log(keyword)
          if(this.errors.indexOf(ev.target.value)==-1){
          this.apiservice.post('searchplayerforInvitation',{_id:this.match_id,keyword:keyword},'').subscribe((result) => { 
          this.notifi.stopLoading();  
          this.getjoinres=result;
          console.log(this.getjoinres);
        
          if(this.getjoinres.status == 1){   
            this.noresults= false;
             this.onlyplayers= this.getjoinres.data;
           
          }else{
            this.onlyplayers=[];
            this.noresults= true;
          }
      
          },
          err => {
          this.notifi.stopLoading();
      
          });
              }else{
                this.noresults= false;
                this.searching=false;
                this.getJoinMatch();
              
              }
            
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

sendInvitation(){ 

        if(this.ids.length>0){
          this.apiservice.post('sendInvite',{_id:this.match_id,player_ids:this.ids,owner_id:this.ownerr_id},'').subscribe((result) => { 
            this.notifi.stopLoading();  
                 var res;
                 res=result;
                 
          
            if(res.status == 1){     
              this.notifi.presentToast(res.msg,'success');
            }else{        
            }
        
            },
            err => {
            this.notifi.stopLoading();
            this.notifi.presentToast('Internal error occured','danger');
            });

        }  
     
            }

  

}
