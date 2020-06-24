import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ApiService } from '../services/api/api.service';
import { Router , ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NotiService } from '../services/noti/noti.service';
import {config} from '../config'
import { Events, ActionSheetController, Platform } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
declare var window: any; 
import { ModalController } from '@ionic/angular';
import { SelectFavComponent } from '../select-fav/select-fav.component';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { SelectTeamPage } from "../select-team/select-team.page";
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-request-match',
  templateUrl: './request-match.page.html',
  styleUrls: ['./request-match.page.scss'],
})
export class RequestMatchPage implements OnInit {
  public win: any = window; 
  title="Requested Match";
  addmatch:FormGroup;
  is_submit:any;InAppBrowser
  response:any;
  _id:any=localStorage.getItem('_id');
  imgpath:any;
  errors:any=['',null,undefined,'null','undefined',0];
  covererr:any=false;
  date:any;
  stime:any;
  etime:any;
  stripe_id:boolean=false;
  alldata:any;
  btn1:any='Team 1';
  btn2:any='Team 2';
  team1_player_ids:any=[];
  team2_player_ids:any=[];
  team1_team_id:any;
  team2_team_id:any;
  reqData:any;
  limit:any;
  team1_name:any='Team 1';
  team2_name:any='Team 2';
  team_1_type:any=0;
  team_2_type:any=0;
  request_id:any;
  player_ids: any;
  team_id: any;
  team_info : any;
  r_id:any;
  player_id:any;
  duration:any;
  duration_minutes:any;
  constructor(public modalController: ModalController,
    public formBuilder: FormBuilder,	
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
    private iab: InAppBrowser,
    public alertController: AlertController,
    public ActivatedRoute:ActivatedRoute 
    ) {

      this.ActivatedRoute.params.subscribe(params => {

        console.log(params);
      
              this.team_id = params['team_id']; 
              this.date = params['date']; 
              this.duration = params['duration']; 
              this.stime = params['stime'];    
              this.request_id = params['r_id'];
              this.player_id = params['player_id'];
              this.player_ids = JSON.parse(params['players_ids']);
              this.etime = params['etime'];
              this.makeform();
        });

       

         this.date= new Date().toISOString();
         this.makeform();

  }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.stripe_id = false;
    this.getTeamInfo();
    this.alldata= JSON.parse(localStorage.getItem('user'));    
     
