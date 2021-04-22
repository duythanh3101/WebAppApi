import { IFileEntity } from './IFileEntity';
import { FileEnum } from './enums/FileEnum';

export interface FileType extends IFileEntity {
  extension: string;
}
