# ghost-pipe

## **📋 Pré-Requisitos**  

| Componente       | Versão Recomendada | Link de Download |
|------------------|--------------------|------------------|
| **Java JDK**     | 21+ (LTS)          | [Oracle JDK](https://www.oracle.com/java/technologies/javase-downloads.html) |
| **Maven**        | 3.9+               | [Apache Maven](https://maven.apache.org/download.cgi) |
| **Git**          | 2.40+              | [Git](https://git-scm.com/downloads) |
| **Docker**       | 20.10+             | [Docker](https://www.docker.com/get-started/) |

---

## **🚀 Configuração Inicial**  

### **1. Clone o Repositório**  

```bash
git clone https://github.com/seu-usuario/projeto-spring.git
cd projeto-spring
```

### **2. Verifique as Instalações**

```bash
java -version # Mostrar o JDK 21+
mvn -v        # Deve mostrar o Maven 3.9+
```

```bash
docker run --name postgres-ghostpipe \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=senha \
  -e POSTGRES_DB=ghostpipe_db \
  -p 5432:5432 \
  -d postgres:15
```

#### Caso queira rodar localmente

- Precisa criar um banco de dados chamado ghostpipe

- E definir a `senha` e o usuario `root`

Configuração do `applications.properties`

```bash
# PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/ghostpipe_db
spring.datasource.username=admin
spring.datasource.password=senha
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

### **⚡ Executando o Projeto**

Via Terminal

```bash
mvn spring-boot:run
```
