import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTeam from './team.reducer';

export const selectTeamState = createFeatureSelector<fromTeam.State>(
  fromTeam.teamFeatureKey
);
