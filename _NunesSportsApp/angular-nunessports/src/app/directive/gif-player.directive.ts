import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appGifPlayer]'
})
export class GifPlayerDirective implements OnInit {
  private gifImage = 'logo.gif';
  private staticImage = 'logo.png';
  private isPlaying = false;

  constructor(private el: ElementRef) {
    this.el.nativeElement.src = this.staticImage;
  }

  ngOnInit() {
      this.playGif();
  }

  playGif() {
    this.isPlaying = true;
    this.el.nativeElement.src = this.gifImage;

    setTimeout(() => {
      this.el.nativeElement.src = this.staticImage;
      this.isPlaying = false;
    }, 3000)
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.isPlaying) {
      this.playGif();
    }
  }
}
