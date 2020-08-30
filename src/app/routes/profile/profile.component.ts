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
  repos: any = null;

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
    this.api.repos(this.username).subscribe((res: any) => {
      this.repos = res;
    }, err => {
      console.error(err);
    });
  }
}
