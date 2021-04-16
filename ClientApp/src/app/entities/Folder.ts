import { IFileEntity } from './IFileEntity';

export interface Folder extends IFileEntity {
  subFolders: IFileEntity[];
}
