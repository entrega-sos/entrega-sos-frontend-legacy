
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';



@Directive({
    selector: '[ngModel][debounce]',
})
export class DebounceDirective {
    @Output() public onDebounce = new EventEmitter<any>();

    @Input('debounce') public debounceTime: number = 500;

    private isFirstChange: boolean = true;

    constructor(public model: NgControl) {
    }

    ngOnInit() {
        this.model.valueChanges.pipe(
            debounceTime(this.debounceTime),
            distinctUntilChanged(),)
            .subscribe(modelValue => {
                if (this.isFirstChange) {
                    this.isFirstChange = false;
                } else {
                    this.onDebounce.emit(modelValue);
                }
            });
    }
}
