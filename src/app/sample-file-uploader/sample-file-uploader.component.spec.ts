import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleFileUploaderComponent } from './sample-file-uploader.component';

describe('SampleFileUploaderComponent', () => {
  let component: SampleFileUploaderComponent;
  let fixture: ComponentFixture<SampleFileUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleFileUploaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SampleFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
