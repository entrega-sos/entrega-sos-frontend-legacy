import { BrowserModule } from '@angular/platform-browser';
import { DebounceDirective } from './debounce.directive';
import { BotaoAplicarComponent } from './forms/buttons/botao-aplicar.component';
import { TruncatePipe } from './truncate.pipe';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { OrderPipe } from './orderBy/order-by.pipe';
import { BlockUiService } from './block-ui/block-ui.service';
import { InputDisabledComponent } from './forms/input-disabled/input-disabled.component';
import { BotaoComponent } from './forms/buttons/botao.component';
import { TextAreaGroupComponent } from './forms/textarea-group/textarea-group.component';
import { RouterModule } from '@angular/router';
import { BotaoAlterarComponent } from './forms/buttons/botao-alterar.component';
import { BotaoGridExcluirComponent } from './forms/buttons/botao-grid-excluir.component';
import { BotaoGridAlterarComponent } from './forms/buttons/botao-grid-alterar.component';
import { BotaoExcluirComponent } from './forms/buttons/botao-excluir.component';
import { BotaoVoltarComponent } from './forms/buttons/botao-voltar.component';
import { BotaoSalvarComponent } from './forms/buttons/botao-salvar.component';
import { BotaoLimparPesquisaComponent } from './forms/buttons/botao-limpar-pesquisa.component';
import { BotaoPesquisarComponent } from './forms/buttons/botao-pesquisar.component';
import { MensagemService } from './forms/mensagem.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, ButtonsRightComponent } from './data-table/data-table.component';
import { ColumnComponent } from './data-table/column/column.component';
import { PaginatorComponent } from './data-table/paginator/paginator.component';
import { PanelComponent } from './forms/panel/panel.component';
import { ColumnTemplateComponent } from './data-table/column-template/column-template.component';
import { InputGroupComponent } from './forms/input-group/input-group.component';
import { SelectGroupComponent } from './forms/select-group/select-group.component';
import { RowComponent, ColSm1Component, ColSm2Component, ColSm3Component, ColSm4Component, ColSm5Component, ColSm6Component, ColSm7Component, ColSm8Component, ColSm9Component, ColSm10Component, ColSm11Component, ColSm12Component } from './forms/grid/grid-system.component';
import { BotaoNovoComponent } from './forms/buttons/botao-novo.component';
import { SelectGroupFilterPipe } from './forms/select-group-filter.pipe';
import { PaddingPipe } from './padding.pipe';
import { ModalComponent } from './modal/modal.component';
import { TextMaskModule } from 'angular2-text-mask';
import { NoPaddingDirective } from './no-padding.directive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TooltipDirective } from './tooltip.directive';
import { LargeNumberPipe } from './large-number.pipe';
import { HelpComponent } from './forms/help/help.component';

import { TruncateTextPipe } from './truncate-text.pipe';
import { KeysPipe } from './keys.pipe';
import { ToogleComponent } from './forms/toogle/toogle.component';
import { FilterByPipe } from './pipes/filter-by.pipe';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { environment } from 'src/environments/environment';
import { SafePipe } from './pipes/safe.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import {HeaderComponent} from './header/header.component';
import { NumberOnlyPipe } from './pipes/number-only.pipe';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: '/arquivo/upload',
  maxFilesize: 10,
  acceptedFiles: 'application/pdf'
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TextMaskModule,
    HttpClientModule,
    DropzoneModule

    // PrimeNG
  ],
  providers: [
    MensagemService,
    BlockUiService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  declarations: [
    DataTableComponent,
    ButtonsRightComponent,
    ColumnComponent,
    PaginatorComponent,
    PanelComponent,
    ColumnTemplateComponent,
    InputGroupComponent,
    HelpComponent,
    InputDisabledComponent,
    TextAreaGroupComponent,
    SelectGroupComponent,
    RowComponent,
    HeaderComponent,

    ColSm1Component,
    ColSm2Component,
    ColSm3Component,
    ColSm4Component,
    ColSm5Component,
    ColSm6Component,
    ColSm7Component,
    ColSm8Component,
    ColSm9Component,
    ColSm9Component,
    ColSm10Component,
    ColSm11Component,
    ColSm12Component,

    BotaoNovoComponent,
    BotaoPesquisarComponent,
    BotaoLimparPesquisaComponent,
    BotaoSalvarComponent,
    BotaoAplicarComponent,
    BotaoVoltarComponent,
    BotaoExcluirComponent,
    BotaoAlterarComponent,
    BotaoGridAlterarComponent,
    BotaoGridExcluirComponent,
    BotaoComponent,
    SelectGroupFilterPipe,
    PaddingPipe,
    ModalComponent,
    OrderPipe,
    TruncatePipe,
    FileUploadComponent,
    NoPaddingDirective,
    TooltipDirective,
    DebounceDirective,
    LargeNumberPipe,
    TruncateTextPipe,
    KeysPipe,
    ToogleComponent,
    FilterByPipe,
    SafePipe,
    PhonePipe,
    NumberOnlyPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TextMaskModule,
    HttpClientModule,
    DropzoneModule,

    DataTableComponent,
    ButtonsRightComponent,
    PaginatorComponent,
    ColumnComponent,
    PanelComponent,
    InputGroupComponent,
    HelpComponent,
    InputDisabledComponent,
    TextAreaGroupComponent,
    SelectGroupComponent,
    RowComponent,
    HeaderComponent,

    ColSm1Component,
    ColSm2Component,
    ColSm3Component,
    ColSm4Component,
    ColSm5Component,
    ColSm6Component,
    ColSm7Component,
    ColSm8Component,
    ColSm9Component,
    ColSm9Component,
    ColSm10Component,
    ColSm11Component,
    ColSm12Component,

    BotaoNovoComponent,
    BotaoPesquisarComponent,
    BotaoLimparPesquisaComponent,
    BotaoSalvarComponent,
    BotaoAplicarComponent,
    BotaoVoltarComponent,
    BotaoExcluirComponent,
    BotaoAlterarComponent,
    BotaoComponent,
    BotaoGridAlterarComponent,
    BotaoGridExcluirComponent,
    SelectGroupFilterPipe,
    PaddingPipe,
    ModalComponent,
    ToogleComponent,

    OrderPipe,
    TruncatePipe,
    FileUploadComponent,
    NoPaddingDirective,
    TooltipDirective,
    DebounceDirective,
    LargeNumberPipe,
    TruncateTextPipe,
    KeysPipe,
    FilterByPipe,
    SafePipe,
    PhonePipe,
    NumberOnlyPipe
  ]
})
export class PluginsModule { }
