import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetnotebylabelComponent } from './getnotebylabel.component';

describe('GetnotebylabelComponent', () => {
  let component: GetnotebylabelComponent;
  let fixture: ComponentFixture<GetnotebylabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetnotebylabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetnotebylabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
