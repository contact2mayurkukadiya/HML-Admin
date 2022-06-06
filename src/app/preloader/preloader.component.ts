import { Component, OnInit, EventEmitter, 
  trigger, state, style, animate, transition } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
  
})
export class PreloaderComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }
  
}
