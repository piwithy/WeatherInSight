import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolEvolPageComponent } from './sol-evol-page.component';

describe('SolEvolPageComponent', () => {
  let component: SolEvolPageComponent;
  let fixture: ComponentFixture<SolEvolPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolEvolPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolEvolPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
