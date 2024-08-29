import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent {
  productList$!: Observable<any[]>;
  
  constructor(private prodService:ProductService) { }

  // >>>>> MÉTODOS INTERNOS
  private fechaModalAddEdit() {
    var closeModalBtn = document.getElementById('add-edit-modal-close');

    if(closeModalBtn) {
      closeModalBtn.click();
    }
  }

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

  // Reverter formatação
  /*
  * Importante realizar dessa forma, pois com a formatação
  * renderiza-se R$##.###,##, mas no console retorna ##,###.
  * Dessa maneira garantimos que recebamos o valor como ####.##
  */
  private removeFormatting(value: string): number {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = parseFloat(numericValue) / 100;
    return parseFloat(formattedValue.toFixed(2));
  }

  // >>>>> PROPRIEDADES
  @Input() product:any;
  id: number = 0;
  codigo: string="";
  nome: string="";
  descricao: string="";
  preco!: number;
  precoForms!: string;
  
  // >>>>> MÉTODOS DE MANIPULAÇÃO
  ngOnInit(): void{
    this.id = this.product.id;
    this.codigo = this.product.codigo;
    this.nome = this.product.nome;
    this.descricao = this.product.descricao;
    this.preco = this.product.preco;
    this.precoForms = this.product.preco;
    
    this.productList$ = this.prodService.getAll();
  }

  addProduct() {
    var product = {
      codigo: this.codigo,
      nome: this.nome,
      descricao: this.descricao,
      preco: this.removeFormatting(this.precoForms)
    }
    console.log(product.preco);
    this.prodService.add(product).subscribe(res => {
      this.fechaModalAddEdit();

      var showAddSuccess = document.getElementById('add-success-alert');
      this.successAlert(showAddSuccess, 4000);
    });
  }

  updateInspection() {
    var product = {
      id: this.id,
      codigo: this.codigo,
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco
    }
    
    var id:number = this.id;

    this.prodService.update(id, product).subscribe(res => {
      this.fechaModalAddEdit();

      var showAddSuccess = document.getElementById('update-success-alert');
      this.successAlert(showAddSuccess, 4000);
    })
  }
}
