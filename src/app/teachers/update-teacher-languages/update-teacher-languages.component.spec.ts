import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateTeacherLanguagesComponent } from './update-teacher-languages.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('UpdateTeacherLanguagesComponent', () => {
  let component: UpdateTeacherLanguagesComponent;
  let fixture: ComponentFixture<UpdateTeacherLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [UpdateTeacherLanguagesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateTeacherLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the form correctly', () => {
    component.teacherId = '1';
    component.languages = 'English, Spanish';
    expect(component.isValidForm()).toBeTrue();
  });

  it('should invalidate the form if teacherId is missing', () => {
    component.teacherId = '';
    component.languages = 'English, Spanish';
    expect(component.isValidForm()).toBeFalse();
  });

  it('should invalidate the form if there are fewer than two languages', () => {
    component.teacherId = '1';
    component.languages = 'English';
    expect(component.isValidForm()).toBeFalse();
  });

  it('should call updateLanguages method on form submission', () => {
    spyOn(component, 'updateLanguages');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.updateLanguages).toHaveBeenCalled();
  });
});
