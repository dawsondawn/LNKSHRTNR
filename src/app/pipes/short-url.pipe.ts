import { Pipe, PipeTransform } from '@angular/core';
import { LinkService } from '../services/link.service';

@Pipe({
  name: 'shortUrl'
})
export class ShortUrlPipe implements PipeTransform {

  constructor(public linkService: LinkService){}

  transform(url: string, ...args: unknown[]): string {
    if(url){
      const len = url.length;

      if(len > 30 && url.includes("http")) {
        let numberId = (~(new Date()) / 100);
        numberId = numberId < 0 ? numberId * -1 : numberId;
        let Id = (Math.floor(numberId) + Math.ceil(Math.random() * 100000000000)).toString();
  
        let splitted = url.split("//");
        let domain = splitted[1].split("/")
        let shortened;

        if(url.includes("www")){
          shortened = splitted[0] + '//' + domain[0].substring(4,7) + '.' + domain[0].substring(8, 10) + '/' + Id;          
        }else{
          shortened = splitted[0] + '//' + domain[0].substring(0,3) + '.' + domain[0].substring(4, 6) + '/' + Id;          
        }

        this.linkService.shortenedLink = shortened;
        return shortened;
      }
      
      return url;
    }
    return url;
  }

}
