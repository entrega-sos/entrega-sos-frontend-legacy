import { NgModule, Component, Input, Output, ElementRef, forwardRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from "@angular/forms";

// Função sem conteudo, apenas para nao dar null pointer no call das referencias.
const noop = () => {
};

declare var $: any;

@Component({
    selector: 'file-upload',
    template: ` <input *ngIf="showFileNameInput" id="uploadFile" class="upload-file form-control" placeholder="Escolha o arquivo" [(ngModel)]="value" disabled="disabled" />
              <div class="fileUpload btn btn-primary btn-block">
                  <span>{{uploadButtonText}}</span>
                  <input type="file" class="upload" accept="*" (change)="changeListener($event)">
              </div>
              <button class="btn btn-danger btn-block">
                <i class="fa fa-trash"></i>
                Limpar
              </button>
              `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileUploadComponent),
            multi: true
        }
    ]
})
export class FileUploadComponent implements ControlValueAccessor {
    @Input() showFileNameInput: boolean;
    @Input() uploadButtonText: string;

    // Value interno (ngModel)
    private innerValue: any = '';

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    changeListener($event): void {
        // debugger; // uncomment this for debugging purposes
        this.readThis($event.target);
    }

    changeModel() {
        // Força o "change", durante o changeModel.
        let el = $(this.el.nativeElement).find(".form-control");

        if (this.value && this.value != "") {
            el.addClass('edited');
        } else {
            el.removeClass('edited');
        }
    }

    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    readThis(inputValue: any): void {
        // debugger; // uncomment this for debugging purposes
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.value = myReader.result;
        }
        myReader.readAsDataURL(file);
    }
}
