// product.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { IProduct } from '../interfaces';
import { BaseService } from './base-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<IProduct> {
  protected override source: string = 'product';
  private itemListSignal = signal<IProduct[]>([]);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  get items$ () {
    return this.itemListSignal;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.itemListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error in get all product request', error);
        this.snackBar.open(error.error.description, 'Close' , {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  public save(item: IProduct) {
    this.add(item).subscribe(
      (response: any) => {
        this.itemListSignal.update((products: IProduct[]) => [response, ...products]);
      },
      (error: any) => {
        console.error('Error adding product:', error);
        const errorMessage = error.error?.description || 'Unknown error';
        this.snackBar.open(errorMessage, 'Close' , {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    );
  }


  public update(item: IProduct) {
    this.add(item).subscribe({
      next: (response: any) => {
        const updatedItems = this.itemListSignal().map(product =>
          product.id === item.id ? response : product
        );
        this.itemListSignal.set(updatedItems);
      },
      error: (error: any) => {
        console.error('Error updating product:', error);
        const errorMessage = error.error?.description || 'Unknown error';
        this.snackBar.open(errorMessage, 'Close' , {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  public delete(item: IProduct) {
    this.del(item.id).subscribe({
      next: () => {
        this.itemListSignal.set(this.itemListSignal().filter(product => product.id != item.id));
      },
      error: (error: any) => {
        console.error('response', error.description);
        this.snackBar.open(error.error.description, 'Close' , {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
