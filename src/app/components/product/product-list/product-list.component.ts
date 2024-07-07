import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IProduct} from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ProductFormComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnChanges{
  @Input() itemList: IProduct[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: IProduct = {};
  public productService: ProductService = inject(ProductService);
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
  
  showDetailModal(item: IProduct, modal: any) {
    this.selectedItem = {...item}
    modal.show();
  }

  handleFormAction(item: IProduct) {
    this.productService.update(item);
  }

  deleteProduct(item: IProduct) {
    this.productService.delete(item);
  }

}
