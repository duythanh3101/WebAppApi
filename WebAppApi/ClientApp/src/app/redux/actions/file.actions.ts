import { createAction } from '@ngrx/store';
import { IFileEntity } from 'src/app/entities/IFileEntity';

export const addFile = createAction('[IFileEntity] ADD_FILE', (newfile: IFileEntity) => ({newfile}));
export const deleteFile = createAction('[IFileEntity] DELETE_FILE');
export const updateFile = createAction('[IFileEntity] UPDATE_FILE');
export const reset = createAction('RESET');