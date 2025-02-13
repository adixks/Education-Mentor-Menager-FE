import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddLanguageComponent } from './add-language.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('AddLanguageComponent', () => {
  let component: AddLanguageComponent;
  let fixture: ComponentFixture<AddLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLanguageComponent, HttpClientTestingModule, RouterTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty languageName initially', () => {
    expect(component.languageName).toBe('');
  });

  it('should call addLanguage() when button is clicked', () => {
    spyOn(component, 'addLanguage');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.addLanguage).toHaveBeenCalled();
  });
});
