import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LibTwoComponent } from './lib-two.component';
import { ItemComponent } from './item/item.component';
import { LibTreeModule, LibTreeService } from '@nx-example/lib-tree';

export default {
  title: 'LibTwoComponent',
  component: LibTwoComponent,
  decorators: [
    moduleMetadata({
      declarations: [ ItemComponent ],
      imports: [
        LibTreeModule.forRoot([ 'hello', 'world' ])
      ]
    })
  ]
} as Meta<LibTwoComponent>;

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


export const NoData = TreeService.bind({});
NoData.args = { dataSet: [] };
