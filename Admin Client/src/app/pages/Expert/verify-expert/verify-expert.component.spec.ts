import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyExpertComponent } from './verify-expert.component';

describe('VerifyExpertComponent', () => {
  let component: VerifyExpertComponent;
  let fixture: ComponentFixture<VerifyExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyExpertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
