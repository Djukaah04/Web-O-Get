import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDashedSelection]'
})
export class DashedSelectionDirective {

  @Input() condition: boolean

  constructor(private host: ElementRef) { }

  @HostListener('click') selected = () => {
    if(!this.condition) {
      this.host.nativeElement.style.backgroundColor = 'white'
      this.host.nativeElement.style.color = 'rgb(3, 35, 53)'
      this.host.nativeElement.style.border = 'none'
    }
    else {
      this.host.nativeElement.style.backgroundColor = 'rgb(3, 35, 53)'
      this.host.nativeElement.style.color = 'white'
      this.host.nativeElement.style.border = '1px dashed grey'
    }
  } 

}
