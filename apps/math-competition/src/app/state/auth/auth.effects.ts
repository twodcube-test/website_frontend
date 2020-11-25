import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, exhaustMap, map, tap } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth'
import { authenticated, forgotPassword, initAuth, login, loginError, logout, notAuthenticated, register } from './auth.actions'
import { from, of } from 'rxjs'
import { Router } from '@angular/router'

@Injectable()
export class AuthEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuth),
      exhaustMap(() => this.afAuth.authState),
      map((x) => {
        if (x) {
          return authenticated({ uid: x.uid })
        } else {
          return notAuthenticated()
        }
      })
    )
  )

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        exhaustMap(({ email, password }) =>
          from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
            map(() => {
              return of(this.router.navigate(['/waiting']))
            }),
            catchError((error) => of(loginError({ error })))
          )
        )
      ),
    { dispatch: false }
  )

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        exhaustMap(() => {
          return from(this.afAuth.signOut())
        }),
        tap(() => {
          return this.router.navigate(['/login'])
        })
      ),
    { dispatch: false }
  )

  register$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(register),
        exhaustMap(({ email, password }) => {
          return of(this.afAuth.createUserWithEmailAndPassword(email, password))
        }),
        tap(() => {
          return this.router.navigate(['/home'])
        })
      ),
    { dispatch: false }
  )

  forgotPassword$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(forgotPassword),
        exhaustMap(({ email }) => {
          return of(this.afAuth.sendPasswordResetEmail(email))
        })
      ),
    { dispatch: false }
  )

  constructor(private actions$: Actions, private afAuth: AngularFireAuth, private router: Router) {}
}
