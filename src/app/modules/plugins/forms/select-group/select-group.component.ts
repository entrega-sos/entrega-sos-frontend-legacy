import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Component,
  OnInit,
  Input,
  Output,
  Host,
  EventEmitter,
  forwardRef,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

import { SelectGroupOption } from "./select-group-option";
import { Utils } from "./../../shared";

// Função sem conteudo, apenas para nao dar null pointer no call das referencias.
const noop = () => { };

declare var $: any;

export const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectGroupComponent),
  multi: true
};

@Component({
  selector: "select-group",
  templateUrl: "./select-group.component.html",
  styleUrls: ["./select-group.component.scss"],
  providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR]
})
export class SelectGroupComponent implements OnInit, AfterViewInit {
  // Texto de ajuda, exibido abaixo do input
  @Input() help: string;

  // Texto do label exibido acima do input
  @Input() label: string;

  // Largura , de 1 a 12, para o grid system.
  @Input() width: number = 3;

  // Itens da combo
  @Input() options: SelectGroupOption[] = [];

  // Indica se o input estará desabilitado
  @Input() disabled: boolean = false;

  // Indica se o input será multiplo
  @Input() multiple: boolean = false;

  // URL para o select2 fazer a pesquisa (padrao REST)
  @Input() urlSearch: string = "";

  // Quando usado o padrao REST com urlSearch, este campo diz o tamanho máximo de páginas a serem trazidas.
  @Input() maxResults: number = 10;

  @Input() obrigatorio: boolean = false;

  @Input() infoText: string;

  // Value interno (ngModel)
  private innerValue: any = "";

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // Id do componente select
  @Input("id") componentId: string;

  // Evento disparado no "change" do input
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef, private _http: HttpClient) { }

  ngAfterViewInit() {
    $('[data-toggle="tooltip"],.a-tooltip').tooltip({
      trigger: "hover"
    });
  }

  ngOnInit() {
    const _urlSearch = this.urlSearch;
    const _maxResults = this.maxResults;

    $(this.el.nativeElement)
      .find("select")
      .on("change", () => {
        let v = $(this.el.nativeElement)
          .find("select")
          .val();
        this.innerValue = v;
        this.onChangeCallback(v);
      });
  }

  getData() {
    const opt = [];

    this.options.forEach(element => {
      opt.push({ id: element.value, text: element.label });
    });

    return opt;
  }

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  private select2Value(value: any) {
    $(this.el.nativeElement)
      .find("select")
      .val(value)
      .trigger("change");
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);

      // Set value
      this.select2Value(this.innerValue);
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;

      // Set value
      this.select2Value(this.innerValue);
    }
  }

  getDisabledString() {
    return this.disabled ? ' disabled="disabled" ' : "";
  }

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  getOptionGroups(): string[] {
    let retorno: string[] = [];

    if (this.options) {
      for (let o of this.options) {
        if (o.group) {
          if (retorno.indexOf(o.group) < 0) {
            retorno.push(o.group);
          }
        }
      }
    }

    if (retorno.length > 0) {
      return retorno;
    } else {
      return null;
    }
  }
}
