import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { bookTitles, authorNames } from '../fake_data';

interface ComponentState {
  author: string;
  title: string;
  pageCount: number;
}

@Component({
  selector: 'book1',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: flex;
        max-width: 260px;
        flex-direction: column;
        border: green 1px solid;
        border-radius: 10px;
        padding: 4px;
      }
      .pageCount {
        display: flex;
        align-items: baseline;
      }
      .add {
        margin-left: 10px;
      }
      svg {
        fill: lightgrey;
      }
      .book-image {
        position: relative;
      }
      .display-title {
        position: absolute;
        color: #7b1fa2;
        top: 100px;
        left: 40px;
        width: 160px;
        overflow-wrap: break-word;
      }
      .display-page-count {
        position: absolute;
        top: 240px;
        left: 40px;
        width: 160px;
        overflow-wrap: break-word;
        color: rgba(0, 0, 0, 0.6);
      }
    `,
  ],
  template: ` <mat-form-field color="primary" appearance="outline">
      <mat-label>Title</mat-label>
      <input
        matInput
        autocomplete="off"
        [ngModel]="getTitle() | async"
        (ngModelChange)="updateTitle($event)"
      />
    </mat-form-field>
    <br />
    <div class="pageCount">
      <mat-form-field color="primary" appearance="outline">
        <mat-label>Number of pages</mat-label>
        <input
          matInput
          autocomplete="off"
          [ngModel]="getPageCount() | async"
          (ngModelChange)="updatePageCount($event)"
        />
      </mat-form-field>
      <button
        mat-mini-fab
        class="add"
        color="accent"
        (click)="increasePageCount()"
      >
        <mat-icon>plus_one</mat-icon>
      </button>
    </div>
    <div class="book-image">
      <svg
        width="max-width"
        height="318"
        viewBox="0 0 40 49"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.405 48.9773H32.064C33.442 48.9773 34.564 47.8563 34.564 46.4773V43.1683C34.721 43.2243 34.887 43.2603 35.063 43.2603H37.393C38.771 43.2603 39.893 42.1393 39.893 40.7603V3.01027C39.893 1.63127 38.771 0.510269 37.393 0.510269H8.734C7.795 0.510269 6.661 0.960269 5.978 1.60527C5.951 1.6306 5.92498 1.65695 5.9 1.68427L1.298 6.71427C0.935999 7.11027 0.851999 7.64327 0.986999 8.12527C0.935136 8.32182 0.907596 8.524 0.904999 8.72727V46.4773C0.904999 47.8563 2.026 48.9773 3.405 48.9773ZM32.064 47.186H2.666V27.6556V8.12527H19.773H32.064L32.065 27.6023L32.064 47.186ZM7.405 3.01027C10.749 2.25327 10.904 2.01027 8.734 2.51027L38 2.51028V21.5V41.5H34.564L34.565 8.72727C34.565 7.34827 33.443 6.22727 32.065 6.22727L3.893 6.49999L7.405 3.01027Z"
        />
      </svg>
      <h3 class="display-title">{{ getDisplayTitle() | async }}</h3>
      <h5 class="display-page-count">
        {{ getPageCount() | async }} pages of awesomeness
      </h5>
    </div>
    <pre>
      Local State:
  {{ localState$ | async | json }}
  </pre
    >`,
})
export class Book1Component extends ComponentStore<ComponentState> {
  readonly localState$ = this.state$;

  readonly getTitle = this.selector((state) => state.title);
  readonly getAuthor = this.selector((state) => state.author);
  readonly getDisplayTitle = this.selector(
    this.getTitle,
    this.getAuthor,
    (title, author) => author && `${title} by ${author}`
  );
  readonly getPageCount = this.selector((state) => state.pageCount);

  constructor() {
    super({ author: authorNames[0], title: bookTitles[0], pageCount: 0 });
  }

  updateTitle(title: string) {
    this.setState((state) => ({ ...state, title }));
  }

  updatePageCount(pageCount: string) {
    this.setState((state) => ({ ...state, pageCount: Number(pageCount) }));
  }

  increasePageCount() {
    this.setState((state) => ({
      ...state,
      pageCount: (state.pageCount || 0) + 1,
    }));
  }
}