
document.addEventListener("DOMContentLoaded", () => {
    const addNoteBtn = document.getElementById("addNoteBtn");

    const notesContainer = document.getElementById("notesContainer");
  
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  
    function saveNotes() {
      const notes = Array.from(notesContainer.children).map(note => ({
        content: note.querySelector("textarea").value,
        title: note.querySelector("p").value,
        color: note.style.backgroundColor
      }));


      localStorage.setItem("notes", JSON.stringify(notes));

    }
  
    function createNote(content = "", title = "", color = "#ffeb3b") {
      const note = document.createElement("div");
      note.classList.add("note");
      note.style.backgroundColor = color;
  
      note.innerHTML = `
      <p> ${title} </p>
        <textarea>${content}</textarea>
        <div class="controls">
          <button class="colorBtn">Color</button>
          <button class="deleteBtn">Delete</button>
        </div>
      `;
  
      const deleteBtn = note.querySelector(".deleteBtn");
      deleteBtn.addEventListener("click", () => {
        notesContainer.removeChild(note);
        saveNotes();
      });
  
      const colorBtn = note.querySelector(".colorBtn");
      
      colorBtn.addEventListener("click", () => {
        const newColor = prompt("Enter a color (e.g., red, #ff0000, rgb(255,0,0)):") || color;
        note.style.backgroundColor = newColor;
        saveNotes();
      });
  
      note.setAttribute("draggable", true);
      
      note.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", Array.from(notesContainer.children).indexOf(note));
      });
      
      note.addEventListener("dragover", (e) => e.preventDefault());
     
     
      note.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData("text/plain");
        const draggedNote = notesContainer.children[draggedIndex];
        notesContainer.insertBefore(draggedNote, note.nextSibling);
        saveNotes();
      });
  
      const textarea = note.querySelector("textarea");
      textarea.addEventListener("input", saveNotes);
  
      notesContainer.appendChild(note);
      saveNotes();
    }
  
    savedNotes.forEach(note => createNote(note.content, note.title, note.color));

  
    addNoteBtn.addEventListener("click", () => createNote());


  });
  

