import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Injectable, inject } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection = 'users';

  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  // *** INSCRIPTION UTILISATEUR ***
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

  // *** CONNEXION UTILISATEUR ***
  async login(email: string, password: string): Promise<void> {
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
      // Vérifie si le mot de passe fourni correspond au mot de passe haché
      if (!bcrypt.compareSync(password, hashedPassword)) { throw 'IncorrectPassword'; }
    } catch (error) { throw error; }
  }

  // *** DÉCONNEXION UTILISATEUR ***
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }
}
