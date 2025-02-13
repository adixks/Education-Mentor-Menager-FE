import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetStudentsComponent } from './get-students.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GetStudentsComponent', () => {
  let component: GetStudentsComponent;
  let fixture: ComponentFixture<GetStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetStudentsComponent, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GetStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch students on init', () => {
    spyOn(component, 'getStudents');
    component.ngOnInit();
    expect(component.getStudents).toHaveBeenCalled();
  });
});
