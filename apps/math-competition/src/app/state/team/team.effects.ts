import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as TeamActions from './team.actions';



@Injectable()
export class TeamEffects {

  loadTeams$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(TeamActions.loadTeams),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => TeamActions.loadTeamsSuccess({ data })),
          catchError(error => of(TeamActions.loadTeamsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
