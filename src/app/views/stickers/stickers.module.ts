import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { StickersComponent } from './stickers.component';
import { StickersRoutingModule } from './stickers-routing.module';
import { UsersService } from '../../services/users/users.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap';
import { OrderByPipe } from "../../services/orderby";

//COMPONENTS
import { AllStickersComponent } from './all-stickers/all-stickers.component';
import { NewStickerPageComponent } from './new-sticker-page/new-sticker-page.component';
import { EditStickerPageComponent } from './edit-sticker-page/edit-sticker-page.component';
import { NewStickerComponent } from './new-sticker/new-sticker.component';
import { StickerPagesComponent } from './sticker-pages/sticker-pages.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { RepositionStickerPagesComponent } from './reposition-sticker-pages/reposition-sticker-pages.component';
@NgModule({
  imports: [
    Ng4LoadingSpinnerModule.forRoot(),
    StickersRoutingModule,
    ChartsModule,
    HttpModule,
    CommonModule,
    FormsModule,
    TabsModule


  ],
  declarations: [StickersComponent, OrderByPipe, AllStickersComponent, NewStickerPageComponent, EditStickerPageComponent, NewStickerComponent, StickerPagesComponent, RepositionStickerPagesComponent],
  providers: [
    Ng4LoadingSpinnerService,
    UsersService
  ]
})
export class StickersModule { }
