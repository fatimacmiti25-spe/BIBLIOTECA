// ======================================================
// SISTEMA DE GESTIÓN DE BIBLIOTECA ESCOLAR
// Archivo único para todas las páginas
// ======================================================


// ======================================================
// DATOS GUARDADOS
// ======================================================

let libros = JSON.parse(localStorage.getItem("libros")) || [];
let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
let prestamos = JSON.parse(localStorage.getItem("prestamos")) || [];


// ======================================================
// FUNCIONES PARA GUARDAR
// ======================================================

function guardarLibros() {
    localStorage.setItem("libros", JSON.stringify(libros));
}

function guardarAlumnos() {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
}

function guardarPrestamos() {
    localStorage.setItem("prestamos", JSON.stringify(prestamos));
}


// ======================================================
// FECHA ACTUAL
// ======================================================

function obtenerFechaActual() {

    const hoy = new Date();

    const anio = hoy.getFullYear();

    const mes = String(hoy.getMonth() + 1).padStart(2, "0");

    const dia = String(hoy.getDate()).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
}


// ======================================================
// LIBROS
// ======================================================

const botonGuardarLibro = document.getElementById("guardarLibro");

if (botonGuardarLibro) {

    botonGuardarLibro.addEventListener("click", function () {

        const id = document.getElementById("idLibro").value.trim();
        const titulo = document.getElementById("titulo").value.trim();
        const autor = document.getElementById("autor").value.trim();
        const editorial = document.getElementById("editorial").value.trim();
        const edicion = document.getElementById("edicion").value.trim();
        const anio = document.getElementById("anio").value.trim();
        const categoria = document.getElementById("categoria").value;
        const condicion = document.getElementById("condicion").value;


        // Revisar campos
        if (
            id === "" ||
            titulo === "" ||
            autor === "" ||
            editorial === "" ||
            edicion === "" ||
            anio === "" ||
            categoria === ""
        ) {

            alert("Completa todos los campos.");

            return;
        }


        // Revisar ID repetido
        const existe = libros.some(function (libro) {

            return libro.id.toLowerCase() === id.toLowerCase();

        });


        if (existe) {

            alert("Ya existe un libro con ese ID.");

            return;
        }


        // Crear libro
        const nuevoLibro = {

            id: id,

            titulo: titulo,

            autor: autor,

            editorial: editorial,

            edicion: edicion,

            anio: anio,

            categoria: categoria,

            condicion: condicion,

            estado: "Disponible"

        };


        libros.push(nuevoLibro);

        guardarLibros();


        alert("Libro registrado correctamente.");


        // Limpiar formulario
        document.getElementById("idLibro").value = "";
        document.getElementById("titulo").value = "";
        document.getElementById("autor").value = "";
        document.getElementById("editorial").value = "";
        document.getElementById("edicion").value = "";
        document.getElementById("anio").value = "";
        document.getElementById("categoria").value = "";
        document.getElementById("condicion").value = "Buena";


        mostrarLibros();

    });

}


// ======================================================
// MOSTRAR LIBROS
// ======================================================

function mostrarLibros(lista = libros) {

    const tabla = document.getElementById("tablaLibros");

    if (!tabla) {
        return;
    }


    tabla.innerHTML = "";


    lista.forEach(function (libro) {

        const fila = document.createElement("tr");


        fila.innerHTML = `

            <td>${libro.id}</td>

            <td>${libro.titulo}</td>

            <td>${libro.autor}</td>

            <td>${libro.editorial}</td>

            <td>${libro.anio}</td>

            <td>${libro.categoria}</td>

            <td>${libro.condicion}</td>

            <td>

                <button
                    class="accion"
                    onclick="eliminarLibro('${libro.id}')">

                    Eliminar

                </button>

            </td>

        `;


        tabla.appendChild(fila);

    });

}


// ======================================================
// ELIMINAR LIBRO
// ======================================================

function eliminarLibro(id) {

    const libro = libros.find(function (libro) {

        return libro.id === id;

    });


    if (!libro) {
        return;
    }


    // No permitir eliminar un libro prestado
    if (libro.estado === "Prestado") {

        alert("No puedes eliminar un libro que está prestado.");

        return;

    }


    const confirmar = confirm(
        "¿Deseas eliminar este libro?"
    );


    if (!confirmar) {
        return;
    }


    libros = libros.filter(function (libro) {

        return libro.id !== id;

    });


    guardarLibros();


    mostrarLibros();

    mostrarInventario();

}


