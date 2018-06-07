import React from 'react';
import {storiesOf} from '@storybook/react';
import {bool, number} from 'prop-types';

import Page from 'wix-style-react/Page';
import Button from 'wix-style-react/Button';

import Breadcrumbs from './Breadcrumbs';
import SomeContentComponent from './SomeContentComponent';
import SomeTailComponent from './SomeTailComponent';


const header = breadcrumbs =>
  <Page.Header
    breadcrumbs={breadcrumbs}
    title="Page Title"
    subtitle="Page subtitle"
    showBackButton
    onBackClicked={() => {}}
    actionsBar={<Button>Action</Button>}
    />;


const content = (showScss, shortContent = false) =>
  <Page.Content>
    <SomeContentComponent showScss={showScss} shortContent={shortContent}/>
  </Page.Content>;


const tail = (
  <Page.Tail>
    <SomeTailComponent/>
  </Page.Tail>
);


class FullPageExample extends React.Component {
  static propTypes = {
    shortContent: bool,
    maxWidth: number,
    sidePadding: number
  }

  render() {
    return (
      <div data-hook="story-page-example">
        <div data-hook="side-bar">Sidebar</div>

        <div data-hook="body-content">
          <div data-hook="top-bar">TopBar</div>

          <Page maxWidth={this.props.maxWidth} sidePadding={this.props.sidePadding}>
            {header(Breadcrumbs)}
            {tail}
            {content(true, this.props.shortContent)}
          </Page>
        </div>
      </div>
    );
  }
}

const displayAdditionalStories = false;
const story = storiesOf('2. Layout', module)
  .add('2.6 + Page Example', () =>
    <FullPageExample/>
  );

if (displayAdditionalStories) {
  story
    .add('2.7 + Page Example with short content', () =>
      <FullPageExample shortContent/>
    )
    .add('2.8 + Page Example with maxWidth', () =>
      <FullPageExample maxWidth={800}/>
    )
    .add('2.9 + Page Example with short content and maxWidth', () =>
      <FullPageExample maxWidth={800} shortContent/>
    )
    .add('2.10 + Page Example with sidePadding', () =>
      <FullPageExample sidePadding={0}/>
    )
    .add('2.11 + Page Example with short content and sidePadding', () =>
      <FullPageExample sidePadding={0} shortContent/>
    )
    .add('2.12 + Page Example with sidePadding and maxWidth', () =>
      <FullPageExample sidePadding={0} maxWidth={800}/>
    )
    .add('2.13 + Page Example with short content sidePadding and maxWidth', () =>
      <FullPageExample sidePadding={0} maxWidth={800} shortContent/>
    );
}
