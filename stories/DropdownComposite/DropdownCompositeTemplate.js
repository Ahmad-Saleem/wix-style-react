import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';

import DropdownComposite from '../../src/DropdownComposite';
import Dropdown from '../../src/Dropdown';
import Label from '../../src/Label';

export default class Form extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    withLabel: PropTypes.bool,
    label: PropTypes.object,
    input: PropTypes.object,
    required: PropTypes.bool,
    info: PropTypes.string
  };

  state = {
    value: ''
  };

  componentDidUpdate(props) {
    props.onChange(reactElementToJSXString(this.getComponent()));
  }

  componentDidMount() {
    this.props.onChange(reactElementToJSXString(this.getComponent()));
  }

  getComponent() {
    return (
      <DropdownComposite required={this.props.required} info={this.props.info}>
        {this.props.withLabel ? <Label for="firstName" {...this.props.label}/> : null}
        <Dropdown
          id="firstName"
          {...this.props.input}
          value={this.state.value}
          options={[{id: 0, value: 'Option 1'},
            {id: 1, value: 'Option 2'}]}
          onChange={e => this.setState({value: e.target.value})}
          />
      </DropdownComposite>
    );
  }

  render() {
    return this.getComponent();
  }
}
