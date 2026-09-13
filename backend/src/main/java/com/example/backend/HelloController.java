package com.example.backend;

import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    private final JdbcTemplate jdbc;
    public HelloController(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    @GetMapping("/api/hello")
    public Map<String, Object> hello() {
        Integer result = jdbc.queryForObject("SELECT 1", Integer.class);
        return Map.of("message", "Hello from Spring Boot",
                      "database", result != null && result == 1);
    }
}
