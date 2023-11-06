import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileComparisonComponent } from './file-comparison.component';

describe('FileComparisonComponent', () => {
  let component: FileComparisonComponent;
  let fixture: ComponentFixture<FileComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileComparisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
