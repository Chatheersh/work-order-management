# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## WorkOrderTaskRowComponent

A small presentational component to render a WorkOrderTask as a row with a checkbox.

Usage:

<pre>
&lt;app-work-order-task-row
  *ngFor="let t of tasks | orderBy:'order'"
  [task]="t"
  (toggled)="onTaskToggled($event)"
&gt;&lt;/app-work-order-task-row&gt;
</pre>

Notes:
- Tasks should be ordered by their `order` field before rendering. The component itself does not sort.
- The component emits `toggled` with the updated task when the user toggles completion. The change is persisted via WorkOrderTaskService.

