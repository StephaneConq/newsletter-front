import {Component, OnInit} from '@angular/core';
import {NewsletterApiService} from '../services/newsletter-api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../services/alert.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmNewsletterComponent} from "../dialogs/confirm-newsletter/confirm-newsletter.component";

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  newsletterForm: FormGroup;
  storiesByCategory: object = {};
  tlts: object = [];
  nextNewsletter: string;
  readonly categories = ['topstories', 'sports', 'entertainment', 'lifestyle'];
  readonly nbSendedByArticle = 3;
  readonly tltsText = 'tlts';
  send: object = {};
  isOnSubmit = false;

  constructor(
    public newsletterApiService: NewsletterApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    const qTab = [];
    this.initSend();
    this.newsletterApiService.getNextNewsletterDate().subscribe(date => {
      this.nextNewsletter = date['date'];
    });
    this.newsletterApiService.getTlts().subscribe(opinions => {
      this.tlts = opinions;
    })
    this.categories.forEach(category => {
      qTab.push(new Promise(resolve => {
        this.newsletterApiService.getStoriesByCategory(category).subscribe(arrayStories => {
          this.storiesByCategory[category] = arrayStories;
          resolve(arrayStories);
        });
      }));
    });
    Promise.all(qTab).then(() => {
      const tmpControls = {};
      for (const cat of this.categories) {
        this.storiesByCategory[cat].forEach((value, index) => {
            tmpControls[index] = [''];
        });
      }
      this.newsletterForm = this.formBuilder.group({
        sports: this.formBuilder.group(tmpControls),
        entertainment: this.formBuilder.group(tmpControls),
        lifestyle: this.formBuilder.group(tmpControls),
        topstories: this.formBuilder.group(tmpControls),
        tlts: this.formBuilder.group(tmpControls),
      });
    });
  }

  onSubmitModal() {
    const dialogRef = this.dialog.open(ConfirmNewsletterComponent, {
      width: '500px',
      height: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitNewsLetter();
      }
    });
  }

  submitNewsLetter() {
    this.isOnSubmit = true;
    const result = this.newsletterForm.value;
    let valid = true;
    let cpt = 0;
    let element;
    this.initSend();
    Object.keys(result).forEach(k => {
      cpt = 0;
      Object.keys(result[k]).forEach(i => {
        // console.log(result[k][i]);
        if (result[k][i] === true) {
          if (k === this.tltsText) {
            this.send[k].push(this.tlts[i]);
          } else {
            this.send[k].push(this.storiesByCategory[k][i]);
          }
          cpt++;
        }
      });
      if ((cpt !== this.nbSendedByArticle && k !== this.tltsText) || (cpt !== (this.nbSendedByArticle - 1) && k === this.tltsText)) {
        valid = false;
      }
      cpt = 0;
    });
    if (!valid) {
      this.alertService.clear();
      this.alertService.error(this.nbSendedByArticle
        + ' stories by category needs to be chosen and '
        + (this.nbSendedByArticle - 1)
        + ' opinions');
      this.initSend();
      setTimeout(() => {
        element = document.querySelector('#scrollId');
        element.scrollIntoView();
        this.isOnSubmit = false;
      });
    } else {
      this.newsletterApiService.sendStories(this.send).subscribe((success) => {
        this.alertService.success('The newsletter has been sent ');
        setTimeout(() => {
          element = document.querySelector('#scrollId');
          element.scrollIntoView();
          this.isOnSubmit = false;
        });
      }, (error) => {
        this.alertService.error('Error: ' + error);
        setTimeout(() => {
          element = document.querySelector('#scrollId');
          element.scrollIntoView();
          this.isOnSubmit = false;
        });
      });
    }
  }

  initSend() {
    this.categories.forEach(v => {
      this.send[v] = [];
    });
    this.send[this.tltsText] = [];
  }
}
