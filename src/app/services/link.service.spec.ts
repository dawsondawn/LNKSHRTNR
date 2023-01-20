import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { AppModule } from '../app.module';
import { ShortUrlPipe } from '../pipes/short-url.pipe';
import { ApiService } from './api.service';

import { LinkService } from './link.service';

describe('LinkService', () => {
  let service: LinkService;
  let shortURL: ShortUrlPipe

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AppModule],
      providers:[ApiService]
    });
    service = TestBed.inject(LinkService);
    shortURL = TestBed.inject(ShortUrlPipe)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should shortenLink',() => {
    let numberId = (~(new Date()) / 100);
    numberId = numberId < 0 ? numberId * -1 : numberId;
    let Id = (Math.floor(numberId) + Math.ceil(4 * 100000000000)).toString();
    let input = "https://www.mail.google.com/mail/u/0/#inbox/FMfcgzGrcFdzNMmbZVcrGzZJkJcTPCQc"
    let shortened = shortURL.transform(input);
    let toPost = {
      Id: Id,
      Link: input,
      shortenedLink: shortened
    }

    spyOn(Math,'random').and.returnValue(4)
    let spyShortenLinkAPI = spyOn(service.webApi,'shortenLink').and.returnValue(new Observable(observer => {observer.next()}))

    service.shortenLink(input,shortened).subscribe(data => {
      expect(spyShortenLinkAPI).toHaveBeenCalledOnceWith(toPost);
    })
  })

  it('should getLink',() => {
    let spyGetLinkkAPI = spyOn(service.webApi,'expandLink').and.returnValue(new Observable(observer => {
      let ret = {
        data:{
          Items:['test']
        }
      }
      observer.next(ret)
    }))

    let inputLink = "test/link"
    let formatURL = inputLink.replace(new RegExp('/', 'gi'), '%2f')

    service.getLink(inputLink).subscribe(data => {
      expect(spyGetLinkkAPI).toHaveBeenCalledOnceWith(formatURL);
    })
  })

  it('should getAllLinks',() => {
    let spyGetAllLinksAPI = spyOn(service.webApi,'getAllLinks').and.returnValue(new Observable(observer => {
      let ret = {
        data:{
          Items:['test']
        }
      }
      observer.next(ret)
    }))

    service.getAllLinks().subscribe(data => {
      expect(spyGetAllLinksAPI).toHaveBeenCalled();
    })
  })

});
