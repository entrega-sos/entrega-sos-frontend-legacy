import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toogle',
  templateUrl: './toogle.component.html',
  styleUrls: ['./toogle.component.scss']
})
export class ToogleComponent implements OnInit {

  @Input() color: string = 'info';

  @Input() rounded = false;

  @Output() onChange: EventEmitter<boolean> = new EventEmitter();

  @Input() checked: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toogleChecked() {
    this.checked = !this.checked;

    this.onChange.emit(this.checked);
  }
}
