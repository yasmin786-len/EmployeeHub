package com.example.employeemanagement;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

/**
 * Basic smoke test to ensure the Spring application context loads.
 * Uses an H2-like override note: if you don't have MySQL running during
 * a pure unit test pass, point this at a test profile/datasource as needed.
 */
@SpringBootTest
@TestPropertySource(properties = {
        "spring.jpa.hibernate.ddl-auto=none"
})
class EmployeeManagementApplicationTests {

    @Test
    void contextLoads() {
        // Verifies the Spring context starts up without errors.
    }

}
