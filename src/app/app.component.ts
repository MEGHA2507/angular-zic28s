import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { forkJoin, zip } from 'rxjs';
import { DataService } from '../service/data.service';
// import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
  name = 'Angular';
  user = [];
  statuss = [];
  task = [];
  cardData = [];
  userFlag: boolean = false;
  // rerender = false;
  constructor(
    private http: HttpClient,
    private dataService: DataService,
    // private changeDetectorRef: ChangeDetectorRef
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    const users = this.dataService
      .get(`../assets/user.json`)
      .subscribe((data: any) => {
        this.user = data;
        this.userFlag = this.user.length > 0? true: false;
        console.log('user', this.user);
        // this.changeDetectorRef.detectChanges();
      });

    const status = this.dataService
      .get(`../assets/status.json`)
      .subscribe((res: any) => {
        this.statuss = res;
        console.log('status', this.statuss);
        // this.changeDetectorRef.detectChanges();
      });

    const tasks = this.dataService
      .get(`../assets/task.json`)
      .subscribe((res: any) => {
        this.task = res;
        console.log('task', this.task);
        // this.changeDetectorRef.detectChanges();
      });

      console.log(this.userFlag);

      this.formDataRended();
  }

  // ngAfterViewInit() {
  //   if (
  //     this.task.length > 0 &&
  //     this.user.length > 0 &&
  //     this.statuss.length > 0
  //   ) {
  //     // this.rerender = true;
  //     console.log(this.task, this.user, this.statuss);
  //     this.formDataRended();
  //   }
  // }

  formDataRended() {
    if (
      this.task.length > 0 &&
      this.user.length > 0 &&
      this.statuss.length > 0
    ) {
      this.task.forEach((tk) => {
        this.user.forEach((usr) => {
          if (tk.assignedTo === usr.id) {
            tk.assignedTo = usr.name;
          }
        });

        this.statuss.forEach((sta) => {
          if (tk.statusId === sta.id) {
            tk.statusId = sta.name;
          }
        });
      });
    }

    console.log(this.task);
  }
}