// ======================================================
// BUSCAR LIBROS
// ======================================================

const buscarLibro = document.getElementById("buscarLibro");


if (buscarLibro) {

    buscarLibro.addEventListener("input", function () {

        const texto =
            buscarLibro.value.toLowerCase();


        const resultado = libros.filter(function (libro) {

            return (

                libro.id.toLowerCase().includes(texto) ||

                libro.titulo.toLowerCase().includes(texto) ||

                libro.autor.toLowerCase().includes(texto)

            );

        });


        mostrarLibros(resultado);

    });

}


// ======================================================
// ALUMNOS
// ======================================================

const botonGuardarAlumno =
    document.getElementById("guardarAlumno");


if (botonGuardarAlumno) {

    botonGuardarAlumno.addEventListener("click", function () {


        const matricula =
            document.getElementById("matriculaAlumno").value.trim();


        const nombre =
            document.getElementById("nombreAlumno").value.trim();


        const carrera =
            document.getElementById("carreraAlumno").value;


        const cuatrimestre =
            document.getElementById("semestreAlumno").value;


        // Validar
        if (
            matricula === "" ||
            nombre === "" ||
            carrera === "" ||
            cuatrimestre === ""
        ) {

            alert("Completa todos los datos del alumno.");

            return;

        }


        // Matrícula repetida
        const existe = alumnos.some(function (alumno) {

            return alumno.matricula.toLowerCase() ===
                   matricula.toLowerCase();

        });


        if (existe) {

            alert("Ya existe un alumno con esa matrícula.");

            return;

        }


        // Crear alumno
        const nuevoAlumno = {

            matricula: matricula,

            nombre: nombre,

            carrera: carrera,

            cuatrimestre: cuatrimestre

        };


        alumnos.push(nuevoAlumno);

        guardarAlumnos();


        alert("Alumno registrado correctamente.");


        // Limpiar
        document.getElementById("matriculaAlumno").value = "";
        document.getElementById("nombreAlumno").value = "";
        document.getElementById("carreraAlumno").value = "";
        document.getElementById("semestreAlumno").value = "";


        mostrarAlumnos();

    });

}


// ======================================================
// MOSTRAR ALUMNOS
// ======================================================

function mostrarAlumnos(lista = alumnos) {

    const tabla =
        document.getElementById("tablaAlumnos");


    if (!tabla) {
        return;
    }


    tabla.innerHTML = "";


    lista.forEach(function (alumno) {


        const fila =
            document.createElement("tr");


        fila.innerHTML = `

            <td>${alumno.matricula}</td>

            <td>${alumno.nombre}</td>

            <td>${alumno.carrera}</td>

            <td>${alumno.cuatrimestre}</td>

            <td>

                <button
                    class="accion"
                    onclick="eliminarAlumno('${alumno.matricula}')">

                    Eliminar

                </button>

            </td>

        `;


        tabla.appendChild(fila);

    });

}


// ======================================================
// ELIMINAR ALUMNO
// ======================================================

function eliminarAlumno(matricula) {


    // Verificar préstamo activo
    const tienePrestamo = prestamos.some(function (prestamo) {

        return (

            prestamo.matricula === matricula &&

            prestamo.estado === "Activo"

        );

    });


    if (tienePrestamo) {

        alert(
            "No puedes eliminar un alumno que tiene un préstamo activo."
        );

        return;

    }


    const confirmar =
        confirm("¿Deseas eliminar este alumno?");


    if (!confirmar) {
        return;
    }


    alumnos = alumnos.filter(function (alumno) {

        return alumno.matricula !== matricula;

    });


    guardarAlumnos();


    mostrarAlumnos();

}


// ======================================================
// BUSCAR ALUMNOS
// ======================================================

const buscarAlumno =
    document.getElementById("buscarAlumno");


if (buscarAlumno) {

    buscarAlumno.addEventListener("input", function () {


        const texto =
            buscarAlumno.value.toLowerCase();


        const resultado =
            alumnos.filter(function (alumno) {


                return (

                    alumno.matricula.toLowerCase().includes(texto) ||

                    alumno.nombre.toLowerCase().includes(texto) ||

                    alumno.carrera.toLowerCase().includes(texto)

                );

            });


        mostrarAlumnos(resultado);

    });

}


