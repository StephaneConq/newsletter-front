import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Story} from '../models/story';

@Injectable({
  providedIn: 'root'
})
export class NewsletterApiService {
  constructor(private http: HttpClient) { }

  public getStoriesByCategory(category: string) {
    return this.http.get<Story[]>(`${environment.apiUrl}/api/news?category=${category}`);
  }

  public sendStories(infos: object) {
    return this.http.post(`${environment.apiUrl}/api/mailchimp/submit`, infos);
  }
}
