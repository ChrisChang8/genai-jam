package com.conygre.spring.boot;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@Profile("!test") // here to fix a bug in swagger since swagger messes up the test class
public class SwaggerConfig {
    
    @Bean
    public OpenAPI albumOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Album REST API with OpenAPI")
                        .description("This API allows you to interact with albums. It is a CRUD API")
                        .contact(new Contact()
                                .name("Nick Todd")
                                .url("http://www.conygre.com")
                                .email("nick.todd@conygre.com")));
    }
}
