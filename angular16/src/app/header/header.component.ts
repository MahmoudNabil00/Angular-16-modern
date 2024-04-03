import { AfterViewInit, Component, ElementRef, HostListener, inject, Renderer2, ViewChild } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { GeneralService } from '../general.service';
import {ScrollDispatcher} from '@angular/cdk/scrolling'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit{

  constructor(public service:GeneralService){}
  isBottom :boolean = false
  private viewportScroller = inject(ViewportScroller)
  private scrollDispatcher = inject(ScrollDispatcher)
  private render2 = inject(Renderer2)
  @ViewChild('header') header: ElementRef<HTMLElement>
  // @HostListener('window:scroll',['$event'])
  // onScroll(event:Event){
  //   console.log('iam work')
  // }
  ngAfterViewInit(): void {
    this.render2.addClass(this.header.nativeElement,'dark-nav')
    this.scrollDispatcher.scrolled().subscribe(()=>{
      this.onScroll()

    })
  }
  onScroll(){
    const scrollY = this.viewportScroller.getScrollPosition()[1] 
    let shouldAddDark = scrollY > 10
    this.render2.removeClass(this.header.nativeElement,shouldAddDark ? 'shadow-nav' : 'dark-nav')
    this.render2.addClass(this.header.nativeElement,shouldAddDark ? 'dark-nav' : 'shadow-nav')
  }
  
}

