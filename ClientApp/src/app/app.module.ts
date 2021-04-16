import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileListComponent } from './files/file-list/file-list.component';
import { NavbarComponent } from './headers/navbar/navbar.component';
import { FileEditComponent } from './files/edit/file-edit/file-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FileData } from './services/data/file-data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { fileReducer, fileFeatureKey } from './redux/reducers/file.reducers';
import { FileListPersistComponent } from './files/file-list-persist/file-list-persist.component';

@NgModule({
  declarations: [
    AppComponent,
    FileListComponent,
    NavbarComponent,
    FileEditComponent,
    FileListPersistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(FileData),
    //StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot({ }),
    StoreModule.forFeature(fileFeatureKey, fileReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : []
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
