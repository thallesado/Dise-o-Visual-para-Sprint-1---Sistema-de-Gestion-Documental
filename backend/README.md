# NexoDocs - Backend API

Sistema de gestión documental y flujo de trabajo clínico desarrollado con Spring Boot 3 y PostgreSQL.

---

## 🛠️ Tecnologías y Versiones

| Tecnología / Librería | Versión | Descripción |
| :--- | :--- | :--- |
| **Java** | 21 | Lenguaje base del backend |
| **Spring Boot** | 3.2.4 | Framework principal |
| **Spring Security** | 6.x | Autenticación y autorización (Stateless JWT) |
| **SpringDoc OpenAPI** | 2.5.0 | Generación de documentación e interfaz Swagger UI |
| **PostgreSQL** | Native (Neon) | Base de datos relacional serverless |
| **Lombok** | Latest | Reducción de código repetitivo |

---

## ⚙️ Configuración Previa de la Base de Datos (Neon)

Antes de iniciar la aplicación, asegúrate de aplicar el cast implícito en PostgreSQL para la compatibilidad del ENUM `user_status` enviado desde Hibernate:

```sql
CREATE CAST (character varying AS user_status) WITH INOUT AS IMPLICIT;

solo si sale un error en status 

## Comandos para iniciar el backend
./mvnw spring-boot:run
## Para verificar las pruebas en tu navegador
http://localhost:8080/swagger-ui/index.html

Si desean ver los datos modificados deben modificar lo siguiente en el archivo application.yml
datasource:
    url: jdbc:enlace que les de neon al crear la base de datos
    username: su usuario de la db
    password: su contraseña de la db

## Primero deben ejecutar las 3 primeras bases de datos 0001_schema.sql,002_security.sql y 003_seed.sql, el ultimo neon no lo ejectura bien , debido a que solo lee postrgres nativo

## Deben realizar la creacion de un usuario antes de usar el login
{
  "tenantId": "20000000-0000-0000-0000-000000000001", este dato deben usar al crear su usuario o cualquiera que se encuentre en la tabla tenant
  "username": "laura.martinez",
  "email": "laura.martinez@ejemplo.com",
  "password": "Password123!",
  "firstName": "Laura",
  "lastName": "Martínez",
  "staffType": "MEDICO",
  "specialty": "Pediatría",
  "professionalLicense": "MP-98765"
}
## Una vez creada pueden iniciar el login con su usuario el tenantId usado
{
  "tenantId": "20000000-0000-0000-0000-000000000001",
  "usernameOrEmail": "laura.martinez",
  "password": "Password123!"
}
## Para la actualizacion de datos del usuario o eliminacion del usuario se realiza mediante el Id del usuario que aparece al crearlo.
## Al ejecutar el Delete les dara la respuesta 204 ,eso significa que se realizo la eliminacion de manera exitosa, pero no desaparecera del tabla user, ya que esta creada con la condicion soft delete (elimina el dato del backend pero en la tabla aun se mantiene)


