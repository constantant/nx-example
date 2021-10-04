import { Story, Meta } from '@storybook/angular';

import { HttpMockModule } from '@nx-example/http-mock';
import { LibTreeMockModule } from '@nx-example/lib-tree';
import { LibTwoComponent } from './lib-two.component';
import { LibTwoModule } from './lib-two.module';

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
      HttpMockModule.forRoot({ useGlobal: true }),
      LibTwoModule.forRoot()
    ]
  }
});

export const DefaultMocks = DefaultMockSource.bind({});

export const EndToEndMocks = EndToEndMockSource.bind({});
