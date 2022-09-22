import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolDetailComponent } from './sol-detail.component';

describe('SolDetailComponent', () => {
  let component: SolDetailComponent;
  let fixture: ComponentFixture<SolDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
