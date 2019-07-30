import { Component, OnInit } from '@angular/core';
import { NewsletterApiService} from '../services/newsletter-api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  newsletterForm: FormGroup;
  sportsArray: any[];
  entertainmentArray: any[];
  lifestyleArray: any[];


  constructor(
    public newsletterApiService: NewsletterApiService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.sportsArray = this.newsletterApiService.getSportStories();
    this.entertainmentArray = this.newsletterApiService.getEntertainmentStories();
    this.lifestyleArray = this.newsletterApiService.getLifestyleExtraStories();

    this.newsletterForm = this.formBuilder.group({
      sport: this.formBuilder.array(this.sportsArray),
      entertainment: this.formBuilder.array(this.entertainmentArray),
      lifestyle: this.formBuilder.array(this.lifestyleArray)
    });
  }

  onSubmit() {
    alert('TEST');
  }
}
