import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShortUrlPipe } from '../pipes/short-url.pipe';
import { LinkService } from '../services/link.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, OnDestroy {

  shortenInput = '';
  expandInput = '';
  result='';
  toClear = false;
  dataSource;

  displayedColumns = ['link', 'shortURL'];
  
  sub1;sub2;sub3;sub4;

  constructor(
    public shortUrlPipe: ShortUrlPipe, 
    public linkService: LinkService
  ) { }

  ngOnInit(): void {
    this.sub1 = this.linkService.getAllLinks().subscribe(data => {
      this.dataSource = data;
    })
    
  }

  onSubmit(type:string){
    if(type == "shorten"){
      if(this.shortenInput.length > 30){
        console.log('link to shorten: ',this.shortenInput);
        console.log("shortened:", this.linkService.shortenedLink)

        this.sub2 = this.linkService.shortenLink(this.shortenInput,this.linkService.shortenedLink).subscribe(data => {
          this.onClear();
        })
      }
    }else{
      if(this.expandInput.length > 0){
        let toGet = this.expandInput.toString();   
 
        console.log('link to expand: ',toGet);   
        this.sub3 = this.linkService.getLink(toGet).subscribe(data=>{
          this.result = data;
        });

        this.toClear = true;
      }
    }
  }

  onClear(){
    this.toClear = false;
    this.shortenInput = '';
    this.expandInput = '';
    this.result = '';
  }

  onTabChange(tab){
    console.log(tab);

    this.toClear = false;
    this.shortenInput = '';
    this.expandInput = '';
    this.result = '';

    if(tab.index == 0){
      this.sub3 = this.linkService.getAllLinks().subscribe(data => {
        this.dataSource = data;
        console.log(this.dataSource);
      })
    }
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe()
    this.sub3.unsubscribe()
  }

}
