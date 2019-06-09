import { Component, OnInit } from '@angular/core';
import { DebugAbstractClass } from '../../classes/debug';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent extends DebugAbstractClass implements OnInit {
  protected tag = '';
  constructor() {
    super();
    console.log('playground');
  }

  ngOnInit() {}
}
