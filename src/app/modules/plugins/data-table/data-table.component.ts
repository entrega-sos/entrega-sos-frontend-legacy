import { Subscription } from 'rxjs';
import { Component, OnInit, Input, Output, ContentChildren, QueryList, AfterContentInit, EventEmitter, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';

import { DataPaginationEvent } from './../plugins.api';
import { ColumnComponent } from './column/column.component';
import { PaginatorComponent } from './paginator/paginator.component';

const KEY_PROXIMA_PAGINA = 39;
const KEY_PAGINA_ANTERIOR = 37;
const KEY_PROXIMO_REGISTRO = 40;
const KEY_REGISTRO_ANTERIOR = 38;

// TODO Teclas PAGEUP e PAGEDOWN
const KEY_PRIMEIRA_PAGINA = -1;
const KEY_ULTIMA_PAGINA = -2;

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  host: {
    '(window:keydown)': '_keydown($event)'
  }
})
export class DataTableComponent<T> implements OnInit, OnDestroy, AfterContentInit {

  // Dados da tabela
  private _data: any[];

  // Id interno da table
  @Input("id") componentId: string = Math.random().toString().replace('.', '');

  // Indica se o data table será paginado
  @Input() paginated: boolean = false;

  // Indica se o data table irá escutar eventos de keydown, para navegação.
  @Input() keyEvents: boolean = false;

  // Evento para lazy loading (paginação)
  @Output() onPaginate: EventEmitter<DataPaginationEvent> = new EventEmitter();

  @Output() onClickItem: EventEmitter<any> = new EventEmitter();

  // Mensagem a exibir quando não houver dados
  @Input() noDataMessage: string = "Nenhum registro encontrado.";

  // Número de itens por pagina (se for paginado) (default 10)
  @Input() pageSize: number = 8;

  // Classe css para injetar no objeto table
  @Input() cssClass: string = '';

  // Indica se irá realizar seleção
  @Input() selectable: boolean = false;

  // Indica se o paginador será exibido no topo
  @Input() paginatorOnTop: boolean = false;

  // Indica se o paginador será exibido no rodapé
  @Input() paginatorOnBottom: boolean = true;

  // Colunas das tabelas
  @ContentChildren(ColumnComponent) _colunas: QueryList<ColumnComponent>;

  // Variavel local das colunas
  colunas: ColumnComponent[] = [];

  // Página atual do data table
  private currentPage: number = 1;

  // Total de Registros do data table (paginação)
  private totalRecords: number = 0;

  // Total de páginas, calculado pelo componente
  private totalPages: number = 0;

  // Inscrição do evento change do array de colunas
  // private inscricaoColunasChange: Subscription;

  // Inscrição de eventos diversos
  private subscriptions: Subscription[] = [];

  // Controla a linha selecionada
  selectedRow: number;

  @Input() public height: number;

  @ViewChild('bottomPaginator', { static: false }) bottomPaginator: PaginatorComponent;
  @ViewChild('topPaginator', { static: false }) topPaginator: PaginatorComponent;

  constructor(public viewContainer: ViewContainerRef) { }

  ngOnInit() {

  }

  private _keydown(event: KeyboardEvent) {
    const paginator = this.bottomPaginator ? this.bottomPaginator : this.topPaginator;

    if (this.keyEvents) {
      switch (event.keyCode) {
        case (KEY_PROXIMA_PAGINA): {
          if (paginator)
            paginator.next();
          event.preventDefault();
          break;
        }
        case (KEY_PAGINA_ANTERIOR): {
          if (paginator)
            paginator.previous();
          event.preventDefault();
          break;
        }
        case (KEY_PRIMEIRA_PAGINA): {
          if (paginator)
            paginator.first();
          event.preventDefault();
          break;
        }
        case (KEY_ULTIMA_PAGINA): {
          if (paginator)
            paginator.last();
          event.preventDefault();
          break;
        }
        case (KEY_PROXIMO_REGISTRO): {
          this.proximoRegistro();
          event.preventDefault();
          break;
        }
        case (KEY_REGISTRO_ANTERIOR): {
          this.registroAnterior();
          event.preventDefault();
          break;
        }
      }
    }
  }

