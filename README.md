# NodejsApplication
Learning to create an app using Nodejs and Mysql.


Module's Function:

**express**:
Framework de node utiliado para agilizar el codigo de backend.

**express-handlebars**:
Motor de plantillas handlebars integrado a nodeJS.

**express-session**:
Administra las sesiones de la aplicacion.

**mysq**:
Modulo necesario para conectarnos a la base de datos mysql

**express-mysql-session**:
Ayuda a guardar las sessiones dentro de la BD.

**morgan**:
Permite mostrar en consola, las peticiones HTTP.

**bcryptjs**:
Ayudara a cifrar los passwords antes de guardarlos en la BD.

**passport**:
Tiene diferentes metodos de autenticacion disponibles.

**passport-local**:
Complemento de passport para autenticas usuarios
con nuestra propia BD.

**timeago.js**:
Permite convertir los timestamps o dates de la BD a formato
'2 minutes ago','2 hours ago', etc.

**connect-flash**:
Se va a utilizar para mostrar mensajes de error o exito
cuando el usuario realice una operacion.

**express-validator**:
modulo para validar los datos que el usuario envia desde la aplicacion cliente.
-------------------------------------------------------------------------------
--------------- Descripcion de las carpetas/archivos --------------------------


- **database** : Almacena el scrip de la BD.
	
- **lib**: Almacenará el handlebars.js, encargado de tener funciones usadas para las vistas.
	
- **public**: Carpeta de acceso púbico, ahi se encontrará el style.css
	
- **routes**: contiene métodos GET Y POST (links.js),
			  contiene métodos de autenticación (authentication.js)
			  ruta por defecto para mostrar un mensaje si el servidor está funcionando (index.js)
	
- **views**: contiene una carpeta layouts -> contiene el header de la aplicación.
			 contiene una carpeta links -> contiene las vistas.hbm
			 contiene una carpeta partials -> almacenará el html del navbar.
	
- **database.js**: Contiene la conexión a la BD.
	
- **keys.js**: Contiene un objeto que contiene la info necesaria para una conexión con la BD.
	
- **index.js**: Contiene la configuración y creación del servidor.
	

