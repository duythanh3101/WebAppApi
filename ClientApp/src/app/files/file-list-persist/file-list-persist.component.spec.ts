import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListPersistComponent } from './file-list-persist.component';

describe('FileListPersistComponent', () => {
  let component: FileListPersistComponent;
  let fixture: ComponentFixture<FileListPersistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileListPersistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListPersistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
