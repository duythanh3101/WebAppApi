import { createFeatureSelector, createSelector } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromFile from '../../reducers/file.reducers';
export const selectFileState = createFeatureSelector<fromFile.FileEntityState>(
    fromFile.fileFeatureKey,
);
export const selectFiles = createSelector(
    selectFileState,
    (state: fromFile.FileEntityState) => state.files
);