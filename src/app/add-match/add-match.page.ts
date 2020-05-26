import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NotiService } from '../services/noti/noti.service';
import {config} from '../config'
import { Events, ActionSheetController, Platform } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
declare var window: any; 
import { ModalController } from '@ionic/angular';
import { SelectFavComponent } from '../select-fav/select-fav.component';
import {  } from '@ionic-native/in-app-browser/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { SelectTeamPage } from "../select-team/select-team.page";
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.page.html',
  styleUrls: ['./add-match.page.scss'],
})
export class AddMatchPage implements OnInit {
  public win: any = window; 
  title="Add Match";
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
  min_time:any;
  is_today:any;
  total_hours:any;
  end_hours:any;
  mins_array:any;
  end_mins:any;
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
    public alertController: AlertController 
    ) {
      this.date= new Date().toISOString();
      this.makeform();
      this.is_today=true;
  }

  ngOnInit() {
  }
  ionViewDidEnter(){
   this.btn1 = 'Team 1';
   this.btn2 = 'Team 2';
   this.team1_player_ids = [];
   this.team2_player_ids = [];
   this.team1_team_id ='';
   this.team2_team_id ='';
   this.reqData = {}
   this.limit = ''
   this.team_1_type =0;
   this.team_2_type =0;
   this.min_time = '';
   this.is_today = false;
   this.total_hours = 0;
   this.end_hours =0;
   this.mins_array=0;
   this.end_mins=0;
    
    
    this.stripe_id = false;
    this.alldata= JSON.parse(localStorage.getItem('user'));    
     
      if(this.errors.indexOf(this.alldata.stripe_id)==-1){
        this.stripe_id = true;

      }
      
  }

  makeform(){
    this.addmatch= this.formBuilder.group({
         name:['',Validators.compose([Validators.required])],
         location:['',Validators.compose([Validators.required])],
         date:['',Validators.compose([Validators.required])],
         stime:['',Validators.compose([Validators.required])],
         etime:['',Validators.compose([Validators.required])],
         type:['5',Validators.compose([Validators.required])],
         gender:[null,Validators.compose([Validators.required])]
       
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


checkdate(){
  this.addmatch.controls['stime'].setValue(null)
 var d = new Date();
 var date:any = d.getDate();
 var month:any = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
 var year = d.getFullYear();
 if (date < 10) {
   date = '0' + date;
 }
 if (month < 10) {
   month = '0' + month;
 }

 var hours:any = d.getHours();
 var mins:any = d.getMinutes();

 if (hours < 10) {
   hours = '0' + hours;
 }
 if (mins < 10) {
   mins = '0' + mins;
 }

 var stime = hours + ':' + mins;
 var dateStr = year + "-" + month + "-" + date;

if(this.addmatch.value.date.split('T')[0]==dateStr){
  this.is_today=true;
  var hours_n = new Date().getHours();
  var i= hours_n;
  var cars = 24
  var hours_array =[];
  for (i = hours; i <= cars; i++) {
    console.log(i)
    hours_array.push(hours_n++)
    
  }
  this.total_hours = hours_array

  ///

  var mins_n = new Date().getMinutes();
  console.log(mins_n);
  var p = mins_n;
  var carss = 59
  var mins_array =[];
  for (p = mins; p <= carss; p++) {
  
    mins_array.push(mins++)
    
  }
  this.mins_array = mins_array



}else{
  this.is_today=false;
}
   
}

// checktime(){


//     this.addmatch.controls['etime'].setValue(null)

//     var hours_n =  new Date(this.addmatch.value.stime);
//     let ehour:any = hours_n.getHours();
//     let emins:any = hours_n.getMinutes();
//     var i= ehour;
//     var cars = 24
//     var hours_array =[];
//    for (i = ehour; i <= cars; i++) {
//      console.log(i)
//      hours_array.push(ehour++)
     
//    }
//    this.end_hours = hours_array

//    var p = emins;
//    var carss = 59
//    var mins_array =[];
//   for (p = ehour; p <= carss; p++) {
//     console.log(p)
//     mins_array.push(emins++)
    
//   }
//   this.end_mins = mins_array

//    ///

//  }

  addmatchnow(){
    
    var sdate = new Date(this.addmatch.value.stime);
    var edate = new Date(this.addmatch.value.etime);
    let shour:any = sdate.getHours();
    let smin:any = sdate.getMinutes();
    let ehour:any = edate.getHours();
    let emin:any = edate.getMinutes();

    if(shour.toString().length<2){
      shour = '0'+shour;
    }

    if(smin.toString().length<2){
       smin= '0'+smin;
    }

    if(ehour.toString().length<2){
      ehour= '0'+ehour;
    }

    if(emin.toString().length<2){
      emin= '0'+emin;
    }

    this.stime= shour+ ':'+smin;
    this.etime= ehour+':'+emin;

 
   this.is_submit=true;  

   if(this.addmatch.valid){
    this.uploadmatch();        
    }

  }

  

   uploadmatch(){ 

    this.notifi.presentLoading(); 

    var reqData= {
      _id:  this._id,
      name: this.addmatch.value.name,
      location: this.addmatch.value.location,
      date:  this.addmatch.value.date.split('T')[0],
      stime: this.stime,
      etime: this.etime,
      players: Number(this.addmatch.value.type)*2,
      team1_name:  this.errors.indexOf(this.team1_name)==-1 ? this.team1_name : 'Team 1',
      team2_name:  this.errors.indexOf(this.team2_name)==-1 ? this.team2_name : 'Team 2',
      request_match: '0',
      fullday: '0',
      team1_player_ids: this.team1_player_ids.length!=0 ? this.team1_player_ids : [],
      team2_player_ids: this.team2_player_ids.length!=0 ? this.team2_player_ids : [],
      team1_team_id: this.team1_team_id,
      team2_team_id: this.team2_team_id,
      team_2_type: this.team_2_type,
      team_1_type: this.team_1_type,
      gender: this.addmatch.value.gender,

    }

     this.apiservice.post('addmatch',reqData,'').subscribe((result) => {  
    this.notifi.stopLoading();              
    this.response=result;
   if(this.response.status == 1){
    this.is_submit=false;
    this.addmatch.reset();   
    this.imgpath=''; 
    this.presentAlert('Success', 'Your match has been posted');
    this.router.navigate(['/tabs/tabs/home']);
 
              } else if(this.response.status == 3){
                this.notifi.presentToast(this.response.msg,'danger');  
              
               }
               else if(this.response.status == 6){
                this.notifi.presentToast('You can not add match for past time','danger');  
              
               }
               else if(this.response.status == 7){
                this.notifi.presentToast('End time should be greater than start time','danger');  
              
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


   const browser = this.iab.create('https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_GvUnCEVjs5lvC5Y0c5YsBMeXHRwl1wqg&scope=read_write&state='+this._id,'_blank', options);

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
    if(type==1){
      this.reqData = {
        team:team,
        player_ids: this.team2_player_ids,
        team_id: this.team2_team_id,
        selected_player_ids: this.team1_player_ids,
        selected_team_id: this.team1_team_id,
        type: 1,
        limit: this.addmatch.value.type,


       }

    }else{
      this.reqData = {
        team:team,
        player_ids: this.team1_player_ids,
        team_id: this.team1_team_id,
        selected_player_ids: this.team2_player_ids,
        selected_team_id: this.team2_team_id,
        type: 2,
        limit: this.addmatch.value.type
       }


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

}
