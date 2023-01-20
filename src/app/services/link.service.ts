import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(public webApi:ApiService) { }

  public shortenedLink = '';

  shortenLink(input,shortened){
    return new Observable(observer => {
      let numberId = (~(new Date()) / 100);
      numberId = numberId < 0 ? numberId * -1 : numberId;
      let Id = (Math.floor(numberId) + Math.ceil(Math.random() * 100000000000)).toString();
      let toPost = {
        Id: Id,
        Link: input,
        shortenedLink: shortened
      }
      this.webApi.shortenLink(toPost).subscribe(data => {
        observer.next();
      })
    })
  }

  getLink(link): Observable<string>{
    return new Observable(observer => {
      let formatUrl = link.replace(new RegExp('/', 'gi'), '%2f')
      console.log("formatURL", formatUrl);

      this.webApi.expandLink(formatUrl).subscribe(ret => {
        console.log("return from api", ret);
        if(ret.data.Items.length > 0){
          observer.next(ret.data.Items[0].Link)
        }else{
          observer.next("Link does not exist")
        }
      })

    })
  }

  getAllLinks(): Observable<any[]>{
    return new Observable(observer => {
      this.webApi.getAllLinks().subscribe(ret => {
        if(ret.data.Items.length > 0){
          let data = ret.data.Items;
          let result = [];
          console.log('return from api', data);

          data.forEach(link => {
            result.push({
              link:link.Link,
              short:link.shortenedLink
            })
          })

          observer.next(result);
        }
      })
    })
  }

}
