import { Pipe, PipeTransform } from '@angular/core';
import { NotificationIconMapper, NotificationType } from '../../models/';
import { UserNotificationReadDto } from '@shared/api';

@Pipe({ name: 'notificationIcon' })
export class NotificationIconPipe implements PipeTransform {
  transform({ type, message }: UserNotificationReadDto) {
    let iconName = NotificationIconMapper[type as NotificationType] ?? NotificationIconMapper.Issue;
    const active = message?.includes('assign');
    const negative = message?.includes('remove');
    if (active) iconName = iconName.replace('primary', 'success');
    if (negative) iconName = iconName.replace('primary', 'error');
    return `assets/adc/icons/${iconName}.svg#${iconName}`;
  }
}
