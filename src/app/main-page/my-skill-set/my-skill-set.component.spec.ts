import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySkillSetComponent } from './my-skill-set.component';

describe('MySkillSetComponent', () => {
  let component: MySkillSetComponent;
  let fixture: ComponentFixture<MySkillSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySkillSetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MySkillSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
