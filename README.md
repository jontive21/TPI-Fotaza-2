# Proyecto Fotaza 2

Este es el Trabajo Práctico Integrador (TPI) para la materia Programación Web II. Se trata de una plataforma web que permite almacenar, buscar, comentar y valorar fotografías compartidas por la comunidad.

## 🌐 Demo en Producción

🔗 **https://tpi-fotaza-jontive.onrender.com/fotazas**

> ⚠️ **Nota:** La aplicación está alojada en el plan gratuito de Render. Si no se usa por un tiempo, el servidor se "duerme" y la primera visita puede tardar aproximadamente 50 segundos en cargar.

---

## 🛠️ Tecnologías Utilizadas

* **Backend:** Node.js, Express.
* **Frontend (Vistas):** Pug (renderizado en el servidor).
* **Base de Datos:** MySQL gestionado a través del ORM Sequelize.
* **Base de Datos en Producción:** Aiven Cloud (MySQL con conexión SSL).
* **Hosting:** Render.
* **Otros:** Dotenv (para variables de entorno).

---

## ⚙️ Instrucciones de Instalación y Ejecución Local

Para poder evaluar el proyecto localmente, siga estrictamente estos pasos:

1. **Clonar el repositorio:**

        git clone <URL_DEL_REPOSITORIO>
        cd TPI-Fotaza-2

2. **Instalar las dependencias:**

        npm install

3. **Configurar las Variables de Entorno:**
   * El proyecto requiere el uso de variables de entorno para funcionar.
   * En la raíz del proyecto, encontrará un archivo llamado `.env.example`.
   * Duplique ese archivo, renómbrelo a `.env` y complete los datos con sus credenciales locales de MySQL (usuario, contraseña, base de datos `fotaza_db` y host `127.0.0.1`).

4. **Inicializar la Base de Datos:**
   * Asegúrese de tener su servidor MySQL (ej. XAMPP) encendido.
   * Ejecute el siguiente comando para crear las tablas automáticamente en la base de datos:

        npm run db:init

5. **Iniciar la Aplicación:**
   * Levante el servidor web ejecutando:

        npm start

   * La aplicación quedará accesible abriendo en su navegador: **http://localhost:3000/fotazas**.

---

## 🗄️ Inicialización de la Base de Datos

Para que el proyecto funcione correctamente, la base de datos debe ser inicializada. Puede hacerlo de dos formas:

### Opción 1: Mecanismo automático (Recomendado)

Asegúrese de tener el servidor MySQL encendido y las credenciales configuradas en su archivo `.env`. Luego, ejecute en la terminal el siguiente comando para que el ORM cree las tablas:

    npm run db:init

### Opción 2: Restauración mediante Script SQL (Backup)

En la raíz de este repositorio se incluye un archivo de copia de seguridad llamado **`backup_fotaza.sql`**. Este archivo contiene:

* ✅ La estructura completa de las tablas (`fotazas` y `comentarios`)
* ✅ 5 fotazas de prueba con imágenes reales
* ✅ 8 comentarios de ejemplo distribuidos en las fotazas
* ✅ Datos realistas para evaluar el sistema de forma inmediata

**Para importar el backup:**

1. Abra su gestor de bases de datos favorito (phpMyAdmin, DBeaver, MySQL Workbench)
2. Cree una base de datos llamada `fotaza_db`
3. Importe el archivo `backup_fotaza.sql` desde la raíz del proyecto
4. Las tablas y datos se crearán automáticamente

---

## ☁️ Despliegue en Producción (Render + Aiven)

El proyecto está desplegado en **Render** con base de datos **Aiven Cloud MySQL**. Las variables de entorno en producción deben configurarse en el panel de Render:

    NODE_ENV=production
    DB_USERNAME=avnadmin
    DB_PASSWORD=tu_password_de_aiven
    DB_NAME=defaultdb
    DB_HOST=tu-host.aivencloud.com
    DB_PORT=14298
    DB_DIALECT=mysql
    PORT=10000

La conexión SSL está configurada automáticamente en `config/config.js` para el entorno de producción, ya que Aiven requiere conexión cifrada obligatoria.

