import { Component, OnInit, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-my-account",
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: "./my-account.component.html",
})
export class MyAccountComponent implements OnInit {
  public userName: string = 'User';
  private service = inject(AuthService);

  constructor(public router: Router) {
  }

  ngOnInit() {}

  logout() {
    this.service.logout();
    this.router.navigateByUrl('/login');
  }
}
