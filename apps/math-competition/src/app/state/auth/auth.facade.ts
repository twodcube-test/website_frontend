import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { forgotPassword, initAuth, login, logout, register } from './auth.actions'
import { selectLoading, selectLoginError, selectUID } from './auth.selectors'

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  loginError$ = this.store$.pipe(select(selectLoginError))
  loading$ = this.store$.pipe(select(selectLoading))
  uid$ = this.store$.pipe(select(selectUID))

  init() {
    this.store$.dispatch(initAuth())
  }

  login({ email, password }: { email: string; password: string }) {
    this.store$.dispatch(login({ email, password }))
  }

  register({ email, password }) {
    this.store$.dispatch(register({ email, password }))
  }

  forgotPassword({ email }) {
    this.store$.dispatch(forgotPassword({ email }))
  }

  logout() {
    this.store$.dispatch(logout())
  }

  constructor(private store$: Store<any>) {}
}
