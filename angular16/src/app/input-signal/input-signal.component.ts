import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input-signal',
  templateUrl: './input-signal.component.html',
  styleUrls: ['./input-signal.component.scss']
})
export class InputSignalComponent implements OnChanges{
  @Input() normalInput : any
  @Input() test1 : any
  @Input() test2 : any
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
}
