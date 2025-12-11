import { showLoading, hideLoading } from "../../utils";
const loading = document.querySelector("#loading");

class Notes {
  static async getAll() {
    showLoading(loading);
    try {
      const response = await fetch("https://my-json-server.typicode.com/mifahh/notes-app/notesData");
      const responseJson = await response.json();
      return responseJson;
    } catch (error){
      alert(error.message);
    } finally {
      hideLoading(loading);
    }
    // return notesData;
  }

  static async addNote(note) {
    showLoading(loading);
    try {
      const response = await fetch("https://my-json-server.typicode.com/mifahh/notes-app/notesData", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(note),
      });
      const responseJson = await response.json();
      // alert(responseJson.message);
    } catch (error){
      alert(error.message);
    } finally {
      hideLoading(loading);
    }
    // notesData.push(note);
  }

  static async deleteNote(noteId) {
    showLoading(loading);
    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/mifahh/notes-app/notesData/${noteId}`,
        { method: "DELETE" }
      );
      const responseJson = await response.json();
      // alert(responseJson.message);
    } catch(error) {
      alert(error.message);
    } finally {
      hideLoading(loading);
    }
  }

  static async archiveNote(noteId, isArchived){
    try {
      const response = await fetch(`https://my-json-server.typicode.com/mifahh/notes-app/notesData/${noteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({archived: isArchived}),
      });
      const responseJson = await response.json();
      // alert(responseJson.message);
    } catch (error){
      alert(error.message);
    } finally {
      hideLoading(loading);
    }
  }
}

export default Notes;
