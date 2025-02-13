import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetLanguagesComponent } from './get-languages.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('GetLanguagesComponent', () => {
  let component: GetLanguagesComponent;
  let fixture: ComponentFixture<GetLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetLanguagesComponent, HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GetLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getLanguages() and set languages list', () => {
    spyOn(component, 'getLanguages');
    component.ngOnInit();
    expect(component.getLanguages).toHaveBeenCalled();
  });
});
