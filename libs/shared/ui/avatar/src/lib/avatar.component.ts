import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TuiSizeXXL, TuiSizeXS } from '@taiga-ui/core';

@Component({
  selector: 'adc-frontend-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() url: string | null | undefined = '';
  @Input() size: TuiSizeXS | TuiSizeXXL = 'm';
  @Input() placeholderImageAsset = 'assets/adc/icons/personCircleOutline.svg#personCircleOutline';
  @Input() placeholderClass = '';
}