  @Input()
  // Dados da tabela
  set data(data: any[]) {
    this._data = data;
    if (!this._data) {
      this._data = [];
    }
  }

  get data() {
    return this._data;
  }

  @Input()
  // Número total de registros
  set total(_total: number) {
    this.totalRecords = _total;
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

  ngAfterContentInit() {
    this.initColumns();

    // Se inscreve neste evento para receber eventuais mudanças de colunas
    this.subscriptions.push(
      this._colunas.changes.subscribe(() => this.initColumns())
    );
    this.load();
  }

  ngAfterViewInit() {
    // Se tiver os dois paginadores, inscreve um para escutar evento do outro.
    if (this.bottomPaginator && this.topPaginator) {

      this.subscriptions.push(
        this.bottomPaginator
          .onPageChange
          .subscribe((page) => this.topPaginator.setCurrent(page, false))
      );

      this.subscriptions.push(
        this.topPaginator
          .onPageChange
          .subscribe((page) => this.bottomPaginator.setCurrent(page, false))
      );
    }

  }

  // Inicializa o array de colunas
  private initColumns(): void {
    this.colunas = this._colunas.toArray();
  }

  // Marca como selecionado o próximo registro
  proximoRegistro() {
    if (!this.data) {
      return;
    }

    if (this.selectedRow < this.data.length - 1) {
      this.selectedRow++;
    } else if (this.selectedRow >= this.data.length - 1) {
      // Se chegou no ultimo registro, e ainda tem páginas para avançar, vai para a próxima página.
      if (this.currentPage < this.totalPages) {
        this.bottomPaginator.next();
      }
    }
  }

  // Marca como selecionado o registro anterior
  registroAnterior() {
    if (this.selectedRow > 0) {
      this.selectedRow--;
    } else if (this.selectedRow <= 0) {
      // Se chegou no primeiro registro, e tem páginas para voltar, vai para a página anterior.
      if (this.currentPage > 1) {
        this.bottomPaginator.previous();
        this.selectedRow = this.data.length - 1;
      }
    }
  }

  // Retorna o valor de um field
  resolveFieldValue(data: any, field: string): any {
    if (data && field) {
      if (field.indexOf('.') == -1) {
        return data[field];
      } else {
        let fields: string[] = field.split('.');
        let value = data;
        for (var i = 0, len = fields.length; i < len; ++i) {
          if (value == null) {
            return null;
          }
          value = value[fields[i]];
        }
        return value;
      }
    } else {
      return null;
    }
  }

  // Evento de mudança de paginação
  paginatorChange(page: number) {
    this.currentPage = page;

    // Faz o reload do datagrid, atualizando-o se for lazy
    this.load();
  }

  // Evento para o load da table, disparando o evento de paginação
  load(page: number = this.currentPage, selectedRow: number = 0) {

    this.selectedRow = selectedRow;

    // Atualiza o paginador
    if (page != this.currentPage) {
      this.bottomPaginator.setCurrent(page, false);
    }

    // Atualiza currentPage
    this.currentPage = page;

    if (this.onPaginate) {
      this.onPaginate.emit({
        page: this.currentPage,
        pageSize: this.pageSize,
        idTable: this.componentId
      });
    }
  }

  clickLinha(item) {
    this.onClickItem.emit(item);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  getSelectedRow(): number {
    return this.selectedRow;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getTotalPages() {
    return this.totalPages;
  }

  getTotalRecords() {
    return this.totalRecords;
  }

  getSelectedItem(): T {
    return this._data[this.getSelectedRow()];
  }
}

@Component({
  selector: "buttons-right",
  template: '<ng-content></ng-content>'
})
export class ButtonsRightComponent {

}
