import { Component } from '@angular/core';

//services
import { RedMineService } from '../services/redmine.service';
import { AuthHelper } from '../services/auth-helper.service';

//models
import { Project, Issue } from '../models/Redmine';

@Component({
    selector: 'times-entry',
    templateUrl: './times-entry.component.html'
})
export class TimesEntryComponent {

    projects: Array<Project>;

    issues: Array<Issue>;
    issue: Issue;

    constructor(private redmineService: RedMineService, private authHelper: AuthHelper) {

        if (this.authHelper.getIssueId() > 0) {

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

    getTimes(issueId: number, dateRange: string) {
        this.redmineService.getTimeEntries(issueId, dateRange).finally(() => console.log('Issues Called!'))
            .subscribe((response: any) => this.issues = response.issues);
    }

    setIssue(issue: Issue) {
        this.issue = issue;
        this.authHelper.setIssueId(issue.id);
    }

}