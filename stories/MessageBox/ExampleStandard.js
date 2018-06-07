/* eslint-disable react/prop-types */
import React from 'react';

import {
  MessageBoxMarketerialLayout,
  MessageBoxFunctionalLayout
} from 'wix-style-react/MessageBox';
import Button from 'wix-style-react/Button';


const MarketerialLayoutExample = props =>
  <MessageBoxMarketerialLayout
    title="Looking Good!"
    content="You're doing great as ever"
    theme="blue"
    imageUrl="https://static.wixstatic.com/media/9ab0d1_8f1d1bd00e6c4bcd8764e1cae938f872~mv1.png"
    primaryButtonLabel="Got It"
    secondaryButtonLabel="Do something else"
    onPrimaryButtonClick={props.log('You clicked "Got It"')}
    onSecondaryButtonClick={props.log('You clicked "Do something else"')}
    onClose={props.onClose}
    />;


const FunctionalLayoutExample = props =>
  <MessageBoxFunctionalLayout
    title="Look at me please!"
    primaryButtonLabel="Got It"
    confirmText="Confirm"
    cancelText="Cancel"
    theme="blue"
    onCancel={props.log('You clicked "Cancel"')}
    onOk={props.log('You clicked "Confirm"')}
    onClose={props.onClose}
    >
    I am a confirmation dialog and have red or blue themes
  </MessageBoxFunctionalLayout>;


export default class ControlledMessageBoxes extends React.Component {
  state = {layout: ''};

  layouts = {
    MessageBoxMarketerialLayout: <MarketerialLayoutExample/>,
    MessageBoxFunctionalLayout: <FunctionalLayoutExample/>
  }

  buttonsStyles = {
    display: 'inline-flex',
    justifyContent: 'space-between',
    minWidth: '700px',
    padding: '30px'
  }

  render() {
    const activeLayout = this.layouts[this.state.layout];

    return (
      <div>
        <div style={this.buttonsStyles}>
          { Object.keys(this.layouts).map(key =>
            React.createElement(Button, {
              key,
              onClick: () => this.setState({layout: key}),
              children: `Preview <${key}/>`
            })
          )
          }
        </div>

        { activeLayout ?
          React.cloneElement(activeLayout, {
            log: text => () => console.log(text),
            onClose: () => this.setState({layout: ''})
          }) :
          null
        }
      </div>
    );
  }
}
