import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { SessionStorage } from 'ngx-webstorage';
import { Language } from './model/language';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class SettingsService {

  constructor() { }
  public locales: Language[] = [{ key: "en", name: "English" }, { key: "de", name: "Deutsch" }]
  @LocalStorage()
  public url: string;
  @LocalStorage()
  public locale: string;
  @LocalStorage()
  public username: string;
  @LocalStorage()
  public _password: string;
  @SessionStorage()
  public sessionKey: string;
  @LocalStorage()
  public icons_url: string;

  getLanguage(): string {
    if (this.locale === null) {
      return 'de';
    }
    else return this.locale;
  }

  get password(): string {
    if(this._password===null) {
      return null;
    }
    var bytes = CryptoJS.AES.decrypt(this._password, "notsosecretseed_itsopensourced"); 
    var out = bytes.toString(CryptoJS.enc.Utf8);
    return out;
  }
  set password(newValue: string) {
    var encrypted = CryptoJS.AES.encrypt(newValue, "notsosecretseed_itsopensourced").toString();
    this._password = encrypted;
  }
}