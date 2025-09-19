class AddNoteForm extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    _boundOnFormSubmit = null;
    _submitEvent = 'submit';

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode:'open'});
        this._style = document.createElement('style');
        this._boundOnFormSubmit = (event) => this._onSubmitForm(event);

        this.render();
    }

    _updateStyle(){
        this._style.textContent = `
            #addNoteForm {
              display: flex;
              flex-direction: column;
              gap: 14px;
            }

            #addNoteForm label {
              font-weight: 500;
              margin-bottom: 4px;
              color: #333;
            }

            #addNoteForm input[type="text"],
            #addNoteForm textarea {
              padding: 10px;
              border: 1px solid #d0d0d0;
              border-radius: 6px;
              font-size: 1rem;
              background: #fff;
              resize: vertical;
            }

            #addNoteForm textarea {
              min-height: 70px;
              max-height: 200px;
            }

            #addNoteForm input[type="checkbox"] {
              width: 18px;
              height: 18px;
              accent-color: #4f8cff;
              margin-right: 8px;
            }

            #addNoteForm button[type="submit"] {
              background: #4f8cff;
              color: #fff;
              border: none;
              border-radius: 6px;
              padding: 10px 0;
              font-size: 1rem;
              font-weight: 600;
              cursor: pointer;
              transition: background 0.2s;
            }

            #addNoteForm button[type="submit"]:hover {
              background: #2563eb;
            }
        `;
    }

    connectedCallback(){
        this._shadowRoot.querySelector('form').addEventListener('submit', this._boundOnFormSubmit);
    }

    disconnectedCallback(){
        this._shadowRoot.querySelector('form').removeEventListener('submit',  this._boundOnFormSubmit);
    }

    _onSubmitForm(event){
        event.preventDefault();
        const addNoteFormElement = this._shadowRoot.querySelector('form');
        const query = {
          id: this._generateNoteId(),
          title: addNoteFormElement.querySelector("input#titleForm").value,
          body: addNoteFormElement.querySelector("textarea#descriptionForm").value,
          createdAt: new Date().toISOString(), // timestamp ISO 8601
          archived: false
        };

        if (!query) return;

        this.dispatchEvent(new CustomEvent(this._submitEvent, {
            detail: {query},
            composed: true,
            bubbles: true
        }));
    }

    _generateNoteId() {
        const randomString = () => Math.random().toString(36).substring(2, 8);
        const randomNumber = () => Math.floor(100000 + Math.random() * 900000);
        return `notes-${randomString()}-${randomNumber()}`;
    };

    render(){
        this._updateStyle();
        this._shadowRoot.innerHTML = `
            ${this._style.outerHTML}
            <form id="addNoteForm" class="add-note-form">
                <label for="titleForm">Judul</label>
                <input id="titleForm" type="text">
                <label for="descriptionForm">Deskripsi</label>
                <textarea id="descriptionForm" type="text"></textarea>
                <button type="submit">Tambahkan Catatan</button>
            </form>
        `;

        const titleInput = this._shadowRoot.querySelector('#titleForm');
        if (titleInput) {
            titleInput.addEventListener('input', (event) => {
                if (event.target.value.length > 0) {
                    event.target.style.borderColor = '#2563eb';
                } else {
                    event.target.style.borderColor = '#d0d';
                }
            });
        }
        const descInput = this._shadowRoot.querySelector('#descriptionForm');
        if (descInput) {
            descInput.addEventListener('input', (event) => {
                if (event.target.value.length > 0) {
                    event.target.style.borderColor = '#2563eb';
                } else {
                    event.target.style.borderColor = '#d0d';
                }
            });
        }
    }
}

customElements.define('add-note-form', AddNoteForm);