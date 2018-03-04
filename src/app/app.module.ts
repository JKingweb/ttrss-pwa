import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { Ng2Webstorage } from 'ngx-webstorage';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { SettingsComponent } from './settings/settings.component';
import { SettingsGuard } from './settings-guard.service';
import { SettingsService } from './settings.service';
import { TtrssClientService } from './ttrss-client.service';
import { MessagingService } from './messaging.service';
import { MessagingComponent } from './messaging/messaging.component';
import { OverviewComponent } from './overview/overview.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MediaMatcher } from '@angular/cdk/layout';
import { FlexLayoutModule } from "@angular/flex-layout";
import './util/rxjs-operators'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FeedFilterPipe } from './util/filter-pipe';
import { HeadlinesComponent } from './headlines/headlines.component';
import { DateFixPipe } from './util/datefix-pipe';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ArticleComponent } from './article/article.component';
import { MarkreaddialogComponent } from './markreaddialog/markreaddialog.component';


registerLocaleData(localeDe, 'de');
registerLocaleData(localeEn, 'en');

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  spaceBetween: 1,
  threshold: 30
};

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    MessagingComponent,
    OverviewComponent,
    FeedFilterPipe,
    HeadlinesComponent,
    DateFixPipe,
    ArticleComponent,
    MarkreaddialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    InfiniteScrollModule,
    Ng2Webstorage,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }}),
    SwiperModule
  ],
  entryComponents:[AppComponent, MarkreaddialogComponent],
  providers: [MediaMatcher, SettingsGuard, SettingsService, TtrssClientService, MessagingService,
   { provide: LOCALE_ID,
    deps: [SettingsService],   
    useFactory: (settings) => settings.getLanguage()},
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
