import { Component, ChangeDetectionStrategy, Inject, ViewChild, ElementRef } from '@angular/core';
import { TuiDialog } from '@taiga-ui/cdk';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { Annotorious } from '@recogito/annotorious';
export interface ImageDialogComponentParams {
  dataUrl: string;
  name: string;
}

@Component({
  selector: 'adca-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageDialogComponent {
  @ViewChild('currentImage', { static: true }) currentImage: ElementRef<HTMLImageElement>;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialog<{ data: ImageDialogComponentParams }, number>
  ) {}

  ngOnInit() {
    console.log(this.currentImage);
    console.log(Annotorious);

    const anno = new Annotorious({ image: 'this-unique', readonly: true });
    console.log(anno);
  }

  complete(response: number) {
    this.context.completeWith(response);
  }
}
