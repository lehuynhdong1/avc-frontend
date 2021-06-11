import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { StaffState, StaffStateModel } from './staff.state';

describe('Staff state', () => {
    let store: Store;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([StaffState])]
        }).compileComponents();
        store = TestBed.get(Store);
    }));

    it('should create an empty state', () => {
        const actual = store.selectSnapshot(StaffState.getState);
        const expected: StaffStateModel = {
            items: []
        };
        expect(actual).toEqual(expected);
    });

});
