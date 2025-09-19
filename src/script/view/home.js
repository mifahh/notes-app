import Notes from "../data/local/notes.js";

const home = async () => {
  const addNoteFormElement = document.querySelector("add-note-form");
  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteListElement = noteListContainerElement.querySelector("note-list");

  const displayResult = async () => {
    const notesData = await Notes.getAll();
    noteListElement.innerHTML = "";
    notesData.forEach((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note; // mengisi properti note
      noteItemElement.setAttribute('slot', noteItemElement.note.archived ? 'archive' : 'active');
      noteItemElement.addEventListener('click', async () => {
        await displayResult();
      })
      noteListElement.appendChild(noteItemElement);
    });
  };

  addNoteFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();
    const { query } = event.detail;
    await Notes.addNote(query);
    await displayResult();
  });

  await displayResult();
};

export default home;
