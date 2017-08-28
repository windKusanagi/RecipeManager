import { AuthService } from './../services/auth.service';
import { DataStorageService } from './../services/data-storage.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Response } from '@angular/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  // @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStorage: DataStorageService, private auth: AuthService) {

  }

  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }
  onSaveData() {
     this.dataStorage.storeRecipes()
       .subscribe(
         (response: Response) => {
           console.log(response);
         }
       );
  }
  onFetchData() {
    this.dataStorage.getRecipes();
  }

  onLogout() {
    this.auth.logout();
  }
}
