import { OnInit } from '@angular/core';

export abstract class DebugAbstractClass implements OnInit {
  protected tag: string;

  constructor() {
    console.log('debug class');
  }

  ngOnInit() {}
}
