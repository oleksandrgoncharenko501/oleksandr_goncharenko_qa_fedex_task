## 1. Balancing End-to-End Testing with Rapid Delivery

To balance the complexity of microservices with fast development and deployment cycles, a well-known test pyramid approach is used:

Unit → Component  → E2E

Most coverage is achieved through unit, component tests.

E2E tests are limited and focus mainly on critical business flows and key integrations.

## 2. Handling External Resource Downtime

Different strategies are applied depending on the type of dependency:

Internal services: Prefer using real internal services in tests to validate real integrations.

Third-party APIs: Use mocks to provide stable and predictable behavior and avoid failures caused by downtime or inaccessibility.

## 3. Key Decisions and Trade-offs

Test framework is based on the Page Object Model (POM).

API behavior is mocked where needed.

Fixture files are used to initialize required test data and state.

