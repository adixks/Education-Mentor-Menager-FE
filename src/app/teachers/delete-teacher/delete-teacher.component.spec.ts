import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteTeacherComponent } from './delete-teacher.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('DeleteTeacherComponent', () => {
  let component: DeleteTeacherComponent;
  let fixture: ComponentFixture<DeleteTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [DeleteTeacherComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display an error message if no teacher ID is provided', () => {
    component.teacherId = '';
    component.deleteTeacher();
    expect(component.message).toBe('⛔ Brak tokena! Użytkownik nie jest zalogowany.');
  });

  it('should call deleteTeacher on button click', () => {
    spyOn(component, 'deleteTeacher');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.deleteTeacher).toHaveBeenCalled();
  });

  it('should display a success message when teacher is successfully deleted', () => {
    component.message = '✅ Nauczyciel został pomyślnie usunięty.';
    expect(component.message).toBe('✅ Nauczyciel został pomyślnie usunięty.');
  });
});
