import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos.service';

describe('TodosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodosService = TestBed.get(TodosService);
    expect(service).toBeTruthy();
  });
});
