import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Time } from 'models/Calendar';
import { OutlookService, AuthHelper } from '../../../services';
import { Location } from '@angular/common';

@Component({
  selector: 'outlook',
  templateUrl: './outlook.component.html',
  styleUrls: ['./outlook.component.scss'],
})
export class OutlookComponent implements OnInit {
  @Output() outlookEventsImported = new EventEmitter<Time[]>();
  code: string;
  events: Time[] = [];
  isAuthorized: boolean = false;
  constructor(
    private outlookService: OutlookService,
    private route: ActivatedRoute,
    private authHelper: AuthHelper,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAuthCode();
    this.isAuthorized = (this.authHelper.getCode && this.authHelper.getMSToken() && true);
  }

  importOutlookCalendar() {
    this.outlookService.getCalendarView('2018-09-01', '2018-09-30').subscribe(res=>{

        let outlookData = res.value;

        outlookData.forEach(ev => {
          let date = new Date(ev.Start);
          this.events.push({
            title: ev.Subject,
            date: date.getDate(),
            duration: this.getEventDuration(ev.Start, ev.End),
            activity: {
              id: 10,
              name: 'Meeting'
            },
            isNew: true
          });
        });

        this.outlookEventsImported.emit(this.events);

    }, err=>{
      console.log(err);
    });
  }

  private getEventDuration(start: string, end:string): number{
      let startDate = new Date(start);
      let endDate = new Date(end);

      return (endDate.getTime() - startDate.getTime()) / 36e5;
  }

  private getAuthCode(): void {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      if (this.code) {
        this.authHelper.setCode(this.code);
        this.outlookService.getToken().subscribe(res => {
             this.authHelper.setMSToken(res.access_token);
             this.location.replaceState('');
             this.isAuthorized = true;
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }
}
