import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAuthComponent } from './todo-auth.component';

describe('TodoAuthComponent', () => {
  let component: TodoAuthComponent;
  let fixture: ComponentFixture<TodoAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
