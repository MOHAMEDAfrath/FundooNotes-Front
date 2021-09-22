import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesdialogComponent } from './notesdialog.component';

describe('NotesdialogComponent', () => {
  let component: NotesdialogComponent;
  let fixture: ComponentFixture<NotesdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
