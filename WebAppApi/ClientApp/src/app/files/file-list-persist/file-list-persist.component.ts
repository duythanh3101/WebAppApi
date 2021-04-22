import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { FileEnum } from 'src/app/entities/enums/FileEnum';
import { IFileEntity } from 'src/app/entities/IFileEntity';
import { addFile } from 'src/app/redux/actions/file.actions';
import { DataFileService } from 'src/app/services/data/data-file.service';
import { selectFiles } from 'src/app/redux/store/selector/file.selectors';
import { FileEntityState, fileFeatureKey } from 'src/app/redux/reducers/file.reducers';
import { map, filter, catchError } from 'rxjs/operators';
import { error } from 'selenium-webdriver';

const parentId = 'parentId';

@Component({
  selector: 'app-file-list-persist',
  templateUrl: './file-list-persist.component.html',
  styleUrls: ['./file-list-persist.component.scss']
})
export class FileListPersistComponent implements OnInit {

  //#region [Properties]
  fileList$: Observable<IFileEntity[]>;
  displayFileList$: Observable<IFileEntity[]>;
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
  constructor(private dataSv: DataFileService, private store: Store<{ fileRx: FileEntityState }>) {
    this.fileList$ = this.store.pipe(select(selectFiles));
    this.displayFileList$ = this.fileList$;
  }

  ngOnInit(): void {
    this.currentParentId = Number(localStorage.getItem(parentId));
    this.displayFileList$ = this.store.pipe(select(selectFiles),
      map(arr => arr.filter(x => x.parentId == this.currentParentId))
    );

  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error)
  }
  //#endregion [Constructor]


  //#region [Public Methods]

  navigateTo(file: IFileEntity) {
    //console.log('click file', file);
    if (file.type === FileEnum.Folder) {
      this.displayFileList$ = this.fileList$.pipe(map(arr => arr.filter(f => f.parentId == file.id)));
      localStorage.setItem(parentId, file.id.toString());
      this.currentParentId = file.id;
    }
  }

  goBack() {
    let id = this.getParentFolder(this.currentParentId);
    //console.log('goback', id);
    if (id !== -1) {
      this.currentParentId = id;
      this.displayFileList$ = this.fileList$.pipe(map(arr => arr.filter(f => f.parentId == id)));
    }
  }

  getParentFolder(currentParentId: number): number {
    //console.log('getParentFolder', currentParentId)
    let parentIds = -1;
    this.fileList$.pipe(map(arr => arr.find(f => f.id == currentParentId))).subscribe({
      next: data => {
        console.log('getParentFolder data', data)
        parentIds = data?.parentId ?? -1;
      },
      error: error => { }
    })

    return parentIds;
  }
  //#endregion [Public Methods]

}


