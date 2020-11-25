import { Action, createReducer, on } from '@ngrx/store'
import * as TeamActions from './team.actions'

export const teamFeatureKey = 'team'

export interface State {
  state: string
}

export const initialState: State = { state: '' }

export const reducer = createReducer(
  initialState,

  on(TeamActions.loadTeams, (state) => state),
  on(TeamActions.loadTeamsSuccess, (state, action) => state),
  on(TeamActions.loadTeamsFailure, (state, action) => state)
)
