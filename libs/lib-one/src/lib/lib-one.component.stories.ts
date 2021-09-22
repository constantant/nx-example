import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LibOneComponent } from './lib-one.component';
import { LibTreeModule, LibTreeService } from '@nx-example/lib-tree';

export default {
  title: 'LibOneComponent',
  component: LibOneComponent,
  decorators: [
    moduleMetadata({
      imports: [
        LibTreeModule.forRoot([ 'hello', 'world' ])
      ]
    })
  ]
} as Meta<LibOneComponent>;

const TreeService: Story<{ dataSet: string[] }> = ({ dataSet }: { dataSet: string[] }) => ({
  moduleMetadata: {
    providers: [
      {
        provide: LibTreeService,
        useValue: new LibTreeService(dataSet)
      }
    ]
  }
});


export const Primary = TreeService.bind({});
Primary.args = { dataSet: [ 'hello', 'world' ] };
