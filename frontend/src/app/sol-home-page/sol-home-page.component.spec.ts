import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolHomePageComponent } from './sol-home-page.component';

describe('SolHomePageComponent', () => {
  let component: SolHomePageComponent;
  let fixture: ComponentFixture<SolHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
