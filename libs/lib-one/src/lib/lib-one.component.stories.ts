import { Story, Meta } from '@storybook/angular';

import { HttpMockModule } from '@nx-example/http-mock';
import { LibTreeMockModule } from '@nx-example/lib-tree';
import { LibOneComponent } from './lib-one.component';
import { LibOneModule } from './lib-one.module';

export default {
  title: 'LibOneComponent',
  component: LibOneComponent
} as Meta<LibOneComponent>;

const DefaultMockSource: Story = () => ({
  moduleMetadata: {
    imports: [
      HttpMockModule.forRoot(),
      LibTreeMockModule.forRoot(),
      LibOneModule.forRoot()
    ]
  }
});

const EndToEndMockSource: Story = () => ({
  moduleMetadata: {
    imports: [
      HttpMockModule.forRoot({ useGlobal: true }),
      LibOneModule.forRoot()
    ]
  }
});

export const DefaultMocks = DefaultMockSource.bind({});

export const EndToEndMocks = EndToEndMockSource.bind({});
