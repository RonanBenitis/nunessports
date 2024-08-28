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

  ngOnInit(): void {
    this.productList$ = this.prodService.getAll();
  }

  // >>>>>> PROPRIEDADES
  modalTitle:string = '';
  activateAddEditProductComponent:boolean = false;
  product:any;

  // >>>>> MÉTODOS DE MANIPULAÇÃO
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

    this.productList$ = this.prodService.getAll();
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

        this.productList$ = this.prodService.getAll();
      })
    }
  }
}

