import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosListComponent } from './alunos-list.component';

describe('AlunosListComponent', () => {
  let component: AlunosListComponent;
  let fixture: ComponentFixture<AlunosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
