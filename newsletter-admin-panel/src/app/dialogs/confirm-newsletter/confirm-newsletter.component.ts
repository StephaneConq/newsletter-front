import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-newsletter',
  templateUrl: './confirm-newsletter.component.html',
  styleUrls: ['./confirm-newsletter.component.scss']
})
export class ConfirmNewsletterComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmNewsletterComponent>
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
