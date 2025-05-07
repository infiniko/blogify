import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBold, faItalic, faStrikethrough, faCode, faImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toolbar',
  imports: [FontAwesomeModule],
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {

  actions = [{
    icon: faBold,
    syntax: '**'
  },
  {
    icon: faItalic,
    syntax: '*'
  },
  {
    icon: faStrikethrough,
    syntax: '~~'
  },
  {
    icon: faCode,
    syntax: '```'
  }
  ]

  imageIcon = faImage;

  @Input() editor!: HTMLTextAreaElement;
  @Output() onChange = new EventEmitter<string>();

  onClick(syntax: string) {
    const start = this.editor.selectionStart;
    const end = this.editor.selectionEnd;
    let selectedText = this.editor.value.substring(start, end);
    selectedText = `${syntax}${selectedText}${syntax}`;
    this.editor.setRangeText(selectedText, start, end);
    this.onChange.emit(this.editor.value);
  }
}
