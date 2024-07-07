import { Component, inject, OnInit } from '@angular/core';
import { CategoryListComponent } from '../../components/category/category-list/category-list.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ICategory } from '../../interfaces';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { CategoryFormComponent } from '../../components/category/category-form/category-form.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CategoryListComponent,
    LoaderComponent,
    CommonModule,
    ModalComponent,
    CategoryFormComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{
  public categoryService: CategoryService = inject(CategoryService);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public areActionsAvailable: boolean = false;
  public authService: AuthService =  inject(AuthService);
  public routeAuthorities: string[] =  [];
  public isSuperAdmin: boolean = false;

  ngOnInit(): void {
    this.categoryService.getAll();
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
      this.isSuperAdmin = this.authService.isSuperAdmin();
    });
  }

  handleFormAction(item: ICategory) {
    this.categoryService.save(item);
  }


}

