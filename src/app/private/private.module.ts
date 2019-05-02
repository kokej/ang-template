import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { PrivateRoutingModule } from './private-routing.module';

@NgModule({
    imports: [ CommonModule, PrivateRoutingModule ],
    declarations: [ PrivateComponent ]
})
export class PrivateModule {}
