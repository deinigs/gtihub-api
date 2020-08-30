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

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private api: GithubService) { }

  ngOnInit(): void {
    console.log(this.activatedRouter);
    this.api.profile(this.activatedRouter.snapshot.params.username).subscribe((res: any) => {
      this.profile = res;
    }, err => {
      console.error(err);
    });
  }
}
