import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { ShortUrlPipe } from '../pipes/short-url.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PageComponent } from './page.component';
import { LinkService } from '../services/link.service';
import { Observable } from 'rxjs';

export class LinkServiceMock{
  getAllLinks(){
    return new Observable(observer => {
      observer.next([])
    })
  }
}

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let spyGetAllLinksResult;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
      declarations: [ PageComponent ],
      providers:[
        {provide: ShortUrlPipe},
        {provide: LinkService}
      ],
      imports:[AppModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    spyOn(component.linkService,'getAllLinks').and.returnValue(new Observable(observer => {
      spyGetAllLinksResult = [{data:'testData'}]
      observer.next(spyGetAllLinksResult);
    }))
    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should shorten', () => {
    component.shortenInput = "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrcFdzNMmbZVcrGzZJkJcTPCQc";
    let short = component.shortUrlPipe.transform(component.shortenInput);
    let less = short.length < component.shortenInput.length

    spyOn(component.linkService,'shortenLink').and.returnValues(new Observable(observer => {
      observer.next();
    }))

    component.onSubmit('shorten');
    expect(component.toClear).toBe(false);
    expect(component.shortenInput.length).toBe(0);
    expect(component.expandInput.length).toBe(0);
    expect(component.result.length).toBe(0);
    expect(less).toBeTrue();
  })

  it('should not shorten', () => {
    component.shortenInput = "https://fb.com";
    component.onSubmit('shorten');
    expect(component.toClear).toBeFalse();
  })

  it('should expand', () => {
    component.expandInput = "https://mai..g/345392124";
    let spyResult;

    spyOn(component.linkService,'getLink').and.returnValue(new Observable(observer => {
      spyResult = "result";
      observer.next(spyResult)
    }))

    component.onSubmit('expand');

    expect(spyResult).toBe(component.result);
  })

  it('should not shorten', () => {
    component.expandInput = "";
    component.onSubmit('expand');
    expect(component.toClear).toBeFalse();
  })

  it('should load onTabChange', () => {
    component.onTabChange({index:0});
    expect(component.dataSource).toEqual(spyGetAllLinksResult);
    component.onTabChange({index:1});
  })


});
