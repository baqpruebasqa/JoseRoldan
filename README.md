## Instalación
Requiere PHP 8.1, Composer y Node

1. Descargar
2. Cambiar el nombre del archivo `.env.example` a `.env` y configurar el acceso a la base de datos
3. En el terminal, dirigirse a la raíz de la carpeta del proyecto y ejecutar: `composer install`
5. Correr el comando `php artisan key:generate` para generar la clave de encriptación
6. Ejecutar las migraciones con `php artisan migrate --seed`
7. Ejecutar el servidor local con `php artisan serve`
8. Abrir otra terminal y dirigirse a la carpeta `react`
9. Cambiar el nombre del archivo `.env.example` a `.env` y configurar el parametro `VITE_API_BASE_URL`
9. Ejecutar `npm install` para instalar las dependencias
10. Ejecutar `npm run dev` para ejecutar el proyecto
