class NoteList extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    _archivedNotelist = null;
    _notArchivedNoteList = null;

    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode:'open'});
        this._style = document.createElement('style');
        
        this.render();
    }

    _updateStyle(){
        this._style.innerHTML = `
          .note-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-top: 24px;
          }
          .archive-wrapper {
            background: white;
          }
        `;
    }

    render(){
      this._updateStyle();
      this._shadowRoot.innerHTML = `
        ${this._style.outerHTML}
        <div class="note-list">
          <slot></slot>
        </div>
      `;
    }
}

customElements.define('note-list', NoteList);