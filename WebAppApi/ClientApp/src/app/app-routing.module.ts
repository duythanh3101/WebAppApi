import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FileEditComponent } from './files/edit/file-edit/file-edit.component';
import { FileListPersistComponent } from './files/file-list-persist/file-list-persist.component';
import { FileListComponent } from './files/file-list/file-list.component';

const routes: Routes = [
  { path: '',  component: FileListComponent},
  { path: 'a',  component: FileListPersistComponent},

  // { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'file-edit/:id', component: FileEditComponent },
  { path: 'fetch-data', component: FetchDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
