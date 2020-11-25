import { Action, createReducer, on } from '@ngrx/store'
import * as ProfileActions from './profile.actions'

export const profileFeatureKey = 'profile'

export interface State {
  state: string
}

export const initialState: State = { state: '' }

export const reducer = createReducer(
  initialState,

  on(ProfileActions.loadProfiles, (state) => state),
  on(ProfileActions.loadProfilesSuccess, (state, action) => state),
  on(ProfileActions.loadProfilesFailure, (state, action) => state)
)
