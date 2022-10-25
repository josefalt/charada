import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharadaComponent } from './charada.component';

describe('CharadaComponent', () => {
  let component: CharadaComponent;
  let fixture: ComponentFixture<CharadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
