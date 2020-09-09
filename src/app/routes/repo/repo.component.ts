import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GithubService } from 'src/app/shared/services/github.service';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent implements OnInit {

  username: string;
  reponame: string;
  repo: any;
  commits: any = [];
  commitPage: number = 1;
  commitLoading: boolean = false;
  commitHasMore: boolean = true;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private api: GithubService) { }

  ngOnInit(): void {
    this.username = this.activatedRouter.snapshot.params.username;
    this.reponame = this.activatedRouter.snapshot.params.reponame;
    this.api.repo(this.username, this.reponame).subscribe((res: any) => {
      this.repo = res;
    }, err => {
      console.error(err);
    });
  }

  loadCommits() {
    if (!this.commitHasMore) {
      return;
    }
    this.commitLoading = true;
    this.api.commits(this.username, this.reponame, this.commitPage).subscribe((res: any) => {
      if (res.length == 0) {
        this.commitHasMore = false;
      } else {
        this.commits = [...this.commits, ...res];
        this.commitPage++;
      }
    }, err => {
      console.error(err);
    }, () => {
      this.commitLoading = false;
    });
  }

  parseDate(val: string) {
    return new Date(Date.parse(val)).toLocaleString();
  }

}
