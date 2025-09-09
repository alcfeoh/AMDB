import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  exportAs: "highlight"
})
export class Highlight {

  color = "red";

  constructor() { }

}
