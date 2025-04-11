package com.ghostPipe.backend.config;

import io.github.cdimascio.dotenv.Dotenv;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
public class DataSourceConfig {

    private final Dotenv dotenv;

    public DataSourceConfig(Dotenv dotenv) {
        this.dotenv = dotenv;
    }

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();

        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUrl(dotenv.get("DB_URL"));
        dataSource.setUsername(dotenv.get("DB_USERNAME"));
        dataSource.setPassword(dotenv.get("DB_PASSWORD"));

        // System.out.println("🌱 DB_URL: " + dotenv.get("DB_URL"));
        // System.out.println("🌱 DB_USERNAME: " + dotenv.get("DB_USERNAME"));
        // System.out.println("🌱 DB_PASSWORD: " + dotenv.get("DB_PASSWORD"));

        return dataSource;
    }
}
