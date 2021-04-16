import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FileEnum } from 'src/app/entities/enums/FileEnum';
import { IFileEntity } from 'src/app/entities/IFileEntity';
import { addFile } from 'src/app/redux/actions/file.actions';
import { DataFileService } from 'src/app/services/data/data-file.service';
import { selectFiles } from 'src/app/redux/store/selector/file.selectors';
import { FileEntityState, fileFeatureKey } from 'src/app/redux/reducers/file.reducers';
import { map, filter } from 'rxjs/operators';

const parentId = 'parentId';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  //#region [Properties]
  files: IFileEntity[] = [];
  displayFiles: IFileEntity[] = [];

  private _currentParentId = 0;
  get currentParentId(): number {
    return this._currentParentId;
  };
  set currentParentId(value: number) {
    this._currentParentId = value;
    this.backBtnDisable = value === 0 ? true : false;
  }
  backBtnDisable: boolean = true;

  //#endregion [Properties]

  //#region [Constructor]
  constructor(private dataSv: DataFileService) {

  }

  ngOnInit(): void {
    this.currentParentId = Number(localStorage.getItem(parentId));
    this.dataSv.getData().subscribe({
      next: files => {
        this.files = files;
        this.displayFiles = files.filter(x => x.parentId === this.currentParentId);

        // Put the object into storage
        localStorage.setItem('STORE_DATA', JSON.stringify(files));
      },
      error: err => console.error(err)
    });
  }
  //#endregion [Constructor]


  //#region [Public Methods]

  navigateTo(file: IFileEntity) {
    //console.log('click file', file);
    if (file.type === FileEnum.Folder) {
      this.displayFiles = this.files.filter(f => f.parentId == file.id);
      localStorage.setItem(parentId, file.id.toString());
      this.currentParentId = file.id;
    }
  }

  goBack() {
    let id = this.getParentFolder(this.currentParentId);
    if (id !== -1) {
      this.currentParentId = id;
      this.displayFiles = this.files.filter(x => x.parentId === id);
      localStorage.setItem(parentId, this.currentParentId.toString());
    }
  }

  getParentFolder(currentParentId: number): number {
    let f = this.files.find(x => x.id == currentParentId);
    if (f) {
      return f.parentId;
    }

    return -1;
  }
  //#endregion [Public Methods]

}


