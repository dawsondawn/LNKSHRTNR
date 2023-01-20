import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let url = "/test/url";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AppModule, HttpClientTestingModule],
      providers:[
        {provide: HttpTestingController}      
      ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should shortenLink', () => {
    service.shortenLink('test').subscribe(data => {
      httpMock.expectOne({
        method:"POST",
        url: url
      })
    })
  })

  it('should expandLink', () => {
    service.expandLink('test').subscribe(data => {
      httpMock.expectOne({
        method:"GET",
        url: url
      })
    })
  })

  it('should getAllLinks', () => {
    service.getAllLinks().subscribe(data => {
      httpMock.expectOne({
        method:"GET",
        url: url
      })
    })
  })

});
