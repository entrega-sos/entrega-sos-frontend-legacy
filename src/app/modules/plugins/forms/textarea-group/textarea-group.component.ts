import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ElementRef,
  AfterContentChecked,
  AfterViewInit
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
// import * as DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

declare var $: any;

// Função sem conteudo, apenas para nao dar null pointer no call das referencias.
const noop = () => { };

// Esta funcao global está definida em app.js, fora do escopo do typescript. Esta aqui apenas para nao dar erro de compilação.
var handleInput: any;

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextAreaGroupComponent),
  multi: true
};

@Component({
  selector: "textarea-group",
  templateUrl: "./textarea-group.component.html",
  styleUrls: ["./textarea-group.component.scss"],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TextAreaGroupComponent
  implements OnInit, ControlValueAccessor, AfterContentChecked, AfterViewInit {
  // public Editor = DecoupledEditor;

  public config = {
    language: 'de'
  };

  public onReady(editor) {
    editor.ui.view.editable.element.parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.view.editable.element
    );
  }

  // Texto de ajuda, exibido abaixo do input
  @Input()
  help: string;

  // Texto do label exibido acima do input
  @Input()
  label: string;

  // Largura , de 1 a 12, para o grid system.
  @Input()
  width: number = 3;

  // Numero de linhas no textarea
  @Input()
  linhas: number = 4;

  // Indica se o input estará desabilitado
  @Input()
  disabled: boolean = false;

  // Indica se o CKEditor será aplicado
  @Input()
  ckeditor: boolean = false;

  // Max caracteres do input
  @Input()
  max: number;

  @Input()
  classLabel: string;

  @Input()
  obrigatorio: boolean = false;

  @Input()
  infoText: string;

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

  constructor(private el: ElementRef) { }

  ngOnInit() { }

  ngAfterViewInit() {
    $(".a-tooltip").tooltip({
      trigger: "hover"
    });
  }

  ngAfterContentChecked() {
    this.changeModel();
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
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
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
}
