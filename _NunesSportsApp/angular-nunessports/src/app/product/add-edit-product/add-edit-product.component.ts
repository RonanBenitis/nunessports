import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent {
  productList$!: Observable<any[]>;
  errorMessage: any;
  @Input()product: Product = new Product();
  productCodeCollected!:string | null;
  precoForms!: string;

  constructor(private prodService:ProductService) { }

  // >>>>> INICIALIZAÇÃO
  ngOnInit(): void{
    this.productCodeCollected = this.product.codigo;

    if(this.product.preco) {
      this.precoForms = this.product.preco.toString();
    }
    
    this.productList$ = this.prodService.getAll();
  }

  // >>>>> MÉTODOS INTERNOS
  private fechaModalAddEdit() {
    var closeModalBtn = document.getElementById('add-edit-modal-close');

    if(closeModalBtn) {
      closeModalBtn.click();
    }
  }

  private showAndDropAlert(elementId:any, time:number) {
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
  
  // >>>>> MÉTODOS DE MANIPULAÇÃO
  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.product && this.product.codigo) {
        this.updateProduct();
      } else {
        this.addProduct();
      }
    } else {
      Object.keys(form.controls).forEach(controlName => {
        form.controls[controlName].markAsTouched();
      })
    }
  }

  addProduct() {
    const product = new Product(
      0, // Id 0 ativa o autoincremento
      this.productCodeCollected,
      this.product.nome,
      this.product.descricao,
      this.removeFormatting(this.precoForms)
    );
    console.log(product);
    this.prodService.add(product).subscribe({
      next: (res) => {
        this.fechaModalAddEdit();

        var showAddSuccess = document.getElementById('add-success-alert');
        this.showAndDropAlert(showAddSuccess, 4000);
      },
      error: (e) => {
        this.errorMessage = e;

        var showErrorAlert = document.getElementById('error-alert');
        if(showErrorAlert) {
          showErrorAlert.style.display = "block";
        }
      }
    });
  }

  updateProduct() {
    const product = new Product(
      this.product.id,
      this.product.codigo,
      this.product.nome,
      this.product.descricao,
      this.removeFormatting(this.precoForms)
    );

    this.prodService.update(product.id!, product).subscribe(res => {
      this.fechaModalAddEdit();

      var showAddSuccess = document.getElementById('update-success-alert');
      this.showAndDropAlert(showAddSuccess, 4000);
    })
  }
}
