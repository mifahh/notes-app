class NoteList extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    _archivedNotelist = null;
    _notArchivedNoteList = null;
    _isArchiveVisible = null;

    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode:'open'});
        this._style = document.createElement('style');
        this._isArchiveVisible = false;
        
        this.render();
    }

    _updateStyle(){
        this._style.innerHTML = `
          .note-list-archive-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-top: 24px;
          }

          .note-list-active-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-top: 24px;
          }

          .archive-wrapper {
            background: white;
          }
          
          #isArchiveButton {
            background: #bebebeff;
            border: none;
            border-radius: 8px;
            padding: 10px 18px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(79,140,255,0.08);
            transition: background 0.2s;
            width: 100%;
          }

          #isArchiveButton:hover {
            background: #dfe0e0ff;
          }
        `;
    }

    connectedCallback(){
      this._shadowRoot.querySelector('#isArchiveButton').addEventListener('click', this._onClickEvent.bind(this));
    }

    disconnectedCallback(){
      this._shadowRoot.querySelector('#isArchiveButton').removeEventListener('click',  this._onClickEvent.bind(this));
    }

    _onClickEvent(){
      this._isArchiveVisible = !this._isArchiveVisible;
      this._toggleArchiveContainer();
    }

    _toggleArchiveContainer(){
      const archiveContainer = this._shadowRoot.querySelector('.note-list-archive-container');
      if (archiveContainer) {
        if (this._isArchiveVisible){
          archiveContainer.style.display = 'grid';
        } else {
          archiveContainer.style.display = 'none';
        }
      }
    }

    render(){
      this._updateStyle();
      this._shadowRoot.innerHTML = `
        ${this._style.outerHTML}
        <div class="note-list">
          <button id="isArchiveButton">📦</button>
          <div class="note-list-archive-container">
            <slot name="archive"></slot>
          </div>
          <div class="note-list-active-container">
            <slot name="active"></slot>
          </div>
        </div>
      `
      ;
    }
}

customElements.define('note-list', NoteList);