import { AuthSharedComponent } from "../components/auth-shared/auth-shared.component";
import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in-sign-up',
  standalone: true,
  imports: [AuthSharedComponent],
  templateUrl: './sign-in-sign-up.component.html',
  styleUrl: './sign-in-sign-up.component.scss'
})
export class SignInSignUpComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  isSignUp: WritableSignal<boolean> = signal(true);
  ngOnInit() {
    // Récupérer la donnée depuis la route
    this.route.data.subscribe(data => {
      this.isSignUp.set(data['signUp']);
    });
  }
}
