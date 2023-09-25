import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JdrPaginationComponent } from './jdr-pagination.component';

describe('JdrPaginationComponent', () => {
  let component: JdrPaginationComponent;
  let fixture: ComponentFixture<JdrPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JdrPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JdrPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
