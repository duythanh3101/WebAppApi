import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileListComponent } from './files/file-list/file-list.component';
import { NavbarComponent } from './headers/navbar/navbar.component';
import { FileEditComponent } from './files/edit/file-edit/file-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FileData } from './services/data/file-data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { fileReducer, fileFeatureKey } from './redux/reducers/file.reducers';
import { FileListPersistComponent } from './files/file-list-persist/file-list-persist.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { LogLevel, OidcConfigService, AuthModule } from 'angular-auth-oidc-client';

export function configureAuth(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.withConfig({
            stsServer: 'https://login.microsoftonline.com/82a1db19-67e4-4059-8d50-68b47df9b282/v2.0',
            authWellknownEndpoint: 'https://login.microsoftonline.com/82a1db19-67e4-4059-8d50-68b47df9b282/v2.0',
            redirectUrl: window.location.origin,
            clientId: '207c9831-68ff-4b96-ac68-272a388e8328',
            scope: 'openid profile offline_access email api://98328d53-55ec-4f14-8407-0ca5ff2f2d20/access_as_user',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            ignoreNonceAfterRefresh: true,
            maxIdTokenIatOffsetAllowedInSeconds: 600,
            issValidationOff: false, // this needs to be true if using a common endpoint in Azure
            autoUserinfo: false,
            logLevel: LogLevel.Debug,
            customParams: {
              prompt: 'select_account', // login, consent
            },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    FileListComponent,
    NavbarComponent,
    FileEditComponent,
    FileListPersistComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    //InMemoryWebApiModule.forRoot(FileData),
    //StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot({ }),
    StoreModule.forFeature(fileFeatureKey, fileReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AuthModule.forRoot()
    
  ],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
