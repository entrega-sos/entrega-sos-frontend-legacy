import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ElementRef, AfterContentChecked, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

import createNumberMask from "text-mask-addons/dist/createNumberMask";
import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";

declare var $: any;

// Função sem conteudo, apenas para nao dar null pointer no call das referencias.
const noop = () => { };

// Esta funcao global está definida em app.js, fora do escopo do typescript. Esta aqui apenas para nao dar erro de compilação.
// var handleInput: any;

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputGroupComponent),
  multi: true
};

// Constante para usar na mascara de monetário
const moneyMask = createNumberMask({
  prefix: "R$ ",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ".",
  allowDecimal: true,
  decimalSymbol: ",",
  decimalLimit: 2,
  requireDecimal: true,
  allowNegative: false,
  allowLeadingZeroes: true,
  integerLimit: null
});

// Constante para mascara de percentual
const percentMask = createNumberMask({
  prefix: "",
  suffix: " %",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ".",
  allowDecimal: true,
  decimalSymbol: ",",
  decimalLimit: 2,
  integerLimit: 3
});

// Constante para pipe de autocorrecao de datas
const autoCorrectedDatePipe = createAutoCorrectedDatePipe("dd/mm/yyyy");

@Component({
  selector: "input-group",
  templateUrl: "./input-group.component.html",
  styleUrls: ["./input-group.component.scss"],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputGroupComponent
  implements OnInit, ControlValueAccessor, AfterContentChecked, AfterViewInit {
  // Texto de ajuda, exibido abaixo do input
  @Input() help: string = '';

  // Texto do label exibido acima do input
  @Input() label: string;

  // Largura , de 1 a 12, para o grid system.
  @Input() width: number = 3;

  // Indica se o input estará desabilitado
  @Input() disabled: boolean = false;

  @Input() autoFocus: boolean = false;

  // Tipo do input
  @Input() type: string = "text";

  // Máscara customizada do input
  @Input() customMask: string = "";

  @Input() classLabel: string;

  @Input() classInput: string;

  @Input() obrigatorio: boolean = false;

  @Input() infoText: string;

  @Input() checkedLabel: string;

  @Input() uncheckedLabel: string;

  @Input() checkedValue: string;

  @Input() uncheckedValue: string;

  @Input() checked: boolean = true;

  @Input() min: number;

  @Input() max: number;

  @Output() checkBoxChange: EventEmitter<boolean> = new EventEmitter();

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  //focus: boolean;

  onModelChange: Function = () => { };

  onModelTouched: Function = () => { };

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  // Value interno (ngModel)
  private innerValue: any = "";

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // Id interno do input
  @Input("id")
  componentId: string = Math.random()
    .toString()
    .replace(".", "");

  // Evento disparado no "change" do input
  @Output()
  change: EventEmitter<any> = new EventEmitter();

  private picker: any;

  constructor(private el: ElementRef,
    private cd: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterContentChecked() {
    this.changeModel();

    if (this.type == "checkbox") {
      if (this.value == this.checkedValue) {
        this.checked = true;
      } else if (this.value == this.uncheckedValue) {
        this.checked = false;
      } else {
        this.checked = undefined;
      }
    }
  }

  ngAfterViewInit() {
    if (this.autoFocus) {
      $("#" + this.getInternalComponentId()).focus();
    }

    let id = "#" + this.getInternalComponentId();

    if (this.type == 'date') {
      this.picker = $("#" + this.getInternalComponentId()).datepicker({
        language: "pt-BR",
        onSelect: function (date) {
          $(id).focus();
        }
      });
    }

    $('[data-toggle="tooltip"],.a-tooltip').tooltip({
      trigger: "hover"
    });

    let c = this;

    if (this.type == "checkbox_backup") {
      $('#' + this.getInternalComponentId()).unbind('switchChange.bootstrapSwitch');
      $('#' + this.getInternalComponentId()).on('switchChange.bootstrapSwitch', function (event, state) {
        c.checked = state;
        if (c.checked && c.value != c.checkedValue) {
          c.value = c.checkedValue;
        } else if (c.value != c.uncheckedValue) {
          c.value = c.uncheckedValue;
        }
        setTimeout(() => c.checkBoxChange.emit(state), 100)
      });
    }
  }

  focus() {
    $("#" + this.getInternalComponentId()).focus();
  }

  //get accessor
  get value(): any {
    return this.innerValue;
  }

  getDisabledString() {
    return this.disabled ? ' disabled="disabled" ' : "";
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);

      if (this.type == "checkbox") {
        if (v == this.checkedValue) {
          this.checked = true;
        } else if (v == this.uncheckedValue) {
          this.checked = false;
        } else {
          this.checked = undefined;
        }
      }
    }
  }

  onClick(event: Event, input: HTMLInputElement) {
    if (!this.disabled) {
      // this.focus = true;

      if (input.type == "checkbox") {
        let c = this;

        if (c.value == undefined || c.value == '') {
          c.value = c.checkedValue;
        } else if (c.value == c.checkedValue) {
          c.value = c.uncheckedValue;
        } else {
          c.value = '';
        }

        setTimeout(() => c.checkBoxChange.emit(c.value), 100)
      }

      input.focus();
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();

    if (
      this.type == "money" ||
      this.type == "currency" ||
      this.type == "dinheiro"
    ) {
      // TODO Formatar na saida
    }
  }

  onFocus() {
    if (this.picker) {
      this.value = $("#" + this.getInternalComponentId()).val();
    }
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  //
  changeModel() {
    // Força o "change", durante o changeModel.
    let el = $(this.el.nativeElement).find(".form-control");

    if (this.value && this.value != "") {
      el.addClass("edited");
    } else {
      el.removeClass("edited");
    }
  }

  getInputType(): string {
    if (["text", "password", "email", "number"].includes(this.type)) {
      return this.type;
    }
    return "text";
  }

  getMask() {
    /**
     *  Monta o componente de máscara
     */

    if (this.type == "date") {
      // Data
      return [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
    } else if (this.type == "time" || this.type == "hora") {
      // Hora
      return [/\d/, /\d/, ":", /\d/, /\d/];
    } else if (this.type == "cep") {
      // CEP
      return [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
    } else if (
      this.type == "phone" ||
      this.type == "fone" ||
      this.type == "telefone"
    ) {
      // Telefone (fixo, 8 digitos + ddd)
      return [
        "(",
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ];
    } else if (
      this.type == "mobile-phone" ||
      this.type == "mobile" ||
      this.type == "mobilephone" ||
      this.type == "celular"
    ) {
      // Telefone (celular, 9 digitos + ddd)
      return [
        "(",
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ];
    } else if (this.type == "cpf") {
      // CPF
      return [
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/
      ];
    } else if (this.type == "cnpj") {
      // CNPJ
      return [
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/
      ];
    } else if (
      this.type == "money" ||
      this.type == "currency" ||
      this.type == "dinheiro"
    ) {
      // Monetário
      return moneyMask;
    } else if (this.type == "percent" || this.type == "percentual") {
      // Percentual
      return percentMask;
    } else if (this.type == "email") {
      // return emailMask;
    }

    return null;
  }

  getPipe() {
    if (this.type == "email") {
      // return autoCorrectedDatePipe;
    }

    return null;
  }

  getInternalComponentId(): string {
    return "internal_" + this.componentId;
  }

  onFlagChange($event) {

  }
}
