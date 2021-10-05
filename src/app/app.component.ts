import { Component } from '@angular/core';
// @ts-ignore
import { Gradient } from './Gradient.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'foosball-metrics';

  async CreateGradient() {
    const gradient = new Gradient();
    gradient.initGradient('#gradient-canvas')
  }

  ngOnInit(): void {
    this.CreateGradient()
  }
}
