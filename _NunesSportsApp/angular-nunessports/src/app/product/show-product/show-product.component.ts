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
  connectionError:boolean = false;
  
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

  private refeshProductList() {
    this.productList$ = this.prodService.getAll();
    // Verifica conexão com o banco
    this.prodService.getAll().subscribe({
      error: (e) => {
        this.connectionError = true;
      }
    });
  }

  ngOnInit(): void {
    this.refeshProductList();
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

