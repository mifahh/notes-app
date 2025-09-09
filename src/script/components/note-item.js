import Notes from "../data/local/notes.js";
class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = null;
  _clickEvent = 'click';

  constructor(){
    super();

    this._shadowRoot = this.attachShadow({mode:'open'});
    this._style = document.createElement('style');

    this.render();
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }

  _updateStyle(){
    this._style.textContent = `
      .note-card {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        padding: 20px 18px 16px 18px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-height: 180px;
        transition: box-shadow 0.2s;
      }

      .note-card h1 {
        font-size: 1.15rem;
        font-weight: 700;
        color: #2563eb;
        margin: 0 0 8px 0;
        word-break: break-word;
      }

      .note-card textarea {
        width: 100%;
        border: none;
        background: #f3f6fa;
        border-radius: 8px;
        padding: 10px;
        font-size: 1rem;
        color: #333;
        resize: none;
        min-height: 80px;
        outline: none;
        box-sizing: border-box;
      }
    `;
  }

  connectedCallback(){
    this._shadowRoot.querySelector('#deleteNote').addEventListener('click', this._onClickEvent.bind(this));
  }

  disconnectedCallback(){
    this._shadowRoot.querySelector('#deleteNote').removeEventListener('click',  this._onClickEvent.bind(this));
  }

  async _onClickEvent(){
    if (!this._note) return;
    const noteId = this._note.id;
    await Notes.deleteNote(noteId);
    this.dispatchEvent(new Event(this._clickEvent));
  }

  render() {
    this._updateStyle();
    if (!this._note) return;

    this._shadowRoot.innerHTML = `
      ${this._style.outerHTML}
      <h1>${this._note.title}</h1>
      <h2>${this._note.createdAt}</h2>
      <p readonly>${this._note.body}</p>
      <button id=deleteNote>hapus</button>
    `;
  }
}

customElements.define('note-item', NoteItem);