import { Component, OnInit } from '@angular/core';
import { Sol, SolList } from '../Sol';
import { SolService } from '../sol.service';

@Component({
  selector: 'app-sol-list',
  templateUrl: './sol-list.component.html',
  styleUrls: ['./sol-list.component.css']
})
export class SolListComponent implements OnInit {

  sols?: Sol[];

  constructor(private solService: SolService) {}

  ngOnInit(): void {
    this.getAllSols();
  }

  getAllSols(): void {
    this.solService.getLastSols(0).subscribe((sols) => {
      this.sols = [];
      for(const sol of Object.values(sols)){
        sol.First_UTC = new Date(sol.First_UTC);
        sol.Last_UTC = new Date(sol.Last_UTC)
        this.sols.push(sol)
      }
      this.sols.sort((a, b) => {
        return a.sol_date > b.sol_date ? -1 : 1;
      })
    });
  }

}
