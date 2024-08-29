import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormatterDirective]'
})
export class CurrencyFormatterDirectiveDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value;

    // Remove qualquer coisa que não seja digito
    value = value.replace(/\D/g, '');

    if (value) {
      // Na base 10, divide valor por 100 (para mover a virgula)
      // Fixa 2 casa decimais (string)
      // Troca virgula por ponto
      value = (parseFloat(value) / 100).toFixed(2).replace('.', ',');
      // Realiza a separação dos milhares
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      
      input.value = value;
    }
  }

  // Limita as teclas para impossibilitar insert de . e ,
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (
      allowedKeys.indexOf(event.key) !== -1 ||
      (event.key >= '0' && event.key <='9')  
    ) {
      return;
    } else {
      event.preventDefault();
    }
  }
}
