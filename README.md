# POINT Internal Application

Modern internal business management platform built with Angular 21 and Material Design 3.

## Overview

This application serves as a comprehensive internal system for POINT, replacing legacy tools with a modern, maintainable solution. Built using cutting-edge Angular patterns and Material Design principles, it provides a seamless user experience for managing business operations.

## Key Features

- **Dashboard** - Overview of news, upcoming events, and work time accounts
- **Acquisition Management** - Track and manage business opportunities
- **Skill Management** - Employee skill tracking and development
- **Employee Management** - Comprehensive HR tools
- **Calendar** - Event scheduling and management
- **Time Recording** - Work time tracking and reporting
- **Infrastructure** - System and resource management

## Technology Stack

### Core Framework
- **Angular 21** - Latest Angular framework with standalone components
- **Material Design 3** - Modern UI components with theming support
- **TypeScript** - Type-safe development

### State Management & Data
- **NgRx Signals** - Event-driven state management with signals
- **SignalStore** - Reactive, type-safe store implementation
- **SignalDB** - Offline-first local database with IndexedDB persistence
- **Delta Synchronization** - Efficient data syncing (only loads changes after initial sync)

### Styling
- **Material Design CSS Variables** - Consistent theming across light/dark modes
- **Tailwind CSS** - Responsive layout utilities
- **SCSS** - Custom styling when needed
- **Material Symbols** - Modern icon system

## Architecture Highlights

### Offline-First Approach
The application uses SignalDB for local-first data persistence, ensuring:
- Fast initial load times
- Offline capability
- Reduced backend load through delta synchronization
- Automatic conflict resolution

### Event-Driven State Management
Clean separation of concerns with:
- Separate files for events, reducers, handlers, and computed factories
- Type-safe event handling with NgRx Signals
- Reactive data flow throughout the application

### Design System
Consistent user experience through:
- Company branding (primary color: #c31525)
- Material Design 3 theming
- Dark mode support
- Responsive design patterns

## Development

### Prerequisites
```bash
Node.js >= 18.x
npm >= 9.x
```

### Installation
```bash
npm install
```

### Development Server
```bash
ng serve
```
Navigate to `http://localhost:4200/`. The application will automatically reload on file changes.

### Build
```bash
ng build
```
Production builds are optimized and output to the `dist/` directory.

### Testing
```bash
ng test
```
Unit tests run with [Vitest](https://vitest.dev/).

## Project Structure

```
src/app/
├── core/              # Core services, guards, interceptors
│   └── api/           # API service layer
├── features/          # Feature modules (dashboard, acquisition, etc.)
├── layout/            # Application layout components
└── shared/            # Shared resources
    ├── models/        # Data models and interfaces
    ├── signaldb/      # SignalDB configuration and sync managers
    └── stores/        # NgRx Signal stores
```

## Documentation

Detailed guides for common development tasks:

- [Creating a SignalStore](./resources/signalstore-setup-guide.md) - Step-by-step guide for implementing new stores (Event-based pattern)
- [Reactive Collection Pattern](./resources/signalstore-reactive-pattern.md) - Modern pattern for offline-first stores (Recommended)
- [SignalDB Integration](./resources/signaldb-integration-guide.md) - How to connect stores to offline-first persistence

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Material Design 3](https://material.angular.io/)
- [SignalDB Documentation](https://signaldb.js.org/)
- [NgRx Signals](https://ngrx.io/guide/signals)
