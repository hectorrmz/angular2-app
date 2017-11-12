import { Component, Input, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';

//models
import { Project, Issue } from '../../../models/Redmine';

@Component({
    selector: 'times-project',
    styleUrls: ['./project.component.scss'],
    templateUrl: './project.component.html'
})
export class ProjectComponent {

    @Input() projects: Array<Project>;
    @Input() issues: Array<Issue>;
    issue: Issue;

    @Output() change: EventEmitter<Issue> = new EventEmitter<Issue>();

    issueSelected(issue: Issue) {
        this.issue = issue;
        this.change.emit(this.issue);
    }

}

@Pipe({
    name: 'filterIssues'
})
export class FilterIssueByProject implements PipeTransform {
    transform(items: Array<Issue>, projectId: number): Array<Issue> {
        if(!items){
            return;
        }

        return items.filter(item => item.project.id === projectId);
    }
}