import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent implements OnInit {

  username: string = "";

  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  gotoProfile() {
    if (this.username) {
      this.router.navigateByUrl(`/profile/${this.username}`);
    } else {
      console.error("No user selected!");
    }
  }

}
