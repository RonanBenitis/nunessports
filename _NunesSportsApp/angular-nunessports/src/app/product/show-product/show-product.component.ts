import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrl: './show-product.component.css'
})
export class ShowProductComponent {
  
  productList$!:Observable<any[]>;
  
  constructor(private prodService:ProductService) { }

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

  private productListRefresh() {
    this.productList$ = this.prodService.getAll();
  }


  ngOnInit(): void {
    this.productList$ = this.prodService.getAll();
  }

  // Propriedades
  modalTitle:string = '';
  activateAddEditProductComponent:boolean = false;
  product:any;

  modalAdd() {
    this.product = {
      id: 0,
      codigo: null,
      nome: null,
      descricao: null,
      preco: null
    }
    this.modalTitle = "Adicionar Produto";
    this.activateAddEditProductComponent = true;
  }

  modalClose() {
    this.activateAddEditProductComponent = false;
    this.productListRefresh();
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
        this.productListRefresh();
      })
    }
  }
}

