import { NgModule } from '@angular/core';
import { ListingState } from './listing/listing.state';
import { NgxsModule } from '@ngxs/store';
import { AccountsService } from '@shared/api';

@NgModule({
  imports: [NgxsModule.forFeature([ListingState])],
  providers: [AccountsService]
})
export class DataAccessModule {}
