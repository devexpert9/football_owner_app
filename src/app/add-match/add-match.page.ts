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
    private iab: InAppBrowser 
    ) {
         this.date= new Date().toISOString();
       this.makeform();

  }

  ngOnInit() {
  }
  ionViewDidEnter(){
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
         players:['',Validators.compose([Validators.required])],
         team1:['',Validators.compose([Validators.required])],
         team2:['',Validators.compose([Validators.required])]
        
       
    });
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: SelectFavComponent
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

   if(this.errors.indexOf(this.imgpath)==-1 && this.addmatch.valid){
    this.file.resolveLocalFilesystemUrl(this.imgpath)
    .then(entry => {
        ( < FileEntry > entry).file(file => {
          console.log('read file');
          const reader = new FileReader();
          reader.onloadend = () => {
            console.log('onloadend');
            const imgBlob = new Blob([reader.result], {
              type: file.type
          });
          this.uploadmatch(imgBlob,file.name);           
        }
        reader.readAsArrayBuffer(file);

        })
    })
    .catch(err => {
        this.notifi.presentToast('Error while reading file.','danger');
    });     
  }else{
    this.covererr=true;
  } 

  }

   uploadmatch(img,file){

  
    this.notifi.presentLoading(); 
    const formData = new FormData();
    formData.append('file', img, file); 
    formData.append('_id', this._id);
    formData.append('name', this.addmatch.value.name);
    formData.append('location', this.addmatch.value.location);
    formData.append('date', this.addmatch.value.date.split('T')[0]);
    formData.append('stime', this.stime);
    formData.append('etime', this.etime);
    formData.append('players', this.addmatch.value.players);
    formData.append('team1', this.addmatch.value.team1);
    formData.append('team2', this.addmatch.value.team2);
    formData.append('request_match', '0');
    formData.append('fullday', '0');

  
     this.apiservice.post('addmatch/'+this._id+'/'+this.stime+'/'+this.etime+'/'+this.addmatch.value.date.split('T')[0],formData,'').subscribe((result) => {  
       this.notifi.stopLoading();              
       this.response=result;
   if(this.response.status == 1){
    this.notifi.presentToast(this.response.msg,'success');  
    this.is_submit=false;
    this.addmatch.reset();   
    this.imgpath=''; 
 
              } else if(this.response.status == 3){
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



// browser.on('loadstop').subscribe(event => {
//    browser.insertCSS({ code: "body{color: red;" });
// });

// browser.close();

  }

}
