import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTableListTodoComponent } from './todo-table-list-todo.component';

describe('TodoTableListTodoComponent', () => {
  let component: TodoTableListTodoComponent;
  let fixture: ComponentFixture<TodoTableListTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoTableListTodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoTableListTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
