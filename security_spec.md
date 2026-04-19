# Security Specification - SaiBalaji Tours and Travelers

## Data Invariants
1. A booking must have a name, phone, and travel location.
2. A booking must have a `createdAt` timestamp set by the server.
3. Bookings cannot be updated or deleted by public users once created.
4. Document IDs for bookings must be valid strings.

## The "Dirty Dozen" Payloads (Deny Cases)
1. Creating a booking with a future timestamp (Identity Integrity).
2. Creating a booking with a missing `location` (Schema/Type check).
3. Creating a booking with an excessively long name (>128 chars) (Resource Poisoning).
4. An unauthenticated user reading all bookings (Query Enforcer).
5. Updating a booking's `location` after it was created (Immortal Field).
6. Deleting a booking by a non-admin (Identity roles).
7. Setting a custom `role` field on a user profile (Self-Assigned Roles).
8. Injecting a massive string into the `bookingId` path variable (Path Variable Hardening).
9. Reading a specific booking document without being the author or admin (PII Isolation).
10. Listing bookings without any filters (Secure List Queries).
11. Creating a booking with a `phone` that isn't a string (Type Safety).
12. Attempting a "Shadow Update" adding a `isVerified` field (Shadow Update).

## Test Runner logic (Conceptual)
The rules will be verified against these cases using the emulator or the ESLint plugin.
