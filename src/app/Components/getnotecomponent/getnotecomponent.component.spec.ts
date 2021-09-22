import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetnotecomponentComponent } from './getnotecomponent.component';

describe('GetnotecomponentComponent', () => {
  let component: GetnotecomponentComponent;
  let fixture: ComponentFixture<GetnotecomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetnotecomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetnotecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
