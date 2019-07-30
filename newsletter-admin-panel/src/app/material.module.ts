
import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatBadgeModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatTabsModule,
  MatSidenavModule,
} from '@angular/material';

const arrayModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatBadgeModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatTabsModule,
  MatSidenavModule,
];

@NgModule({
  imports: arrayModules,
  exports: arrayModules
})

export class MaterialModule { }
