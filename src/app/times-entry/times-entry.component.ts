import { Component } from '@angular/core';

//services
import { RedMineService } from '../services/redmine.service';

//models
import { Project } from '../models/Project';
import { Issue } from '../models/Issue';

@Component({
    selector: 'times-entry',
    templateUrl: './times-entry.component.html'
})
export class TimesEntryComponent {

    projects: Array<Project>;

    issues: Array<Issue>;
    issue: Issue;

    constructor(private redmineService: RedMineService) {
        this.getProjects();
        this.getIssues();
    }

    getProjects() {
        this.redmineService.getProjects().finally(() => console.log('Projects Called!'))
            .subscribe((response: any) => this.projects = response.projects);
    }

    getIssues(){
        this.redmineService.getIssues().finally(() => console.log('Issues Called!'))
        .subscribe((response: any) => this.issues = response.issues);
    }

    setIssue(issue: Issue) {
        this.issue = issue;
        console.log(issue);
    }

}