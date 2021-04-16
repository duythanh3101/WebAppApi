import { FileEnum } from './enums/FileEnum';

export interface IFileEntity {
  id: number;
  createAt: Date;
  createBy: string;
  modified: string;
  modifiedBy: string;
  name: string;
  type: FileEnum;
  subFolders: IFileEntity[];
  parentId: number;
  isNewFile: boolean;
}
