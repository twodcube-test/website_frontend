import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProfile from './profile.reducer';

export const selectProfileState = createFeatureSelector<fromProfile.State>(
  fromProfile.profileFeatureKey
);
