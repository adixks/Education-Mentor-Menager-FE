import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetLessonsComponent } from './get-lessons.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('GetLessonsComponent', () => {
  let component: GetLessonsComponent;
  let fixture: ComponentFixture<GetLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [GetLessonsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('powinien utworzyć komponent', () => {
    expect(component).toBeTruthy();
  });

  it('powinien pobrać listę lekcji przy inicjalizacji', () => {
    spyOn(component, 'fetchLessons');
    component.ngOnInit();
    expect(component.fetchLessons).toHaveBeenCalled();
  });

  it('powinien wywołać metodę poprzedniej strony, gdy kliknięty przycisk', () => {
    spyOn(component, 'prevPage');
    const button = fixture.debugElement.query(By.css('.prev-button'));
    button.triggerEventHandler('click', null);
    expect(component.prevPage).toHaveBeenCalled();
  });

  it('powinien wywołać metodę następnej strony, gdy kliknięty przycisk', () => {
    spyOn(component, 'nextPage');
    const button = fixture.debugElement.query(By.css('.next-button'));
    button.triggerEventHandler('click', null);
    expect(component.nextPage).toHaveBeenCalled();
  });

  it('powinien przekierować do strony głównej po kliknięciu Powrót', () => {
    spyOn(component, 'goToDashboard');
    const button = fixture.debugElement.query(By.css('.back-button'));
    button.triggerEventHandler('click', null);
    expect(component.goToDashboard).toHaveBeenCalled();
  });
});
