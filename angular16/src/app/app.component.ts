import { AfterViewInit, Component, ComponentRef, ElementRef, inject, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { mergeMap, of } from 'rxjs';
import { test } from './test';
import { GeneralService } from './general.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit{
  constructor(public service : GeneralService){}
  @ViewChild('header') header : HeaderComponent
  @ViewChild('issue') issue : ElementRef<HTMLElement>
  render2 = inject(Renderer2)
  heightOfIssue:any
  ngAfterViewInit(): void {
    console.log(this.header.header.nativeElement.offsetHeight);
    this.heightOfIssue = this.header.header.nativeElement.offsetHeight
    this.render2.setStyle(this.issue.nativeElement,'padding-top',this.heightOfIssue+'px')
  }
  // data1$:any = of([1,2,3])
  // data2$:any = of(['a','b','c'])
  // result : any
  private privateProperty = 'Mahmoud'
  get property(){
    return `Your name is ${this.privateProperty}`   
  }
  ngOnInit(): void {
    // this.data1$.pipe(mergeMap((num:any) => this.data2$))
    // console.log('iam work !')
    test(5)
  }
  title = 'angularLastVersion';
  catchWhichEmit(componentRef:any){
    if(true){
      componentRef.testActivateFromAppComponent.subscribe((res:any)=>console.log(res));
    }else{
      componentRef.amerOutlet.subscribe((res:any)=>console.log(res));
    }
  }
}
