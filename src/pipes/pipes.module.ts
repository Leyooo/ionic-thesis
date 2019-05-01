import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
//import { RelativeTimePipe } from './relative-time/relative-time';
@NgModule({
	declarations: [SearchPipe],
    //RelativeTimePipe],
	imports: [],
	exports: [SearchPipe]
    //RelativeTimePipe]
})
export class PipesModule {}
