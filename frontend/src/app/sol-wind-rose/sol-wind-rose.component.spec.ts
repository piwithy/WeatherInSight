import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolWindRoseComponent } from './sol-wind-rose.component';

describe('SolWindRoseComponent', () => {
  let component: SolWindRoseComponent;
  let fixture: ComponentFixture<SolWindRoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolWindRoseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolWindRoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
