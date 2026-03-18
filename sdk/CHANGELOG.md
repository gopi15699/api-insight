# Changelog

All notable changes to `api-insight-sdk` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-03-19

### Added

- **`ApiInsightClient`** — Core client with `sendLog()` (fire-and-forget) and `sendLogAsync()` (awaitable)
- **`createMiddleware()`** — Express middleware that automatically captures all 4xx/5xx responses
- **`createErrorMiddleware()`** — Express error middleware that captures unhandled thrown errors with stack traces
- **TypeScript types** — Full type definitions for `LogPayload` and `ApiInsightConfig`
- **Configurable options** — `apiKey`, `host`, `timeout`, `debug`
- **Zero overhead on happy paths** — Only activates on error responses (status >= 400)
- **Fire-and-forget design** — `sendLog()` never throws, never blocks the response path
- **Framework recipes** — Documentation for Express, Fastify, NestJS, and Next.js
