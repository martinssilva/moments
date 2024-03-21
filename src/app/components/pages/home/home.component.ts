import { Component } from '@angular/core';

import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../types/Moment';
import { enviroment } from '../../../../environments/enviroment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseUrl: string = enviroment.baseApiUrl;
  faSearch = faSearch;

  constructor(private momentService: MomentService) {}

  ngOnInit() {
    this.momentService.getAllMoments().subscribe((moments) => {
      const data = moments.data;
      data.map((moment) => {
        moment.created_at = new Date(moment.created_at!).toLocaleDateString(
          'pt-Br'
        );
      });
      this.allMoments = moments.data;
      this.moments = moments.data;
    });
  }
  search(event: Event): void {
    const query = event.target as HTMLInputElement;
    const value = query.value;
    this.moments = this.allMoments.filter((moment) =>
      moment.title.toLowerCase().includes(value.toLowerCase())
    );
  }
}
