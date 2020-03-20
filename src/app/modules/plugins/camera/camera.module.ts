import { FormsModule } from '@angular/forms';
import { PluginsModule } from './../plugins.module';
import { TirarFotoService } from './tirar-foto.service';
import { DeviceListService } from './device-list.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TirarFotoComponent } from './tirar-foto/tirar-foto.component';

@NgModule({
    imports: [
        CommonModule,
        PluginsModule,
        FormsModule
    ],
    declarations: [TirarFotoComponent],
    providers: [DeviceListService, TirarFotoService]
})
export class CameraModule { }
