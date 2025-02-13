import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteLanguageComponent } from './delete-language.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('DeleteLanguageComponent', () => {
  let component: DeleteLanguageComponent;
  let fixture: ComponentFixture<DeleteLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteLanguageComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
