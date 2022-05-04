import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreditCardComponent } from './list-credit-card.component';

describe('ListCreditCardComponent', () => {
  let component: ListCreditCardComponent;
  let fixture: ComponentFixture<ListCreditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCreditCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
