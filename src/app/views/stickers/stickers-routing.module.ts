import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { StickersComponent } from './stickers.component';
import { AllStickersComponent } from './all-stickers/all-stickers.component';
import { NewStickerPageComponent } from './new-sticker-page/new-sticker-page.component';
import { EditStickerPageComponent } from './edit-sticker-page/edit-sticker-page.component';
import { NewStickerComponent } from './new-sticker/new-sticker.component';
import { StickerPagesComponent } from './sticker-pages/sticker-pages.component';
import { RepositionStickerPagesComponent } from './reposition-sticker-pages/reposition-sticker-pages.component'
const routes: Routes = [
  {
    path: '',
    component: StickersComponent,
    data: {
      title: 'Stickers'
    }
  },
  {
    path: 'all-stickers',
    component: AllStickersComponent,
    data: {
      title: 'All Stickers'
    }
  },
  {
    path: 'new-stickers',
    component: NewStickerComponent,
    data: {
      title: 'New Sticker'
    }
  },
  {
    path: 'new-sticker-pages',
    component: NewStickerPageComponent,
    data: {
      title: 'New Sticker Page'
    }
  },
  {
    path: 'edit-sticker-pages',
    component: EditStickerPageComponent,
    data: {
      title: 'Edit Sticker Page'
    }
  },
  {
    path: 'sticker-pages',
    component: StickerPagesComponent,
    data: {
      title: 'Sticker Pages'
    }
  },
  {
    path: 'reposition-sticker-pages',
    component: RepositionStickerPagesComponent,
    data: {
      title: 'Reposition Sticker Pages'
    }
  },

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StickersRoutingModule { }
