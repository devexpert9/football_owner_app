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
import { SelectFavComponent } from "../select-fav/select-fav.component";
declare var window: any;
@Component({
  selector: 'app-cancelmatch',
  templateUrl: './cancelmatch.component.html',
  styleUrls: ['./cancelmatch.component.scss'],
})
export class CancelmatchComponent implements OnInit {
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
    this.match_id=navParams.get('_id');
  }

  ngOnInit() {}
async myDismiss(result=null) {
    
    
    await this.modalController.dismiss(result);
  }

  cancel(){
   
    this.apiservice.post('cancelMatch',{match_id:this.match_id},'').subscribe((result) => {  
    this.response=result;
    if(this.response.status == 1){     
    this.notifi.presentToast(this.response.msg,'success'); 
    this.myDismiss(1);
    }else{
      this.myDismiss(0);

    }
  
    },
    err => {
    this.notifi.stopLoading();
    this.notifi.presentToast('Internal error occured','danger');
    });
  
  }
}
