import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginReactiveComponent } from './login-reactive.component';

describe('LoginReactiveComponent', () => {
  let component: LoginReactiveComponent;
  let fixture: ComponentFixture<LoginReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginReactiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
