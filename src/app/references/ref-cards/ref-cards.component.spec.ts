import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefCardsComponent } from './ref-cards.component';

describe('RefCardsComponent', () => {
  let component: RefCardsComponent;
  let fixture: ComponentFixture<RefCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
