import { Component, OnInit } from '@angular/core';
import { OutlookService } from './outlook.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'outlook',
  templateUrl: './outlook.component.html',
  styleUrls: ['./outlook.component.scss'],
})
export class OutlookComponent implements OnInit {
  code: string;
  constructor(
    private outlookService: OutlookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAuthCode();
  }
  getOutlookAuthorization() {
    this.outlookService.authorizeApp();
  }

  private getAuthCode(): void {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      if (this.code) {
        localStorage.setItem('code', this.code);
        this.outlookService.getToken().subscribe(
          res => {
            if (res.status === 200) {
              let response = JSON.parse(res._body);
              localStorage.setItem('access_token', response.access_token);
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }
}
