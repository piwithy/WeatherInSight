import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Sol } from '../Sol';
import { SolService } from '../sol.service';

@Component({
  selector: 'app-sol-detail',
  templateUrl: './sol-detail.component.html',
  styleUrls: ['./sol-detail.component.css']
})
export class SolDetailComponent implements OnInit {

  sol?: Sol;

  constructor(
    private route: ActivatedRoute,
    private solService: SolService
  ) { }

  ngOnInit(): void {
    this.getSol()
  }

  getSol(): void{
    const sol_id = Number(this.route.snapshot.paramMap.get("id"));
    this.solService.getUnique(sol_id).subscribe(sol => this.sol = sol[sol_id]);
  }

}
