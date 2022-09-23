import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolListComponent } from './sol-list.component';

describe('SolListComponent', () => {
  let component: SolListComponent;
  let fixture: ComponentFixture<SolListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
