import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ICategory } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../services/category.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    CategoryFormComponent
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnChanges {
  @Input() itemList: ICategory[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: ICategory = {};
  public categoryService: CategoryService = inject(CategoryService);
  public authService: AuthService = inject(AuthService);
  public isSuperAdmin: boolean = false;

  ngOnInit(): void {
    this.isSuperAdmin = this.authService.isSuperAdmin();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }
  
  showDetailModal(item: ICategory, modal: any) {
    this.selectedItem = {...item}
    modal.show();
  }

  handleFormAction(item: ICategory) {
    this.categoryService.update(item);
  }

  deleteCategory(item: ICategory) {
    this.categoryService.delete(item);
  }

}