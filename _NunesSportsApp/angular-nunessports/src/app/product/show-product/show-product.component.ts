import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrl: './show-product.component.css'
})
export class ShowProductComponent {
  productList$!:Observable<any[]>;
  connectionError:boolean = false;
  product!:Product;
  modalTitle:string = '';
  activateAddEditProductComponent:boolean = false;
  
  constructor(private prodService:ProductService) { }

    // >>>>> INICIALIZAÇÃO
    ngOnInit(): void {
      this.refeshProductList();
    }

  // >>>>> MÉTODOS INTERNOS
  private successAlert(elementId:any, time:number) {
    if(elementId) {
      elementId.style.display = "block";
    }

    setTimeout(function() {
      if(elementId) {
        elementId.style.display = "none";
      }
    }, time)
  }

  private refeshProductList() {
    this.productList$ = this.prodService.getAll();
    // Verifica conexão com o banco
    this.prodService.getAll().subscribe({
      error: (e) => {
        this.connectionError = true;
      }
    });
  }

  // >>>>> MÉTODOS DE MANIPULAÇÃO
  modalAdd() {
    this.product = new Product();
    this.modalTitle = "Adicionar Produto";
    this.activateAddEditProductComponent = true;
  }

  modalClose() {
    this.activateAddEditProductComponent = false;

    this.refeshProductList();
  }

  modalEdit(item:any) {
    this.product = item;
    this.modalTitle = "Edição do Produto";
    this.activateAddEditProductComponent = true;
  }

  delete(item:any) {
    if(confirm(`Você tem certeza que deseja deletar o Produto de código ${item.codigo}`)) {
      this.prodService.delete(item.id).subscribe(res => {
        var showDeleteSuccess = document.getElementById('delete-success-alert');
        this.successAlert(showDeleteSuccess, 4000);

        this.refeshProductList();
      })
    }
  }
}

