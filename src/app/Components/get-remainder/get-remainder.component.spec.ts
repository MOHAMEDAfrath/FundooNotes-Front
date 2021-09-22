import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRemainderComponent } from './get-remainder.component';

describe('GetRemainderComponent', () => {
  let component: GetRemainderComponent;
  let fixture: ComponentFixture<GetRemainderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetRemainderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetRemainderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
