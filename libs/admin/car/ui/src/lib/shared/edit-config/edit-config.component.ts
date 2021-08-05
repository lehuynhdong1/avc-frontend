import { HttpClient } from '@angular/common/http';
import { CAR_CONFIG_SCHEMA, CarConfig } from './config.model';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { Store } from '@ngxs/store';
import { Empty, ShowNotification } from '@shared/util';
import { RxState } from '@rx-angular/state';
import { Observable, Subject } from 'rxjs';
import { TuiNotification } from '@taiga-ui/core';

@Component({
  selector: 'adca-edit-config',
  templateUrl: './edit-config.component.html',
  styleUrls: ['./edit-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class EditConfigComponent implements OnInit {
  readonly EDITOR_OPTIONS: JsonEditorOptions = {
    ...new JsonEditorOptions(),
    enableSort: false,
    enableTransform: false,
    sortObjectKeys: false,
    history: false,
    name: 'Car Configuration',
    schema: CAR_CONFIG_SCHEMA,
    expandAll: true
  };

  @Input() configUrl: string;
  @Output() save = new EventEmitter<File>();
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  config$!: Observable<CarConfig>;

  /* Actions */
  save$ = new Subject();

  constructor(private store: Store, private http: HttpClient, private state: RxState<Empty>) {}

  ngOnInit() {
    this.config$ = this.http.get<CarConfig>(this.configUrl);
    this.state.hold(this.save$, () => {
      const editorJson = this.editor.getEditor();
      editorJson.validate();
      const errors = editorJson.validateSchema.errors;
      if (errors && errors.length > 0)
        this.store.dispatch(
          new ShowNotification({
            message:
              'Your configuration is in wrong format. Please fix the warning and submit again.',
            options: { label: 'Update Configuration failed', status: TuiNotification.Error }
          })
        );
      else {
        const content = editorJson.getText();
        const blob = new Blob([content], { type: 'text/plain' });
        const file = new File([blob], 'config.json', { type: 'application/json' });
        this.save.emit(file);
      }
    });
  }
}