// ======================================================
// PRÉSTAMOS
// ======================================================

const matriculaPrestamo =
    document.getElementById("matriculaPrestamo");


const libroPrestamo =
    document.getElementById("libroPrestamo");


// ======================================================
// BUSCAR ALUMNO AUTOMÁTICAMENTE
// ======================================================

if (matriculaPrestamo) {

    matriculaPrestamo.addEventListener("input", function () {


        const matricula =
            matriculaPrestamo.value.trim();


        const alumno =
            alumnos.find(function (alumno) {

                return alumno.matricula.toLowerCase() ===
                       matricula.toLowerCase();

            });


        const nombre =
            document.getElementById("nombrePrestamo");


        if (alumno) {

            nombre.value = alumno.nombre;

        } else {

            nombre.value = "";

        }

    });

}


// ======================================================
// BUSCAR LIBRO AUTOMÁTICAMENTE
// ======================================================

if (libroPrestamo) {

    libroPrestamo.addEventListener("input", function () {


        const id =
            libroPrestamo.value.trim();


        const libro =
            libros.find(function (libro) {

                return libro.id.toLowerCase() ===
                       id.toLowerCase();

            });


        const titulo =
            document.getElementById("tituloPrestamo");


        if (libro) {

            titulo.value = libro.titulo;

        } else {

            titulo.value = "";

        }

    });

}


// ======================================================
// PONER FECHA ACTUAL EN PRÉSTAMO
// ======================================================

const campoFechaPrestamo =
    document.getElementById("fechaPrestamo");


if (campoFechaPrestamo && campoFechaPrestamo.value === "") {

    campoFechaPrestamo.value =
        obtenerFechaActual();

}


// ======================================================
// REGISTRAR PRÉSTAMO
// ======================================================

const botonPrestamo =
    document.getElementById("registrarPrestamo");


if (botonPrestamo) {

    botonPrestamo.addEventListener("click", function () {


        const matricula =
            document.getElementById("matriculaPrestamo").value.trim();


        const idLibro =
            document.getElementById("libroPrestamo").value.trim();


        const fechaPrestamo =
            document.getElementById("fechaPrestamo").value;


        const fechaLimite =
            document.getElementById("fechaLimite").value;


        const observaciones =
            document.getElementById("observacionesPrestamo").value.trim();


        // Campos obligatorios
        if (
            matricula === "" ||
            idLibro === "" ||
            fechaPrestamo === "" ||
            fechaLimite === ""
        ) {

            alert("Completa los datos del préstamo.");

            return;

        }


        // Buscar alumno
        const alumno =
            alumnos.find(function (alumno) {

                return alumno.matricula.toLowerCase() ===
                       matricula.toLowerCase();

            });


        if (!alumno) {

            alert(
                "La matrícula ingresada no está registrada."
            );

            return;

        }


        // Buscar libro
        const libro =
            libros.find(function (libro) {

                return libro.id.toLowerCase() ===
                       idLibro.toLowerCase();

            });


        if (!libro) {

            alert(
                "El ID del libro no está registrado."
            );

            return;

        }


        // Verificar disponibilidad
        if (libro.estado !== "Disponible") {

            alert(
                "El libro no está disponible para préstamo."
            );

            return;

        }


        // Verificar fecha
        if (fechaLimite <= fechaPrestamo) {

            alert(
                "La fecha límite debe ser posterior a la fecha de préstamo."
            );

            return;

        }


        // Crear préstamo
        const nuevoPrestamo = {

            idPrestamo: Date.now(),

            matricula: alumno.matricula,

            nombreAlumno: alumno.nombre,

            idLibro: libro.id,

            tituloLibro: libro.titulo,

            fechaPrestamo: fechaPrestamo,

            fechaLimite: fechaLimite,

            fechaDevolucion: "",

            observaciones: observaciones,

            estado: "Activo"

        };


        prestamos.push(nuevoPrestamo);

        guardarPrestamos();


        // Cambiar estado del libro
        libro.estado = "Prestado";

        guardarLibros();


        alert("Préstamo registrado correctamente.");


        // Limpiar formulario
        document.getElementById("matriculaPrestamo").value = "";
        document.getElementById("nombrePrestamo").value = "";
        document.getElementById("libroPrestamo").value = "";
        document.getElementById("tituloPrestamo").value = "";

        document.getElementById("fechaPrestamo").value =
            obtenerFechaActual();

        document.getElementById("fechaLimite").value = "";

        document.getElementById("observacionesPrestamo").value = "";

    });

}


