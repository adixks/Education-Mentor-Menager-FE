import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTeacherByIdComponent } from './get-teacher-by-id.component';

describe('GetTeacherByIdComponent', () => {
  let component: GetTeacherByIdComponent;
  let fixture: ComponentFixture<GetTeacherByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetTeacherByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTeacherByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
