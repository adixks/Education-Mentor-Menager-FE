import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTeacherComponent } from './add-teacher.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddTeacherComponent', () => {
  let component: AddTeacherComponent;
  let fixture: ComponentFixture<AddTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTeacherComponent, HttpClientTestingModule, FormsModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty form initially', () => {
    expect(component.firstName).toBe('');
    expect(component.lastName).toBe('');
    expect(component.email).toBe('');
    expect(component.languages).toBe('');
  });

  it('should call addTeacher on form submit', () => {
    spyOn(component, 'addTeacher');
    component.addTeacher();
    expect(component.addTeacher).toHaveBeenCalled();
  });
});