// ======================================================
// DEVOLUCIONES
// ======================================================

const campoLibroDevolucion =
    document.getElementById("idLibroDevolucion");


// ======================================================
// BUSCAR PRÉSTAMO ACTIVO
// ======================================================

if (campoLibroDevolucion) {

    campoLibroDevolucion.addEventListener("input", function () {


        const idLibro =
            campoLibroDevolucion.value.trim();


        const prestamo =
            prestamos.find(function (prestamo) {

                return (

                    prestamo.idLibro.toLowerCase() ===
                    idLibro.toLowerCase()

                    &&

                    prestamo.estado === "Activo"

                );

            });


        if (prestamo) {

            document.getElementById("tituloDevolucion").value =
                prestamo.tituloLibro;


            document.getElementById("matriculaDevolucion").value =
                prestamo.matricula;


            document.getElementById("nombreDevolucion").value =
                prestamo.nombreAlumno;


            document.getElementById("fechaPrestamoDevolucion").value =
                prestamo.fechaPrestamo;

        } else {

            document.getElementById("tituloDevolucion").value = "";

            document.getElementById("matriculaDevolucion").value = "";

            document.getElementById("nombreDevolucion").value = "";

            document.getElementById("fechaPrestamoDevolucion").value = "";

        }

    });

}


// ======================================================
// FECHA ACTUAL EN DEVOLUCIÓN
// ======================================================

const campoFechaDevolucion =
    document.getElementById("fechaDevolucion");


if (
    campoFechaDevolucion &&
    campoFechaDevolucion.value === ""
) {

    campoFechaDevolucion.value =
        obtenerFechaActual();

}


// ======================================================
// REGISTRAR DEVOLUCIÓN
// ======================================================

const botonDevolucion =
    document.getElementById("registrarDevolucion");


if (botonDevolucion) {

    botonDevolucion.addEventListener("click", function () {


        const idLibro =
            document.getElementById("idLibroDevolucion").value.trim();


        const fechaDevolucion =
            document.getElementById("fechaDevolucion").value;


        const condicion =
            document.getElementById("condicionDevolucion").value;


        const estadoNuevo =
            document.getElementById("estadoDevolucion").value;


        const observaciones =
            document.getElementById("observacionesDevolucion").value.trim();


        if (
            idLibro === "" ||
            fechaDevolucion === "" ||
            condicion === ""
        ) {

            alert(
                "Completa los datos de la devolución."
            );

            return;

        }


        // Buscar préstamo activo
        const prestamo =
            prestamos.find(function (prestamo) {

                return (

                    prestamo.idLibro.toLowerCase() ===
                    idLibro.toLowerCase()

                    &&

                    prestamo.estado === "Activo"

                );

            });


        if (!prestamo) {

            alert(
                "Este libro no tiene un préstamo activo."
            );

            return;

        }


        // Validar fecha
        if (fechaDevolucion < prestamo.fechaPrestamo) {

            alert(
                "La fecha de devolución no puede ser anterior a la fecha del préstamo."
            );

            return;

        }


        // Buscar libro
        const libro =
            libros.find(function (libro) {

                return libro.id.toLowerCase() ===
                       idLibro.toLowerCase();

            });


        if (!libro) {

            alert("No se encontró el libro.");

            return;

        }


        // Actualizar préstamo
        prestamo.estado = "Devuelto";

        prestamo.fechaDevolucion =
            fechaDevolucion;

        prestamo.observacionesDevolucion =
            observaciones;


        guardarPrestamos();


        // Actualizar libro
        libro.condicion = condicion;

        libro.estado = estadoNuevo;


        guardarLibros();


        alert(
            "Devolución registrada correctamente."
        );


        // Limpiar formulario
        document.getElementById("idLibroDevolucion").value = "";

        document.getElementById("tituloDevolucion").value = "";

        document.getElementById("matriculaDevolucion").value = "";

        document.getElementById("nombreDevolucion").value = "";

        document.getElementById("fechaPrestamoDevolucion").value = "";

        document.getElementById("fechaDevolucion").value =
            obtenerFechaActual();

        document.getElementById("condicionDevolucion").value = "";

        document.getElementById("estadoDevolucion").value =
            "Disponible";

        document.getElementById("observacionesDevolucion").value = "";

    });

}


