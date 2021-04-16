import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileEnum } from 'src/app/entities/enums/FileEnum';
import { IFileEntity } from 'src/app/entities/IFileEntity';
import { DataFileService } from 'src/app/services/data/data-file.service';

@Component({
  selector: 'app-file-edit',
  templateUrl: './file-edit.component.html',
  styleUrls: ['./file-edit.component.scss']
})
export class FileEditComponent implements OnInit {
  pageTitle = 'File Edit';
  errorMessage: string = '';
  currentFile: IFileEntity | undefined;
  fileSelector: string[] = [FileEnum.File, FileEnum.Folder];

  fileForm = this.fb.group({
    name: ['', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50)]],
    type: '',
    modifiedBy: '',
    typeFile: {}
  });
  //private sub: Subscription;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataSv: DataFileService
  ) { }

  ngOnInit(): void {
    // Read the product Id from the route parameter
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getCurrentFile(id);
      }
    );
  }

  getCurrentFile(id: any): void{
    this.dataSv.getFile(id)
    .subscribe({
      next: (file: IFileEntity) => {
        file.parentId = Number(localStorage.getItem('parentId'));
        this.displayFile(file);
      },
      error: err => this.errorMessage = err
    });
  }

  displayFile(file: IFileEntity){
    if (this.fileForm) {
      this.fileForm.reset();
    }
    this.currentFile = file;

    if (this.currentFile.id === 0) {
      this.pageTitle = 'Add File';
    } else {
      this.pageTitle = `Edit File: ${this.currentFile.name}`;
    }

    // Update the data on the form
    this.fileForm.patchValue({
      name: this.currentFile.name,
      type: this.currentFile.type,
      modifiedBy: this.currentFile.modifiedBy,
    });

  }

  saveFile() {
    if (this.fileForm.valid) {
      if (this.fileForm.dirty) {
        const p = { ...this.currentFile, ...this.fileForm.value };
        if (p.id === 0) {
          this.dataSv.createFile(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: (err: string) => this.errorMessage = err
            });
        } else {
          this.dataSv.updateFile(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }

      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }

  }

  deleteFile(){
    if (this.currentFile){
      if (this.currentFile.id === 0) {
        // Don't delete, it was never saved.
        this.onSaveComplete();
      } else {
        if (confirm(`Really delete the product: ${this.currentFile?.name}?`)) {
          this.dataSv.deletefile(this.currentFile.id ?? 0)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      }
    }
  }


  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.fileForm.reset();
    this.router.navigate(['/']);
  }
}
