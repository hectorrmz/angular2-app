import { Component } from '@angular/core';

//services
import { RedMineService } from '../services/redmine.service';
import { AuthHelper } from '../services/auth-helper.service';

//models
import { Project, Issue, Activity, TimeEntry } from '../models/Redmine';
import { CalendarHelper } from '../services/calendar-helper.service';
import { Time } from '../models/Calendar';

@Component({
  selector: 'times-entry',
  templateUrl: './times-entry.component.html',
})
export class TimesEntryComponent {
  projects: Array<Project>;
  issues: Array<Issue>;
  activities: Array<Activity>;
  entries: Array<TimeEntry>;
  outlookData: Time[] = [];

  issueId: number;

  constructor(
    private redmineService: RedMineService,
    private authHelper: AuthHelper,
    private calendarHelper: CalendarHelper
  ) {
    this.issueId = this.authHelper.getIssueId();

    if (this.issueId) {
      this.getTimes(this.issueId);
    } else {
      this.getProjects();
      this.getIssues();
    }

    this.getActivities();
  }

  getProjects() {
    this.redmineService
      .getProjects()
      .finally(() => console.log('Projects Called!'))
      .subscribe((response: any) => (this.projects = response.projects));
  }

  getIssues() {
    this.redmineService
      .getIssues()
      .finally(() => console.log('Issues Called!'))
      .subscribe((response: any) => (this.issues = response.issues));
  }

  getActivities() {
    this.redmineService
      .getActivities()
      .finally(() => console.log('Activities Called!'))
      .subscribe(
        (response: any) => (this.activities = response.time_entry_activities)
      );
  }

  getTimes(issueId: number) {
    let today = new Date();

    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    let lastDayInMonth = this.calendarHelper.daysInMonth(currentMonth, currentYear);

    let month: any = currentMonth > 9 ? currentMonth + 1 : '0' + (currentMonth + 1);

    let dateRange = `><${currentYear}-${month}-01|${currentYear}-${month}-${lastDayInMonth}`;

    this.redmineService
      .getTimeEntries(issueId, dateRange)
      .finally(() => console.log('Times Called!'))
      .subscribe((response: any) => {
        this.entries = response.time_entries;
      }
      );
  }

  setIssue(issue: Issue) {
    this.issueId = issue.id;

    this.authHelper.setIssueId(this.issueId);
    this.getTimes(this.issueId);
  }

  importOutlookEvents(events: Time[]){
    this.outlookData = events;
  }
}