// ======================================================
// INVENTARIO
// ======================================================

function mostrarInventario(lista = libros) {

    const tabla =
        document.getElementById("tablaInventario");


    if (!tabla) {
        return;
    }


    tabla.innerHTML = "";


    lista.forEach(function (libro) {


        const fila =
            document.createElement("tr");


        fila.innerHTML = `

            <td>${libro.id}</td>

            <td>${libro.titulo}</td>

            <td>${libro.autor}</td>

            <td>${libro.editorial}</td>

            <td>${libro.edicion}</td>

            <td>${libro.condicion}</td>

            <td>${libro.estado}</td>

            <td>

                <button
                    class="accion"
                    onclick="eliminarLibro('${libro.id}')">

                    Eliminar

                </button>

            </td>

        `;


        tabla.appendChild(fila);

    });


    actualizarResumenInventario();

}


// ======================================================
// CONTADORES DEL INVENTARIO
// ======================================================

function actualizarResumenInventario() {


    const total =
        document.getElementById("totalLibros");


    const disponibles =
        document.getElementById("librosDisponibles");


    const prestados =
        document.getElementById("librosPrestados");


    const mantenimiento =
        document.getElementById("librosMantenimiento");


    if (total) {

        total.textContent =
            libros.length;

    }


    if (disponibles) {

        disponibles.textContent =
            libros.filter(function (libro) {

                return libro.estado === "Disponible";

            }).length;

    }


    if (prestados) {

        prestados.textContent =
            libros.filter(function (libro) {

                return libro.estado === "Prestado";

            }).length;

    }


    if (mantenimiento) {

        mantenimiento.textContent =
            libros.filter(function (libro) {

                return libro.estado === "En mantenimiento";

            }).length;

    }

}


// ======================================================
// BUSCADOR Y FILTROS DEL INVENTARIO
// ======================================================

const buscarInventario =
    document.getElementById("buscarInventario");


const filtroCondicion =
    document.getElementById("filtroCondicion");


const filtroEstado =
    document.getElementById("filtroEstado");


function filtrarInventario() {


    if (!buscarInventario) {
        return;
    }


    const texto =
        buscarInventario.value.toLowerCase();


    const condicion =
        filtroCondicion.value;


    const estado =
        filtroEstado.value;


    const resultado =
        libros.filter(function (libro) {


            const coincideBusqueda =

                libro.id.toLowerCase().includes(texto)

                ||

                libro.titulo.toLowerCase().includes(texto)

                ||

                libro.autor.toLowerCase().includes(texto);


            const coincideCondicion =

                condicion === "Todos"

                ||

                libro.condicion === condicion;


            const coincideEstado =

                estado === "Todos"

                ||

                libro.estado === estado;


            return (

                coincideBusqueda &&

                coincideCondicion &&

                coincideEstado

            );

        });


    mostrarInventario(resultado);

}


if (buscarInventario) {

    buscarInventario.addEventListener(
        "input",
        filtrarInventario
    );

}


if (filtroCondicion) {

    filtroCondicion.addEventListener(
        "change",
        filtrarInventario
    );

}


if (filtroEstado) {

    filtroEstado.addEventListener(
        "change",
        filtrarInventario
    );

}


// ======================================================
// BOTONES CANCELAR
// ======================================================

const botonesCancelar =
    document.querySelectorAll(".btn-secundario");


botonesCancelar.forEach(function (boton) {

    boton.addEventListener("click", function () {


        const formulario =
            boton.closest(".formulario");


        if (!formulario) {
            return;
        }


        const campos =
            formulario.querySelectorAll(
                "input, textarea, select"
            );


        campos.forEach(function (campo) {

            if (campo.tagName === "SELECT") {

                campo.selectedIndex = 0;

            } else {

                campo.value = "";

            }

        });


        // Volver a colocar fecha actual
        const fechaPrestamo =
            document.getElementById("fechaPrestamo");


        if (fechaPrestamo) {

            fechaPrestamo.value =
                obtenerFechaActual();

        }


        const fechaDevolucion =
            document.getElementById("fechaDevolucion");


        if (fechaDevolucion) {

            fechaDevolucion.value =
                obtenerFechaActual();

        }

    });

});


// ======================================================
// CARGAR TODO AL ENTRAR A CADA PÁGINA
// ======================================================

mostrarLibros();

mostrarAlumnos();

mostrarInventario();