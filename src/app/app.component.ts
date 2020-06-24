import { Component, ChangeDetectorRef } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {config} from './config'
import { Router } from '@angular/router';
import { MenuController, Platform, Events } from '@ionic/angular';
import { FCM } from '@ionic-native/fcm/ngx';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './services/api/api.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/tabs/tabs/home',
      icon: 'home'
    },
     {
      title: 'Messages',
      url: '/allchats',
      icon: 'navigate',
      icons:'navigate'
    },
    {
      title: 'Player List',
      url: '/player-list',
      icon: 'list'
    },
    {
      title: 'My Facility',
      url: '/my-profile',
      icon: 'person'
    },
    {
      title: 'My Matches',
      url: '/matches-list',
      icon: 'football'
    },
    {
      title: 'Notifications',
      url: '/tabs/tabs/notifications',
      icon: 'notifications'
    },
	{
      title: 'Field Requests',
      url: '/field-requests',
      icon: 'bookmark'
    }
  ];
    alldata:any;
    url:any=config.API_URL+'server/data/pic/';
    propic:any;
    errors:any=['',null,undefined,'null','undefined',0,'0'];
    logged_in:any=false;
    fname:any;
    lname:any;
    logged:any;
    messages:any=0;
    _id:any=''
   constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events:Events,
    private Router:Router,
    private ref: ChangeDetectorRef,  
    private menu: MenuController,
    private fcm: FCM,
    public apiservice:ApiService,
    private socket: Socket,

  ) {

      this.get_Messages();
      this.getUpdates().subscribe(new_message => {
      this.get_Messages();
      });
  
    this.alldata =JSON.parse(localStorage.getItem('user'));

    this.logged= localStorage.getItem('_id');
    if(this.errors.indexOf(this.alldata)==-1){
     this.propic=this.alldata.pic;
     this.fname=this.alldata.fname;
     this.lname= this.alldata.lname;
      this.logged_in=true;
    }
      this.initializeApp();
      
      this.events.subscribe('newdata', data => {
       var newdata= JSON.parse(data);
       this.fname =newdata.fname;
       this.lname = newdata.lname;
       this.propic = newdata.pic;
       this.ref.detectChanges();
     
      });
      
      this.events.subscribe('logged', data => {
      this.alldata = JSON.parse(localStorage.getItem('user'));
      this.propic ='';
      this._id = localStorage.getItem('_id');        
      this.get_Messages();
      this.alldata =JSON.parse(localStorage.getItem('user'));
      this.propic =data;
      this.logged_in=true;
      this.fname = this.alldata.fname;
      this.lname = this.alldata.lname;
    });
     
  }  
 
  initializeApp() {
    this.platform.ready().then(() => {

       this.fcm.onNotification().subscribe(data => {
        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      });

      this.statusBar.backgroundColorByHexString('#535353');
      this.statusBar.styleDefault();
      this.splashScreen.hide();     
    });
  }

  logout(){    
    localStorage.removeItem('user');
    localStorage.removeItem('logged_in');
    localStorage.removeItem('_id');
    this.closeMenu();
    var self = this;
    setTimeout(function(){
     self.logged_in=false;
     self.Router.navigate(['/login']);
   },500);  
  
   }

   closeMenu(){
    this.menu.close();
  }

    getUpdates() {
    var self = this;
    let observable = new Observable(observer => {
      self.socket.on('rec_message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  get_Messages() {
    this.apiservice.post('get_unread_messages', {_id:this._id},'').subscribe((result) => {
        var res;
        res = result;
        if(res.status == 1){
        this.messages= res.data;
        }else{
        this.messages= null;
        }
       
      },
      err => {
 
      });
}

}
