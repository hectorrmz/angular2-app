import { Component } from '@angular/core';

//services
import { RedMineService } from '../services/redmine.service';
import { AuthHelper } from '../services/auth-helper.service';

//models
import { Project, Issue } from '../models/Redmine';
import { CalendarHelper } from '../services/calendar-helper.service';
import { Time } from '../models/Calendar';

@Component({
    selector: 'times-entry',
    templateUrl: './times-entry.component.html'
})
export class TimesEntryComponent {

    projects: Array<Project>;
    issues: Array<Issue>;
    entries: Array<Time>;

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

    }

    getProjects() {
        this.redmineService.getProjects().finally(() => console.log('Projects Called!'))
            .subscribe((response: any) => this.projects = response.projects);
    }

    getIssues() {
        this.redmineService.getIssues().finally(() => console.log('Issues Called!'))
            .subscribe((response: any) => this.issues = response.issues);
    }

    getTimes(issueId: number) {

        let today = new Date();

        let currentMont = today.getMonth();
        let currentYear = today.getFullYear();

        let lastDayInMonth = this.calendarHelper.daysInMonth(currentMont, currentYear);

        let dateRange = `><${currentYear}-${currentMont + 1}-01|${currentYear}-${currentMont + 1}-${lastDayInMonth}`;

        this.redmineService.getTimeEntries(issueId, dateRange).finally(() => console.log('Issues Called!'))
            .subscribe((response: any) => this.entries = response.time_entries);
    }

    setIssue(issue: Issue) {

        this.issueId = issue.id;

        this.authHelper.setIssueId(this.issueId);
        this.getTimes(this.issueId);

    }

}