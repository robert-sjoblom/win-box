import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {
  constructor(private notification: NotificationService) { }
  ngOnInit() {

  }
  
  fetchFirebase() {
    this.notification.printStatus();
  }
}