---

## 👥 Sistema de Roles y Simulación de Sesión

Para cumplir con el requerimiento de que solo los usuarios registrados puedan interactuar con el contenido, se implementó un sistema de **simulación de sesiones** muy sencillo y amigable para la evaluación:

### 🎭 Roles disponibles:

#### 1. Visitante Anónimo (Por defecto al entrar)
* **Permisos:** Solo lectura
* **Puede:** Ver el listado de imágenes y utilizar el buscador por título o etiquetas
* **No puede:** Los botones de interacción están ocultos

#### 2. Usuario Registrado (Simulado)
* **Cómo activarlo:** En la barra superior, haga clic en **"Simular Ingreso de Usuario"**
* **Permisos:** Acceso completo
* **Puede:**
  - ✅ Agregar nuevas fotazas
  - ✅ Editar fotazas existentes
  - ✅ Eliminar fotazas
  - ✅ Votar fotazas
  - ✅ Comentar en fotazas
  - ✅ Denunciar contenido
* **Cómo desactivarlo:** Haga clic en **"Simular Cierre de Sesión"**

> **Nota técnica:** Este sistema de simulación fue implementado para cumplir con el requerimiento de roles sin requerir un sistema completo de autenticación con JWT o sesiones, ya que el enfoque del TPI estaba en el desarrollo backend con MVC y ORM. Se utiliza una variable global (`global.usuarioLogueado`) que se pasa a las vistas Pug mediante `res.locals`.

---

## 🛣️ Documentación de Rutas (Endpoints)

El sistema responde a las siguientes rutas principales configuradas en Express:

* `GET /` : Redirige a la página principal de fotazas.
* `GET /fotazas` : Muestra la página principal con el listado de todas las publicaciones y el buscador.
* `GET /fotazas/create` : Muestra el formulario para subir una nueva imagen.
* `POST /fotazas/create` : Procesa los datos del formulario y guarda la nueva publicación en la base de datos.
* `GET /fotazas/edit/:id` : Muestra el formulario para editar una publicación existente.
* `POST /fotazas/edit/:id` : Actualiza los datos de la publicación seleccionada.
* `POST /fotazas/delete/:id` : Elimina una publicación de forma definitiva.
* `POST /fotazas/votar/:id` : Suma un voto/valoración a la imagen seleccionada.
* `POST /fotazas/denunciar/:id` : Suma una denuncia a la imagen.
* `POST /fotazas/comment` : Guarda un nuevo comentario asociado a una fotografía específica.
* `GET /fotazas/login-simulado` : Activa la variable global para simular el inicio de sesión.
* `GET /fotazas/logout-simulado` : Desactiva la variable global, volviendo al modo visitante.

---

## 📝 Breve Informe de Desarrollo (Problemas y Soluciones)

Durante el desarrollo de este TPI, me encontré con varios desafíos técnicos que logré solucionar de la siguiente manera:

1. **Gestión de Etiquetas:** El requerimiento pedía que una publicación tuviera "1 o más etiquetas". Al principio consideré hacer una relación de "muchos a muchos" con tablas separadas, pero para mantener la simplicidad y robustez del código en este nivel, decidí implementar un campo de texto en el modelo de Fotaza. Allí las etiquetas se guardan separadas por comas, lo cual facilitó mucho implementar el filtro del buscador.

2. **Sistema de Autenticación:** Se pedía restringir las interacciones solo a usuarios registrados. Como el enfoque estaba en el desarrollo backend con MVC y ORM, implementé un middleware simple con una variable global que pasa el estado de la sesión a las vistas Pug (`res.locals.usuarioLogueado`). Esto permitió cumplir la regla de negocio de ocultar/mostrar botones sin requerir una compleja implementación de JWT.

3. **Variables de Entorno y Seguridad:** Hubo dificultades al intentar proteger las claves de MySQL para subirlas a GitHub. Lo resolví instalando el paquete `dotenv`, modificando el `config.js` de Sequelize para que lea desde `process.env`, y documentando la estructura en un archivo `.env.example` para que el código sea seguro y fácil de instalar por terceros.

