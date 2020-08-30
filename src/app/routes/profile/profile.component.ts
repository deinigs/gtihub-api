import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GithubService } from 'src/app/shared/services/github.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any = null;
  username: string = null;
  repos: any = [];
  repoPage: number = 1;
  repoLoading: boolean = false;
  repoHasMore: boolean = true;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private api: GithubService) { }

  ngOnInit(): void {
    console.log(this.activatedRouter);
    this.api.profile(this.activatedRouter.snapshot.params.username).subscribe((res: any) => {
      this.profile = res;
      this.username = res.login;
    }, err => {
      console.error(err);
    });
  }

  loadRepos() {
    if (!this.repoHasMore) {
      return;
    }
    this.repoLoading = true;
    this.api.repos(this.username, this.repoPage).subscribe((res: any) => {
      if (res.length == 0) {
        this.repoHasMore = false;
      } else {
        this.repos = [...this.repos, ...res];
        this.repoPage++;
      }
    }, err => {
      console.error(err);
    }, () => {
      this.repoLoading = false;
    });
  }
}
