import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FileEnum } from 'src/app/entities/enums/FileEnum';
import { FileType } from 'src/app/entities/FileType';
import { Folder } from 'src/app/entities/Folder';
import { IFileEntity } from 'src/app/entities/IFileEntity';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { error } from 'selenium-webdriver';

const dataFiles = [
  {
    id: 100,
    name: 'Hihi',
    modified: '03/03/2021',
    modifiedBy: 'Thanh Duy Pham',
    subFolders: [
      {
        id: 1,
        name: 'aaaa.exe',
        createDate: new Date('09/04/2021'),
        createBy: 'aaaa',
        type: 'FILE',
        modified: '09/03/2021',
        modifiedBy: 'Tran Minh Hoang',
      },
      {
        id: 2,
        name: 'bbb.exe',
        createDate: new Date('09/04/2021'),
        createBy: 'bbb',
        type: 'FILE',
        modified: '09/03/2021',
        modifiedBy: 'Tran Minh Hoang',
      },
      {
        subFolders: [
          {
            id: 3,
            name: 'cccc.exe',
            createDate: new Date('09/04/2021'),
            createBy: 'cccc',
            type: 'FILE',
            modified: '09/03/2021',
            modifiedBy: 'Tran Minh Hoang',
          },
          {
            id: 4,
            name: 'dddd.exe',
            createDate: new Date('09/04/2021'),
            createBy: 'dddd',
            type: 'FILE',
            modified: '09/03/2021',
            modifiedBy: 'Tran Minh Hoang',
          },
        ],
        type: 'FOLDER'
      },
    ],
    type: 'FOLDER'
  },

  {
    id: 5,
    name: 'eeee.exe',
    createDate: new Date('09/04/2021'),
    createBy: 'eeee',
    type: 'FILE',
    modified: '09/03/2021',
    modifiedBy: 'Tran Minh Hoang',
  },
  {
    id: 6,
    name: 'ffff.exe',
    createDate: new Date('09/04/2021'),
    createBy: 'ffff',
    type: 'FILE',
    modified: '09/03/2021',
    modifiedBy: 'Tran Minh Hoang',
  },
];

@Injectable({
  providedIn: 'root'
})
export class DataFileService {

  private fileUrl = 'api/file';
  private _data: Array<IFileEntity> = [];
  
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    console.log('base url', baseUrl);
    http.get<IFileEntity[]>(baseUrl + "api/file").subscribe(result => {
      console.log('files', result);
    }, 
    error => console.error(error));
  }

  getData = (): Observable<IFileEntity[]> => {
    return this.http.get<IFileEntity[]>(this.fileUrl)
      .pipe(
        tap(data => JSON.stringify(data)),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error)
  }

  createFile(file: IFileEntity): Observable<IFileEntity> {
    console.log('add', file);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    file.id = Math.floor(Math.random() * 999);;
    return this.http.post<IFileEntity>(this.fileUrl, file, { headers })
      .pipe(
        tap(data => console.log('createFile: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getFile(id: number): Observable<IFileEntity> {
    //onsole.log('getfile,', id, typeof (id))
    if (Number(id) === 0) {
      return of(this.initializeFile());
    }
    const url = `${this.fileUrl}/${id}`;
    return this.http.get<IFileEntity>(url)
      .pipe(
        tap(data => console.log('getFile: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deletefile(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.fileUrl}/${id}`;
    return this.http.delete<IFileEntity>(url, { headers })
      .pipe(
        tap(data => console.log('deletefile: ' + id)),
        catchError(this.handleError)
      );
  }

  updateFile(file: IFileEntity): Observable<IFileEntity> {
    file.isNewFile = false;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.fileUrl}/${file.id}`;
    return this.http.put<IFileEntity>(url, file, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + file.id)),
        // Return the product on an update
        map(() => file),
        catchError(this.handleError)
      );
  }

  private initializeFile(): IFileEntity {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    // Return an initialized object
    return {
      id: 0,
      modified: today.toLocaleDateString(),
      name: '',
      type: FileEnum.File,
      createAt: new Date(),
      createBy: '',
      modifiedBy: '',
      subFolders: [],
      parentId: 0,
      isNewFile: true
    };
  }
}
