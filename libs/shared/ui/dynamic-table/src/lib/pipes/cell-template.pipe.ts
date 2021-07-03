import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cellTemplate' })
export class CellTemplatePipe implements PipeTransform {
  transform(obj: Record<string, unknown>, template: string): string {
    const matches = template.match(/#[\w.]+(?=\s)?/gi);

    if (!matches) return template;
    let result = template;
    matches.forEach((match) => {
      const prop = match.slice(1);
      const deepProps = prop.includes('.') ? prop.split('.') : [prop];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = deepProps.reduce((acc: any, prop: string) => acc && acc[prop], obj);
      result = result.replace(match, value ?? '');
    });
    return result;
  }
}
