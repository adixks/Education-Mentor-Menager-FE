import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateStudentTeacherComponent } from './update-student-teacher.component';

describe('UpdateStudentTeacherComponent', () => {
  let component: UpdateStudentTeacherComponent;
  let fixture: ComponentFixture<UpdateStudentTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStudentTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStudentTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
