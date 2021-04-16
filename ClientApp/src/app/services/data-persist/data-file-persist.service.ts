import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FileEnum } from 'src/app/entities/enums/FileEnum';
import { IFileEntity } from 'src/app/entities/IFileEntity';
import { FileEntityState } from 'src/app/redux/reducers/file.reducers';
import { selectFiles } from 'src/app/redux/store/selector/file.selectors';

@Injectable({
  providedIn: 'root'
})
export class DataFilePersistService {

  private fileUrl = 'api/files';
  fileList$: Observable<IFileEntity[]> | undefined;

  constructor(private http: HttpClient, private store: Store<{ fileRx: FileEntityState }>) {
    
  }
  getData = (): Observable<IFileEntity[]> => {
    this.fileList$ = this.store.pipe(select(selectFiles));
    this.fileList$.subscribe({
      next: ((data: any)=> {console.log(data)}),
      error: catchError(this.handleError)
    })
    return this.fileList$;
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error)
  }

  createFile(file: IFileEntity): Observable<IFileEntity> {
    //console.log('add', file);
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
