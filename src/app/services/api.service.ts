import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  shortenLink(toPost){
    let url = "/api/LinkShortener";
    return this.http.post(url,toPost)
  }

  expandLink(link):any{
    let url = "/api/LinkShortener/" + link;
    return this.http.get(url)
  }

  getAllLinks():any{
    let url = "/api/LinkShortener";
    return this.http.get(url)
  }
}
