import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { DocumentData, Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection = 'users';

  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private firestore: Firestore = inject(Firestore);

  // *** Sign up***
  async register(email: string, password: string, confirmPassword: string, displayName: string): Promise<void> {
    try {
      if (password !== confirmPassword) { throw "PasswordDontMatch"; }
      // Crée l'utilisateur dans Firebase Authentication
      const userCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      // Hache le mot de passe avant de le sauvegarder dans Firestore
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Ajoute l'utilisateur dans la collection Firestore `users`
      const userId = userCredential.user.uid;
      const userRef = doc(this.firestore, `${this.usersCollection}/${userId}`);
      await setDoc(userRef, {
        uid: userId,
        email: email,
        displayName: displayName,
        hashedPassword: hashedPassword,
        createdAt: new Date().toISOString()
      });
    } catch (error) { throw error; }
  }

  // *** auth user***
  async login(email: string, password: string): Promise<DocumentData> {
    try {
      // Connexion via Firebase Authentication
      const userCredential: UserCredential = await signInWithEmailAndPassword(this.auth, email, password);

      // Vérifie si l'utilisateur existe dans Firestore
      const userId = userCredential.user.uid;
      const userRef = doc(this.firestore, `${this.usersCollection}/${userId}`);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) { throw 'UserNotFound'; }
      const userData = userSnapshot.data();
      const hashedPassword = userData?.['hashedPassword'];
      if (!bcrypt.compareSync(password, hashedPassword)) { throw 'IncorrectPassword'; }
      return userData;
    } catch (error) { throw error; }
  }

  // *** Log out user***
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      localStorage.clear();

      this.router.navigate(['welcome']);
    } catch (error) { throw error; }
  }

}
