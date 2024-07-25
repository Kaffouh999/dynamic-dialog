import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button';
import { ProductService } from './prodServ';
import { Product } from './product';

@Component({
    providers: [DialogService, MessageService, ProductService],
    standalone:true,
    imports:[TableModule, ButtonModule],
    template: `<div class="flex justify-content-end mt-1 mb-3">
            <p-button icon="pi pi-external-link" label="Nested Dialog" [outlined]="true" severity="success" (onClick)="showInfo()" />
        </div>
        <p-table [value]="products" responsiveLayout="scroll" [rows]="5" [responsive]="true">
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="code">Code</th>
                    <th pSortableColumn="name">Name</th>
                    <th pSortableColumn="year">Image</th>
                    <th pSortableColumn="price">Category</th>
                    <th pSortableColumn="inventoryStatus">Quantity</th>
                    <th style="width:4em"></th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-product>
                <tr>
                    <td>{{ product.code }}</td>
                    <td>{{ product.name }}</td>
                    <td><img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.image" class="w-4rem h-4rem shadow-2" /></td>
                    <td>{{ product.category }}</td>
                    <td>
                        {{ product.quantity }}
                    </td>
                    <td>
                        <p-button type="button" [text]="true" [rounded]="true" icon="pi pi-plus" (onClick)="selectProduct(product)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>`
})
export class ProductListDemo implements OnInit {
    products: Product[] = [];

    constructor(private productService: ProductService, private dialogService: DialogService, private ref: DynamicDialogRef) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => (this.products = products.slice(0, 5)));
    }

    selectProduct(product: Product) {
        this.ref.close(product);
    }

    showInfo() {
        /* this.dialogService.open(InfoDemo, {
            header: 'Information',
            modal: true,
            dismissableMask: true,
            data: {
                totalProducts: this.products ? this.products.length : 0
            }
        }); */
    }

    closeDialog(data: any) {
        this.ref.close(data);
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'dark';
        }
    }
}