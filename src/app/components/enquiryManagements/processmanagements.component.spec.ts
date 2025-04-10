import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessmanagementsComponent } from './processmanagements.component';

describe('ProcessmanagementsComponent', () => {
  let component: ProcessmanagementsComponent;
  let fixture: ComponentFixture<ProcessmanagementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessmanagementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessmanagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
