import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LibTwoComponent } from './lib-two.component';
import { ItemComponent } from './item/item.component';
import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpMockModule, HttpMockResponse } from '@nx-example/http-mock';
import { LibTwoModule } from './lib-two.module';

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
  title: 'LibTwoComponent',
  component: LibTwoComponent,
  decorators: [
    moduleMetadata({
      declarations: [ ItemComponent ],
      imports: [
        HttpMockModule.forRoot({ responses, removeUsed: true }),
        LibTwoModule.forRoot()
      ]
    })
  ]
} as Meta<LibTwoComponent>;

const TreeService: Story<{ dataSet: string[] }> = ({ dataSet }: { dataSet: string[] }) => {
  // items = dataSet;
  return {};
};


export const Primary = TreeService.bind({});
Primary.args = { dataSet: [ 'hello', 'world' ] };
