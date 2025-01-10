import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSideBarComponent } from './todo-side-bar.component';

describe('TodoSideBarComponent', () => {
  let component: TodoSideBarComponent;
  let fixture: ComponentFixture<TodoSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
