import { Directive, Input, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

@Directive({
  selector: '[appRequiredCustom]',
})
export class RequiredCustomDirective implements OnInit {
  @Input() errorMessage: string = 'Campo de preenchimento obrigatório';

  private errorElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2, private control: NgControl, private form: NgForm) {}

  ngOnInit() {
    this.control.statusChanges?.subscribe(() => {
      this.updateErrorState();
    })

    this.form.ngSubmit.subscribe(() => {
      Object.keys(this.form.controls).forEach(controlName => {
        const control = this.form.controls[controlName];
        control.markAsTouched();
      });
      this.updateErrorState();
    })
  }

  @HostListener('blur')
  onBlur() {
    this.control.control?.markAsTouched();
    this.updateErrorState();
  }

  private updateErrorState() {
    const control = this.control.control;
    if (control && control.invalid && (control.dirty || control.touched)) {
      this.showError();
    } else {
      this.removeError();
    }
  }

  private showError() {
    if (!this.errorElement) {
      this.errorElement = this.renderer.createElement('div');
      const text = this.renderer.createText(this.errorMessage);
      this.renderer.appendChild(this.errorElement, text);
      this.renderer.setStyle(this.errorElement, 'color', 'red');
      this.renderer.setStyle(this.errorElement, 'font-size', '12px');
      this.renderer.setStyle(this.errorElement, 'padding', '5px 10px');
      this.renderer.appendChild(this.el.nativeElement.parentNode, this.errorElement);
    }
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid red');
  }

  private removeError() {
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #dee2e6');
    if (this.errorElement) {
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.errorElement);
      this.errorElement = null;
    }
  }
}