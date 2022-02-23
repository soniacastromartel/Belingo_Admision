import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  darkMode= true;

  constructor() {
    const prefersDark= window.matchMedia ('(prefers-color-scheme:dark)');
    this.darkMode = prefersDark.matches;
   }

  ngOnInit() {
  }

  change() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');

     }

     deactivateDarkMode() {
      document.body.classList.remove('dark');

     }

buttonClick() {
  console.log('click');
}

}
