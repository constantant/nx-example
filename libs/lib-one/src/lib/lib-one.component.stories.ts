import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { Observable, of } from 'rxjs';

import { HttpMockModule, HttpMockResponse } from '@nx-example/http-mock';
import { LibOneComponent } from './lib-one.component';
import { LibOneModule } from './lib-one.module';

const getResponse = (m: string, body: unknown) => ({
  match({ method }: HttpRequest<unknown>): boolean {
    return method === m;
  },
  response(): Observable<HttpEvent<unknown>> {
    return of(new HttpResponse({ body }));
  }
});
const items = [ 'hello', 'world' ];
const responses: HttpMockResponse[] = [
  getResponse('GET', items),
  getResponse('POST', items),
  getResponse('GET', [ ...items, ...items ])
];

export default {
  title: 'LibOneComponent',
  component: LibOneComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpMockModule.forRoot({ responses, removeUsed: true }),
        LibOneModule.forRoot()
      ]
    })
  ]
} as Meta<LibOneComponent>;

const TreeService: Story<{ dataSet: string[] }> = ({ dataSet }: { dataSet: string[] }) => {
  // items = dataSet;
  return {};
};


export const Primary = TreeService.bind({});
Primary.args = { dataSet: [ 'hello', 'world' ] };
