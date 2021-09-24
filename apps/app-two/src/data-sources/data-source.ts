import { HttpMockModule } from '@nx-example/http-mock';
import { LibTreeMockModule } from '@nx-example/lib-tree';

export const dataSourceModules = [
  HttpMockModule.forRoot(),
  LibTreeMockModule.forRoot()
];
