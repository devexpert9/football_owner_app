import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
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
import { stringify } from 'querystring';
import { IonContent } from '@ionic/angular';
declare var window: any; 
import { ModalController } from '@ionic/angular';
 
declare var window: any; 
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
   @ViewChild(IonContent, { static: false }) content: IonContent;

  public win: any = window; 
  response:any;
  profileData: any;
  IsLoggedIn: any = localStorage.getItem('isLoggedIn');
  IsPasswordUpadte: any = false;
  profileImage: any = null;
  imageURI: any;
  errors:any=['',null,undefined,'null','undefined'];
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
  authForm: FormGroup; 
  passwordfrom: FormGroup; 
  firstname:any;
  lastname:any;
  email:any;
  contact:any;
  image:any;
  propic:any;
  profile:any;
  url:any=config.API_URL+'server/data/pic/';
  updatedata:FormGroup;
  is_submit:any=false;
  filevar:any;
  _id:any;
  title:any;
  matches:any;
  rate:any;
  onRateChange:any;
  presentModal:any;
  imgpath:any;
  imgblob:any;
  alldata:any=JSON.parse(localStorage.getItem('user'));
  second_form:any=false;  
  img_selected:any=false; 
  name:any;
  address:any;

  addmatch1:FormGroup;
  is_submit1:any;
  response1:any;
  imgpath1:any;
  covererr1:any=false;
  propertyres1:any;
  propertdetails1:any;
  picpath1:any;
  url1:any=config.API_URL+'server/data/property/';
  lat1:any;
  lng1:any;
  address1:any='chandigarh';
  userSettings1 = {};
  address_error1:boolean=false;
  response_came1:boolean=false;
  skeleton:any;

  constructor(	   
    public modalController: ModalController,
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
       )  {
            this.skeleton=[1,2,3,4,5,6,7,8,9,1,2,2,3,4,5,6,7,65,4,2,3,4,5,6,7,8]; 
            this.events.subscribe('refresh', data => {
              this.ionViewDidEnter();
          
            })  

           this.makepasswordform();    
           this._id= localStorage.getItem('_id');
           if(this.errors.indexOf(this.alldata.pic)){
            this.propic=this.alldata.pic;   
           }
             
           this.profile = "personal";
           this.makeform();
          
          this.name= this.alldata.fname[0].toUpperCase()+this.alldata.fname.slice(1)+' '+this.alldata.lname[0].toUpperCase()+this.alldata.lname.slice(1);
          this.address= this.alldata.city+', '+this.alldata.state+', '+this.alldata.country;  
        }

  ngOnInit() {
  }


  ionViewDidEnter(){

      this._id = localStorage.getItem('_id');
      this.response_came1=false;
      this.getProperty(); 
      this.alldata='';
      this.alldata=JSON.parse(localStorage.getItem('user'));
      this.name='';
      this.address='';
      this.propic=this.alldata.pic;      

      this.updatedata.patchValue({
      fname:this.alldata.fname,
         lname:this.alldata.lname,
         email:this.alldata.email,
         phone:this.alldata.phone,
         city:this.alldata.city,
         state:this.alldata.state,
         country:this.alldata.country,
         zip:this.alldata.zip
      }); 

  }

  /////////
 
  async selectImage1() {
   
    const actionSheet = await this.actionSheetController.create({
    header: "Select Image source",
    mode:"ios",
    buttons: [{
          text: 'Load from Library',
          handler: () => {
         
              this.takePicture1(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
      },
      {
          text: 'Use Camera',
          handler: () => {
            
              this.takePicture1(this.camera.PictureSourceType.CAMERA);
             
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

takePicture1(sourceType: PictureSourceType) {
  this.covererr1=false;
  var options: CameraOptions = {
      quality: 50,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
  };
  this.camera.getPicture(options).then(imagePath => {
    this.imgpath1='';
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
            .then(filePath => { 

           
              this.imgpath1 = imagePath;

            });
    } else {
      // this.startUpload(imagePath);
    
      this.imgpath1 = imagePath;
     
    }
  });
} 


  addmatchnow(){ 
   this.is_submit1=true;
   if(this.errors.indexOf(this.imgpath1)==-1 && this.addmatch1.valid){
    this.file.resolveLocalFilesystemUrl(this.imgpath1)
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
    this.covererr1=true;

  } 

  }

   uploadmatch(img,file){
     if(this.errors.indexOf(this.address1)==-1){
          this.address_error1=false;
          this.notifi.presentLoading(); 
          const formData = new FormData();
          formData.append('file', img, file); 
          formData.append('_id', this._id);
          formData.append('name', this.addmatch1.value.name);
          formData.append('area', this.addmatch1.value.area);
          formData.append('state', this.addmatch1.value.state);
          formData.append('city', this.addmatch1.value.city);
          formData.append('zip', this.addmatch1.value.zip);
          formData.append('address', this.address1);
          formData.append('descr', this.addmatch1.value.descr);
          formData.append('lat','30.7333');
          formData.append('lng', '76.7794');
  
          this.apiservice.post('updatePropertyByOwner',formData,'').subscribe((result) => {  
              this.notifi.stopLoading();              
              this.response1=result;
          if(this.response1.status == 1){
            this.notifi.presentToast(this.response1.msg,'success');  
            this.is_submit1=false;   
         }else{
                        this.notifi.presentToast(this.response1.msg,'danger');  
                      }
        },
        err => {
              this.notifi.stopLoading();
              this.notifi.presentToast('Internal server error. Try again','danger');
        });


     }else{
       this.address_error1=true;
     }

   
  }

  getProperty(){   
    this.apiservice.post('getProperty',{_id:this._id},'').subscribe((result) => {  
          this.response_came1=true;
          this.notifi.stopLoading();              
          this.propertyres1=result;
  if(this.propertyres1.status == 1){ 
          this.covererr1= false;  
          this.address1= this.propertyres1.data.address;  
          this.userSettings1['inputString'] = this.propertyres1.data.address ;
          this.userSettings1 = Object.assign({},this.userSettings1);
      // this.notifi.presentToast(this.response.msg,'success'); 
      this.propertdetails1=this.propertyres1.data;
      this.addmatch1.patchValue({
          name:this.propertdetails1.name,
          area:this.propertdetails1.area,
          state:this.propertdetails1.state,
          city:this.propertdetails1.city,
          zip:this.propertdetails1.zip,
          address:this.propertdetails1.address,
          descr:this.propertdetails1.descr      
      });
          this.picpath1= this.propertdetails1.cover;
          console.log(this.propertdetails1);     
     
  }

},
err => {
          this.response_came1=true;
          this.notifi.stopLoading();
          this.notifi.presentToast('Internal server error. Try again','danger');
});

   }

   autoCompleteCallback1(selectedData:any) {
          console.log(selectedData.data);
          this.lat1= selectedData.data.geometry.location.lat;
          this.lng1= selectedData.data.geometry.location.lng;
          this.address1= selectedData.data.description;
 
}


  /////////
   
  makeform(){
    this.updatedata= this.formBuilder.group({
         fname:['',Validators.compose([Validators.required])],
         lname:['',Validators.compose([Validators.required])],
         email:['',Validators.compose([Validators.required])],
         phone:['',Validators.compose([Validators.required])],
         city:['',Validators.compose([Validators.required])],
         state:['',Validators.compose([Validators.required])],
         country:['',Validators.compose([Validators.required])],
         zip:['',Validators.compose([Validators.required])]
    });

    this.addmatch1= this.formBuilder.group({
        name:['',Validators.compose([Validators.required])],
        area:['',Validators.compose([Validators.required])],
        state:['',Validators.compose([Validators.required])],
        city:['',Validators.compose([Validators.required])],
        zip:['',Validators.compose([Validators.required])],
        descr:['',Validators.compose([Validators.required])]             
 });

  }

  makepasswordform(){
    this.passwordfrom= this.formBuilder.group({
         opassword:['',Validators.compose([Validators.required])],
         cpassword:['',Validators.compose([Validators.required])], 
         npassword:['',Validators.compose([Validators.required,Validators.minLength(6)])], 
    });
  }

   //picture update
   async selectImage() {
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
              this.img_selected=true;    
              this.imgpath=imagePath;
            });
    }
          this.img_selected=true;    
          this.imgpath=imagePath;
  });
} 

updatepersnl() {
  
    this.is_submit=true;
    if(this.updatedata.valid){
      
    if(this.errors.indexOf(this.imgpath)==-1){
      this.file.resolveLocalFilesystemUrl(this.imgpath)
      .then(entry => {
          ( < FileEntry > entry).file(file => {
            console.log('read file');
            this.notifi.presentLoading();
            const reader = new FileReader();
            reader.onloadend = () => {
              console.log('onloadend');
              const imgBlob = new Blob([reader.result], {
                type: file.type
            });
            this.finalfun(imgBlob,file.name);           
          }
          reader.readAsArrayBuffer(file);

          })
      })
      .catch(err => {
          this.notifi.presentToast('Error while reading file.','danger');
      });     
    }else{

      this.finalfun(2,''); 

    }       
  
  }
}


finalfun(img,file){
  const formData = new FormData();
  if(img!=2){
    formData.append('file', img, file); 
  }
  
  formData.append('_id', this._id);
  formData.append('fname', this.updatedata.value.fname);
  formData.append('lname', this.updatedata.value.lname);
  formData.append('email', this.updatedata.value.email);
  formData.append('city', this.updatedata.value.city);
  formData.append('country', this.updatedata.value.country);
  formData.append('zip', this.updatedata.value.zip);
  formData.append('phone', this.updatedata.value.phone);
  formData.append('state', this.updatedata.value.state);

  this.apiservice.post('updateinfo', formData ,'').subscribe((result) => {                
        this.response=result;
    if( this.response.status == 1){

       
        localStorage.setItem('user', JSON.stringify(this.response.data)); 
        var publishdata={
          fname:this.updatedata.value.fname,
          lname:this.updatedata.value.lname,
          pic:this.response.data.pic
        }

        this.events.publish('newdata',JSON.stringify(publishdata));
        this.propic = this.response.data.pic;    
        this.name= this.updatedata.value.fname[0].toUpperCase()+this.updatedata.value.fname.slice(1)+' '+this.updatedata.value.lname[0].toUpperCase()+this.updatedata.value.lname.slice(1)                  
        this.address= this.updatedata.value.city+', '+this.updatedata.value.state+', '+this.updatedata.value.country;  
        this.ref.detectChanges();
        this.notifi.stopLoading();
        this.notifi.presentToast('Profile has been updated','success');
      
    }
    else{
        this.notifi.stopLoading();
        this.notifi.presentToast('Error while updating profile,Please try later','danger');
    }
  },
  err => {
        this.notifi.stopLoading();
        this.notifi.presentToast('Error while updating profile  ,Please try later','danger');
  });
}

updatepassword(){
 
  this.second_form=true;
 if(this.passwordfrom.valid){
   if(this.passwordfrom.value.npassword==this.passwordfrom.value.cpassword){
    this.notifi.presentLoading();
     var passdata={
       _id:this._id,
       opassword:this.passwordfrom.value.opassword,
       npassword:this.passwordfrom.value.npassword
     }
    this.apiservice.post('updatepassword',passdata,'').subscribe((result) => {  
      this.notifi.stopLoading();              
      this.response=result;
  if(this.response.status == 1){
     
      this.notifi.presentToast(this.response.msg,'success');
      this.passwordfrom.reset();
      this.second_form=false;
  }
  else{
     
      this.notifi.presentToast(this.response.msg,'danger');
  }
},
err => {
      this.notifi.stopLoading();
      this.notifi.presentToast('Error while updating profile  ,Please try later','danger');
});
   }else{
    this.notifi.presentToast('Passwords do not match','danger');
   }
 }


}

goToProperty(){
  
}

}