4. **Migración de Proveedores de Base de Datos (Odisea del Hosting):** Antes de lograr el despliegue estable, experimenté con múltiples servicios de bases de datos en la nube, cada uno con sus propios desafíos:
   - **Railway:** Si bien ofrece una buena experiencia de usuario, el plan gratuito es extremadamente limitado (USD 5 de crédito único) y la base de datos se eliminaba automáticamente después de cierto tiempo sin uso. Esto hizo inviable mantener el proyecto a largo plazo para su evaluación.
   - **TiDB Cloud:** Fue mi primera opción funcional para producción. Sin embargo, presentaba problemas de latencia en las consultas debido a la ubicación geográfica de los servidores (AWS us-east-1) y una compleja configuración de conexión. Además, su modelo de datos Serverless MySQL requería configuraciones específicas que no se integraban bien con las conexiones efímeras de Render.
   - **Neon (PostgreSQL):** Intenté migrar a PostgreSQL para aprovechar las ventajas de Neon, pero esto implicaba cambiar todo el dialecto de Sequelize, modificar las consultas específicas de MySQL (como `Op.like`), y rehacer parte de la lógica del proyecto. El costo de tiempo para adaptar el código fue demasiado alto para un TPI, por lo que decidí mantener MySQL.
   - **Vercel:** Intenté desplegar tanto el backend como la base de datos en Vercel. Sin embargo, Vercel está orientado principalmente a funciones serverless y aplicaciones frontend (Next.js/React). Sus integraciones con bases de datos externas tienen limitaciones importantes para aplicaciones Express tradicionales con conexiones persistentes, lo que causaba errores de conexión constantes.

5. **Conexión SSL con Aiven Cloud:** Finalmente, **Aiven Cloud** fue la solución definitiva. Ofrece un plan gratuito generoso con MySQL persistente. El desafío fue que Aiven requiere conexión SSL obligatoria. Lo resolví configurando `dialectOptions.ssl` con `require: true` y `rejectUnauthorized: false` en el archivo `config/config.js`, exclusivamente para el entorno de producción. Esto permitió establecer una conexión segura y estable con la base de datos.

6. **Case Sensitivity en MySQL (Linux):** Al desplegar en Render (que usa Linux), Sequelize buscaba las tablas con nombres en mayúsculas (`Fotazas`) pero MySQL en Linux es case-sensitive y las creaba en minúsculas. Lo solucioné agregando `tableName: 'fotazas'` y `freezeTableName: true` en los modelos de Sequelize para forzar nombres exactos en minúsculas.

7. **Doble Instancia de Sequelize:** Inicialmente se creaban dos instancias de Sequelize por separado (una en `app.js` y otra en `models/index.js`), lo que causaba que las tablas sincronizadas no fueran accesibles desde los modelos. La solución fue unificar el uso de una sola instancia importándola desde `models/index.js` en `app.js`.

---

## 📦 Estructura del Proyecto

    TPI-Fotaza-2/
    ├── config/
    │   └── config.js          # Configuración de Sequelize (dev/test/production)
    ├── controllers/
    │   ├── fotazaController.js
    │   └── comentarioController.js
    ├── models/
    │   ├── index.js           # Configuración de modelos Sequelize
    │   ├── fotaza.js
    │   └── comentario.js
    ├── routes/
    │   └── fotazaRoutes.js
    ├── views/
    │   ├── listaFotazas.pug
    │   ├── nuevaFotaza.pug
    │   └── editarFotaza.pug
    ├── public/                # Archivos estáticos (CSS, imágenes)
    ├── .env                   # Variables de entorno (NO subir a GitHub)
    ├── .env.example           # Ejemplo de variables de entorno
    ├── backup_fotaza.sql      # Script SQL de backup con datos de prueba
    ├── app.js                 # Punto de entrada de la aplicación
    ├── package.json
    └── README.md

---

## 👥 Autor

* **José Ontiveros** - [jontive21](https://github.com/jontive21)

## 📄 Licencia

Proyecto educativo - Programación Web II