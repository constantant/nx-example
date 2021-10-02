import { HttpRequest } from '@angular/common/http';
import { Story, Meta } from '@storybook/angular';

import { Subject, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { HTTP_MOCK_OUTSIDE_IN, HTTP_MOCK_OUTSIDE_OUT, HttpMockCatcher, HttpMockModule } from '@nx-example/http-mock';
import { LibTreeMockModule } from '@nx-example/lib-tree';
import { LibTwoComponent } from './lib-two.component';
import { LibTwoModule } from './lib-two.module';

const httpMockOutsideIn = new Subject<HttpRequest<unknown>>();
const httpMockOutsideOut = httpMockOutsideIn.pipe(
  switchMap((req: HttpRequest<unknown>) => {
    let httpMockCatcher;
    if ((httpMockCatcher = (window as HttpMockCatcher)?.httpMockCatcher)) {
      return httpMockCatcher(req);
    }
    return throwError(`Http Mock Catcher for ${req.method} ${req.url} was not set`);
  })
);

export default {
  title: 'LibTwoComponent',
  component: LibTwoComponent
} as Meta<LibTwoComponent>;

const DefaultMockSource: Story = () => ({
  moduleMetadata: {
    imports: [
      HttpMockModule.forRoot(),
      LibTreeMockModule.forRoot(),
      LibTwoModule.forRoot()
    ]
  }
});

const EndToEndMockSource: Story = () => ({
  moduleMetadata: {
    imports: [
      HttpMockModule.forRoot(),
      LibTwoModule.forRoot()
    ],
    providers: [
      {
        provide: HTTP_MOCK_OUTSIDE_IN,
        useValue: httpMockOutsideIn
      },
      {
        provide: HTTP_MOCK_OUTSIDE_OUT,
        useValue: httpMockOutsideOut
      }
    ]
  }
});

export const DefaultMocks = DefaultMockSource.bind({});

export const EndToEndMocks = EndToEndMockSource.bind({});
