import { createReducer, on } from '@ngrx/store';
import { FileEnum } from 'src/app/entities/enums/FileEnum';
import { IFileEntity } from 'src/app/entities/IFileEntity';
import { addFile, deleteFile, updateFile, reset } from '../actions/file.actions';

export const fileFeatureKey = 'fileRx';

export interface FileEntityState {
    files: IFileEntity[]
}

export const initialState: FileEntityState = {
    files: [
        {
          id: 1,
          name: 'Hihi',
          modified: '03/03/2021',
          modifiedBy: 'Thanh Duy Pham',
          subFolders: [],
          type: FileEnum.Folder,
          createAt: new Date('09/04/2021'),
          createBy: 'hohoho',
          parentId: 0,
          isNewFile: false
        },
    
        {
          id: 2,
          name: 'eeee.exe',
          createAt: new Date('09/04/2021'),
          createBy: 'eeee',
          type: FileEnum.File,
          modified: '09/03/2021',
          modifiedBy: 'Tran Minh Hoang',
          subFolders: [],
          parentId: 0,
          isNewFile: true
        },
        {
          id: 3,
          name: 'ffff.exe',
          createAt: new Date('09/04/2021'),
          createBy: 'ffff',
          type: FileEnum.File,
          modified: '09/03/2021',
          modifiedBy: 'Tran Minh Hoang',
          subFolders: [],
          parentId: 0,
          isNewFile: false
        },
        {
          id: 4,
          name: 'aaaa.exe',
          createAt: new Date('09/04/2021'),
          createBy: 'aaaa',
          type: FileEnum.File,
          modified: '09/03/2021',
          modifiedBy: 'Tran Minh Hoang',
          subFolders: [],
          parentId: 1,
          isNewFile: false
        },
        {
          id: 5,
          name: 'bbb.exe',
          createAt: new Date('09/04/2021'),
          createBy: 'bbb',
          type: FileEnum.File,
          modified: '09/03/2021',
          modifiedBy: 'Tran Minh Hoang',
          subFolders: [],
          parentId: 1,
          isNewFile: false
        },
        {
          subFolders: [],
          type: FileEnum.Folder,
          name: 'hahah',
          id: 6,
          createAt: new Date('09/04/2021'),
          createBy: 'dddd',
          modified: '09/03/2021',
          modifiedBy: 'Tran Minh Hoang',
          parentId: 1,
          isNewFile: false
        },
        {
          id: 7,
          name: 'cccc.exe',
          createAt: new Date('09/04/2021'),
          createBy: 'cccc',
          type: FileEnum.File,
          modified: '09/03/2021',
          modifiedBy: 'Tran Minh Hoang',
          subFolders: [],
          parentId: 6,
          isNewFile: false
        },
        {
          id: 8,
          name: 'dddd.exe',
          createAt: new Date('09/04/2021'),
          createBy: 'dddd',
          type: FileEnum.File,
          modified: '09/03/2021',
          modifiedBy: 'Tran Minh Hoang',
          subFolders: [],
          parentId: 6,
          isNewFile: false
        },
      ],

} 
 
const _fileReducer = createReducer(
  initialState,
  on(addFile, (state: FileEntityState, {newfile}) => {
    return {...state, files: [...state.files, newfile]}
  }),
  on(deleteFile, (state: FileEntityState) => initialState),
  on(updateFile, (state: FileEntityState) => initialState),
  on(reset, (state) => initialState)
);
 
export function fileReducer(state: any, action: any) {
  return _fileReducer(state, action);
}