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

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.page.html',
  styleUrls: ['./add-property.page.scss'],
})
export class AddPropertyPage implements OnInit {
  title="Property Details";
  public win: any = window; 
  addmatch:FormGroup;
  is_submit:any;
  response:any;
  _id:any=localStorage.getItem('_id');
  imgpath:any;
  errors:any=['',null,undefined,'null','undefined'];
  covererr:any=false;
  propertyres:any;
  propertdetails:any;
  picpath:any;
  url:any=config.API_URL+'server/data/property/';
  lat:any;
  lng:any;
  address:any;
  userSettings = {};
  address_error:boolean=false;
  response_came:boolean=false;
  skeleton:any;
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
    public sanitizer:DomSanitizer
    ) {
      this.makeform();    
      this.skeleton=[1,2,3,4,5,6,7,8,9,1,2,2,3,4,5,6,7,65,4,2,3,4,5,6,7,8]; 
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
      this.response_came=false;
      this.getProperty();   

  }

  makeform(){
    this.addmatch= this.formBuilder.group({
         name:['',Validators.compose([Validators.required])],
         area:['',Validators.compose([Validators.required])],
         state:['',Validators.compose([Validators.required])],
         city:['',Validators.compose([Validators.required])],
         zip:['',Validators.compose([Validators.required])],
         descr:['',Validators.compose([Validators.required])]             
    });
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: SelectFavComponent
    });
    return await modal.present();
  }



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
  this.covererr=false;
  var options: CameraOptions = {
      quality: 50,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
  };
  this.camera.getPicture(options).then(imagePath => {
    this.imgpath='';
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
     if(this.errors.indexOf(this.address)==-1){
    this.address_error=false;
    this.notifi.presentLoading(); 
    const formData = new FormData();
    formData.append('file', img, file); 
    formData.append('_id', this._id);
    formData.append('name', this.addmatch.value.name);
    formData.append('area', this.addmatch.value.area);
    formData.append('state', this.addmatch.value.state);
    formData.append('city', this.addmatch.value.city);
    formData.append('zip', this.addmatch.value.zip);
    formData.append('address', this.address);
    formData.append('descr', this.addmatch.value.descr);
     formData.append('lat', this.lat);
      formData.append('lng', this.lng);
  
     this.apiservice.post('updatePropertyByOwner',formData,'').subscribe((result) => {  
       this.notifi.stopLoading();              
       this.response=result;
   if(this.response.status == 1){
    this.notifi.presentToast(this.response.msg,'success');  
    this.is_submit=false;   
 
              }else{
                this.notifi.presentToast(this.response.msg,'danger');  

              }
},
 err => {
       this.notifi.stopLoading();
       this.notifi.presentToast('Internal server error. Try again','danger');
 });
     }else{
       this.address_error=true;
     }

   
  }

  getProperty(){   
    this.apiservice.post('getProperty',{_id:this._id},'').subscribe((result) => {  
      this.response_came=true;
      this.notifi.stopLoading();              
      this.propertyres=result;
  if(this.propertyres.status == 1){ 
          this.covererr= false;  
          this.address= this.propertyres.data.address;  
          this.userSettings['inputString'] = this.propertyres.data.address ;
           this.userSettings = Object.assign({},this.userSettings);
      // this.notifi.presentToast(this.response.msg,'success'); 
      this.propertdetails=this.propertyres.data;
      this.addmatch.patchValue({
        name:this.propertdetails.name,
        area:this.propertdetails.area,
        state:this.propertdetails.state,
        city:this.propertdetails.city,
        zip:this.propertdetails.zip,
        address:this.propertdetails.address,
        descr:this.propertdetails.descr      
      });
      this.picpath= this.propertdetails.cover;
      console.log(this.propertdetails);     
     
  }

},
err => {
       this.response_came=true;
      this.notifi.stopLoading();
      this.notifi.presentToast('Internal server error. Try again','danger');
});

   }

   autoCompleteCallback1(selectedData:any) {
 console.log(selectedData.data);
 this.lat= selectedData.data.geometry.location.lat;
 this.lng= selectedData.data.geometry.location.lng;
 this.address= selectedData.data.description;
 
}

}

