import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SelectFavComponent } from "./select-fav/select-fav.component";
import { SelectTeamPage } from "./select-team/select-team.page";
import { CancelbookingComponent } from "./cancelbooking/cancelbooking.component";
import { CancelmatchComponent } from "./cancelmatch/cancelmatch.component";
import { AddReviewComponent } from "./add-review/add-review.component";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera} from '@ionic-native/camera/ngx';
import {HttpModule} from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { AlertController } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxStarsModule } from 'ngx-stars';
import { Toast } from '@ionic-native/toast/ngx';
import { socket_config, social_config } from './config';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: socket_config.SOCKET_URL, options: {} };
@NgModule({
  declarations: [SelectTeamPage,AppComponent , SelectFavComponent , CancelbookingComponent , CancelmatchComponent, AddReviewComponent],
  entryComponents: [SelectTeamPage, SelectFavComponent , CancelbookingComponent , CancelmatchComponent, AddReviewComponent],
  imports: [
    NgxStarsModule,
    FormsModule,
    ReactiveFormsModule,
  Ng4GeoautocompleteModule,
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,  
    SocketIoModule.forRoot(config)
  ],
  providers: [   
    StatusBar,
    HttpClient,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FileTransfer,
    FileTransferObject,
    File,
    FilePath,
    Camera,
    FCM,
    Geolocation,
    InAppBrowser,
    AlertController,
    Toast
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