      if(this.errors.indexOf(this.alldata.stripe_id)==-1){
        this.stripe_id = true;

      }
      
  }

  makeform(){
    this.addmatch= this.formBuilder.group({
       
         
         date:[this.date, Validators.compose([Validators.required])],
         stime:[this.stime, Validators.compose([Validators.required])],
       
         type:['5',Validators.compose([Validators.required])],
         gender:[null,Validators.compose([Validators.required])],
         duration:[this.duration,Validators.compose([Validators.required])],
       
    });
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: SelectFavComponent
    });

    modal.onDidDismiss().then((detail) => {
      console.log(detail)

       if(detail.data==1){
        console.log(detail);
       }
 
     });

    return await modal.present();
  }

  async selectImage() {
    this.imgpath='';
    const actionSheet = await this.actionSheetController.create({
    header: "Select Image source",
    mode:"ios",
    buttons: [{
          text: 'Load from Library',
          handler: () => {
         
              this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
      },
      {
          text: 'Use Camera',
          handler: () => {
            
              this.takePicture(this.camera.PictureSourceType.CAMERA);
             
          }
      },
      {
          text: 'Cancel',
          role: 'cancel'
      }
    ]
  });
  await actionSheet.present();
}

takePicture(sourceType: PictureSourceType) {
  this.covererr=false;
  var options: CameraOptions = {
      quality: 50,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
  };
  this.camera.getPicture(options).then(imagePath => {
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
            .then(filePath => {        
           
              this.imgpath=imagePath;

            });
    } else {
      // this.startUpload(imagePath);
    
      this.imgpath= imagePath;
     
    }
  });
} 


  addmatchnow(){
   
   this.is_submit=true;  

   if(this.addmatch.valid){
    this.uploadmatch();        
    }

  }

   uploadmatch(){



   if(this.duration=='5'){
        var startTime = this.etime;
        var sHour = startTime.split(':')[0]
        
        var sMin  = startTime.split(':')[1]
        
       this.duration_minutes = (sHour*60) + sMin
        

      }else{
        if(this.duration=='1'){
          this.duration_minutes = 30;
      }


    if(this.duration=='2'){
         this.duration_minutes = 60;
    }

    if(this.duration=='3'){
         this.duration_minutes = 90;
    }

    if(this.duration=='4'){
        this.duration_minutes = 120;
    }
      }





    // this.notifi.presentLoading(); 
    this.notifi.presentLoading();
    var reqData= {
      _id:  this._id,
      name: this.team_info.name+ ' VS '+ this.team2_name,
      date:  this.addmatch.value.date,
      stime: this.stime,
      etime: this.etime,
      players: Number(this.addmatch.value.type)*2,
      team1_name:  this.errors.indexOf(this.team_info.name)==-1 ? this.team_info.name : 'Team 1',
      team2_name:  this.errors.indexOf(this.team2_name)==-1 ? this.team2_name : 'Team 2',
      request_match: '1',
      fullday: '0',
      team1_player_ids: this.player_ids.length!=0 ? this.player_ids : [],
      team2_player_ids: this.team2_player_ids.length!=0 ? this.team2_player_ids : [],
      team1_team_id: this.team1_team_id,
      team2_team_id: this.team2_team_id,
      team_2_type: this.team_2_type,
      team_1_type: this.team_1_type,
      gender: this.addmatch.value.gender,
      r_id: this.request_id,
      player_id : this.player_id,
      duration: this.duration_minutes

    }
   
     this.apiservice.post('addmatch',reqData,'').subscribe((result) => {  
       this.notifi.stopLoading();              
       this.response=result;
   if(this.response.status == 1){
    this.is_submit=false;
    this.addmatch.reset();   
    this.imgpath=''; 
    this.presentAlert('Success', 'Your match has been posted');
    this.router.navigate(['tabs/tabs/home']);
 
              } else if(this.response.status == 3){
                this.notifi.presentToast(this.response.msg,'danger');  
              
               } else if(this.response.status == 4){
                this.notifi.presentToast(this.response.msg,'danger');  
              
               }
                else{
                this.notifi.presentToast(this.response.msg,'danger');  

              }
},
 err => {
       this.notifi.stopLoading();
       this.notifi.presentToast('Internal server error. Try again','danger');
 });
   
  }

  get_connected(){


    const options : InAppBrowserOptions = {
    zoom:'no',
    location:'yes',
    clearcache:'yes',
    clearsessioncache:'yes'

   };


   const browser = this.iab.create('https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_CeZCxUywXA8znoZmxPrD5LQXcyv6tlFO&scope=read_write&state='+this._id,'_blank', options);

   browser.on('exit').subscribe(() => {
    console.log('browser closed');
    this.notifi.presentLoading();
    this.apiservice.post('get_profile',{_id:this._id},'').subscribe((result) => { 
   var res;
   res= result;
   
   if(res.status==1){

    localStorage.setItem('user', JSON.stringify(res.data)); 
    console.log(res.data.stripe_id);
    if(this.errors.indexOf(res.data.stripe_id)==-1){
      console.log('comingg in this section');
     this.stripe_id=true;
     this.ref.detectChanges();

    }
   }


     });



}, err => {
    console.error(err);
});


  }


  async presentModal2(team, type) {

    this.reqData = {
      team : this.team2_name,
      player_ids: this.player_ids,
      team_id: this.team_id,
      selected_player_ids: this.team2_player_ids,
      selected_team_id: this.team2_team_id,
      type: 2,
      limit: this.addmatch.value.type
     }
  

    const modal = await this.modalController.create({
      component: SelectTeamPage,
      componentProps: this.reqData

    });



    modal.onDidDismiss().then((detail) => {
       console.log(detail)

       if(detail.data.team_type==1){
                  
                  this.team_1_type= detail.data.type;
                  this.btn1= detail.data.name;
                  this.team1_name= detail.data.name;
          
                  if(detail.data.type==1){

                    this.team1_player_ids=[];
                    this.team1_team_id= detail.data.team_id
                  
                  }  else{
            
                    this.team1_team_id= null;
                    this.team1_player_ids= detail.data.player_ids
                  
                  }


       }else if(detail.data.team_type==2){  
                  this.team_2_type= detail.data.type;
                  this.btn2= detail.data.name;
                  this.team2_name= detail.data.name;
                  if(detail.data.type==1){

                      this.team2_player_ids=[];
                      this.team2_team_id= detail.data.team_id
                    
                    }  else{
              
                      this.team2_team_id= null;
                      this.team2_player_ids= detail.data.player_ids
                    
                    }
              }

    
 
     });

    return await modal.present();
  }

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  getTeamInfo(){

      this.notifi.presentLoading();
      this.apiservice.post('getTemInfo',{_id : this.team_id},'').subscribe((result) => {  
      this.notifi.stopLoading();              
      var res;
      res = result;
      console.log(this.response)
      if(res.status==1){
        this.team_info = res.data;
     
      }else{
       this.notifi.presentToast('Internal server error','danger');
     }
 
 },
 err => {
      this.notifi.stopLoading();
      this.notifi.presentToast('Error while updating profile  ,Please try later','danger');
 });


  }

}
