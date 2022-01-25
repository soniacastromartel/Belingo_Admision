/* eslint-disable @typescript-eslint/member-ordering */
import { Directive, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]',
})
export class HideHeaderDirective implements OnInit {
  @Input('appHideHeader') toolbar: any;

  private toolbarHeight = 44;

  constructor(private renderer: Renderer2, private domCtrl: DomController) {}

  ngOnInit() {
    // console.log('test: ', this.toolbar);

    this.toolbar = this.toolbar.el;

    this.domCtrl.read(() => {
      this.toolbarHeight = this.toolbar.clientHeight;
    });
  }

@HostListener('ionScroll', ['$event']) onContentScroll($event) {

  const scrollTop= $event.detail.scrollTop;
// eslint-disable-next-line prefer-const
// let newPosition = (scrollTop/ 5);
// console.log(scrollTop/5);
// console.log(this.toolbarHeight);

  // if(newPosition < this.toolbarHeight){
  //   newPosition = -this.toolbarHeight;
  //   console.log(newPosition);
  // }

  // eslint-disable-next-line prefer-const
  // let newOpacity= 1- (newPosition /-this.toolbarHeight);

  if (scrollTop >=50){
    this.domCtrl.write(()=>{
      this.renderer.setStyle(this.toolbar, 'top','-76px');
      this.renderer.setStyle(this.toolbar, 'opacity','0.3');
    });
  } else {
    this.domCtrl.write(()=>{
      this.renderer.setStyle(this.toolbar, 'top','20px' );
      this.renderer.setStyle(this.toolbar, 'opacity','1');
    });
  }



  // console.log(scrollTop);
}

}
