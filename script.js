const boton = document.querySelector("#addContact");
const contactList = document.querySelector("#contactList");
const contactNameInput = document.querySelector("#contactName");
let contactos = JSON.parse(localStorage.getItem("contactos")) || [];

// Mostrar los contactos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  contactos.forEach((contacto) => {
    agregarContactoLista(contacto);
  });
  actualizarContador();
});

boton.addEventListener("click", () => {
  let inputValue = contactNameInput.value.trim();

  if (inputValue && !contactos.includes(inputValue)) {
    contactos.push(inputValue);
    localStorage.setItem("contactos", JSON.stringify(contactos));
    agregarContactoLista(inputValue);
    contactNameInput.value = ""; // Limpiar el campo de texto
    console.log(contactos);
    actualizarContador();
  } else {
    alert("El campo no puede estar vacío o el contacto ya existe.");
  }
});

function agregarContactoLista(inputValue) {
  const li = document.createElement("li");
  li.textContent = inputValue;

  const buttonEdit = document.createElement("button");
  buttonEdit.textContent = "Editar";
  buttonEdit.addEventListener("click", () => editarElemento(li, inputValue));

  const buttonDelete = document.createElement("button");
  buttonDelete.textContent = "Eliminar";
  buttonDelete.addEventListener("click", () =>
    eliminarElemento(li, inputValue)
  );

  li.appendChild(buttonEdit);
  li.appendChild(buttonDelete);

  contactList.appendChild(li);
}

function eliminarElemento(li, contacto) {
  const index = contactos.indexOf(contacto);
  if (index > -1) {
    contactos.splice(index, 1);
    localStorage.setItem("contactos", JSON.stringify(contactos));
    contactList.removeChild(li);
    console.log(contactos);
    actualizarContador();
  }
}

function editarElemento(li, oldValue) {
  // Crear un campo de entrada y los botones "Guardar" y "Cancelar"
  const input = document.createElement("input");
  input.type = "text";
  input.value = oldValue;

  const buttonSave = document.createElement("button");
  buttonSave.textContent = "Guardar";
  buttonSave.addEventListener("click", () =>
    guardarEdicion(li, input.value, oldValue)
  );

  const buttonCancel = document.createElement("button");
  buttonCancel.textContent = "Cancelar";
  buttonCancel.addEventListener("click", () => cancelarEdicion(li, oldValue));

  // Limpiar el contenido del <li>
  li.innerHTML = "";

  // Agregar el campo de entrada y los botones "Guardar" y "Cancelar"
  li.appendChild(input);
  li.appendChild(buttonSave);
  li.appendChild(buttonCancel);
}

function cancelarEdicion(li, oldValue) {
  // Revertir el campo de entrada al valor original y restaurar los botones
  li.innerHTML = "";

  agregarContactoLista(oldValue);
}

function guardarEdicion(li, newValue, oldValue) {
  newValue = newValue.trim();

  if (newValue && !contactos.includes(newValue)) {
    const index = contactos.indexOf(oldValue);
    if (index > -1) {
      contactos[index] = newValue;
      localStorage.setItem("contactos", JSON.stringify(contactos));

      // Limpiar el <li> y volver a agregar el texto y los botones
      li.innerHTML = "";
      li.textContent = newValue;

      const buttonEdit = document.createElement("button");
      buttonEdit.textContent = "Editar";
      buttonEdit.addEventListener("click", () => editarElemento(li, newValue));

      const buttonDelete = document.createElement("button");
      buttonDelete.textContent = "Eliminar";
      buttonDelete.addEventListener("click", () =>
        eliminarElemento(li, newValue)
      );

      li.appendChild(buttonEdit);
      li.appendChild(buttonDelete);

      console.log(contactos);
      actualizarContador();
    }
  } else {
    alert("El campo no puede estar vacío o el contacto ya existe.");
  }
}

function actualizarContador() {
  const counterElement = document.querySelector("#contactCount");
  if (!counterElement) {
    const count = document.createElement("p");
    count.id = "contactCount";
    document.getElementById("app").appendChild(count);
  }
  document.querySelector(
    "#contactCount"
  ).textContent = `Total de contactos: ${contactos.length}`;
}

// Ordenar contactos
function ordenarContactos() {
  contactos.sort();
  localStorage.setItem("contactos", JSON.stringify(contactos));

  // Limpiar la lista y volver a agregar los contactos ordenados
  contactList.innerHTML = "";
  contactos.forEach((contacto) => agregarContactoLista(contacto));
}

// Agregar un botón para ordenar la lista
const buttonSort = document.createElement("button");
buttonSort.textContent = "Ordenar Contactos";
buttonSort.addEventListener("click", ordenarContactos);
document.getElementById("app").appendChild(buttonSort);
