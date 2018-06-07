# Documenting Components

All components exported by `wix-style-react` are documented and displayed on our [github page](wix-wix-style-react.surge.sh/) (you probably are looking at it now).

It is rendered with [Storybook](https://storybook.js.org).

## Story

**story** is a term we use to describe single page which contains all documentation about component. For
instance, [this page with `<ToggleSwitch/>`](https://github.com/wix/wix-style-react/blob/master/stories/ToggleSwitch.story.js) is a story.

All of what you see in the aforementioned link is generated automatically from component source. The code examples, the list of props, the preview, all of it is done so you don't have to.

All you need is a little configuration.

## Creating a story

Stories are files with `.story.js` extension. These files go through webpack loader which extracts component metadata
and renders it. In order for loader to know what/how to document component, you must provide a configuration object.

## Short example

Let's look again at [`<ToggleSwitch/>` story page](https://github.com/wix/wix-style-react/blob/master/stories/ToggleSwitch.story.js):

```js
import ToggleSwitch from 'wix-style-react/ToggleSwitch'; // 1.

export default { // 2.
  category: '4. Selection', // 3.
  storyName: '4.4 ToggleSwitch', // 4.

  component: ToggleSwitch, // 5.
  componentPath: '../src/ToggleSwitch', // 6.

  componentProps: (setState, getState) => ({ // 7.
    onChange: () => setState({checked: !getState().checked}),
    dataHook: 'storybook-toggleswitch'
  })
};
```

1. `import` component you wish to document
1. `export` a single object which will be treated as story configuration
1. `category` is a name of Storybook sidebar section
1. `storyName` is a name of specific story
1. `component` a reference to component which is to be documented
1. `componentPath` a path to component. This is for parser to know where to start parsing your component
1. `componentProps` an object (or function returning object) which outlines props to be given to `5.` - a component

## Full API (long example)

Scaffold:

```js
// MyStory.story.js

export default {
  // config
}
```

### README

If a `README.md` file is present alongside the component's source, then it will be displayed at the top of the Usage tab (Instead of the automatic component name title, so you need to add a Title in the README)


### Story Configuration Properties
---

#### `category` - `string` required

Name of Storybook "section" under which this story will be placed (e.g. `Core`, `6. Navigation`, `3. Inputs`)

---

#### `storyName` - `string`

Name of the story in sidebar. If omitted, it will use `displayName` of
the component.


---

#### `component` - `ReactNode` required

Reference to react component which will be used in interactive example.
Most often it will be imported component:

```js
import MyComponent from 'wix-style-react/Component';

export default {
  // ... other config
  component: MyComponent
}
```

---

#### `componentPath` - `string` required

A string of relative path to component source. This is required in order
for automatic documentation to know where to start parsing.

Even though just folder is enough, it is better to provide exact path to file.

```js
import MyComponent from './src/components/MyComponent';

export default {
  // ... other config
  component: MyComponent,
  componentPath: './src/components/MyComponent/index.js'
}
```

NOTE: when proxing a component to another library (e.g WSR->WUB), then please give the path through the `node_modules` to the original source file.

---

#### `exampleImport` - `string`

An example of an import statement to be used to import the component. (appears in a code block between the README and the Playground.)
When supplied, then it overwrites the automatic import statement.

---

#### `displayName` - `string`

An override for the component's displayName.

---
#### `componentProps` - `object` or `function`

Props that will be passed to `component`. Either given as-is with `object` or computed in `function`.
Imagine it as `<Component {...componentProps}/>`. Here you can set any required props.

 * when `object`, it will be passed to `component` as props.
 * when `function`, its signature is `(setState, getState) => props` where:
   * `setState` - `function`: accepts one argument - object. When called this object will be set as `componentProps`
   * `getState` - `function`: does not accept anything. When called it will return an object containing currently used props
   * `props` - return value `object`: whatever is returned will be used as new `componentProps`

For example:

```js
// `componentProps` as object
export default {
  component: ToggleSwitch,
  // ...other config
  componentProps: {
    onChange: () => console.log('wooo onChange called!')
  }
}

// This is equivalent to the following
<ToggleSwitch onChange={() => console.log('wooo onChange called!')}/>
```

Function is used to allow dynamic changes from within `component`.
The return value of that function will be used as new `component` props.

When component calls `onChange` it will
first take `checked` (which initially is set to `false`) and invert it.

This is how you can imitate surrounding state without managing it yourself:
```js
// `componentProps` as function
export default {
  component: ToggleSwitch,
  // ...other config
  componentProps: (setState, getState) => ({
    checked: false,
    onChange: () => setProps({checked: !getProps().checked})
  }),
}
```

---

#### `examples` - `ReactNode`

Automatically generated story page might not include all possible
examples. In that case use `examples` and pass a `ReactNode`. It will be
rendered without modification at the bottom of story page.

For example:

```js
export default {
  // ... other config
  examples: (
    <div>
      Hello, I am custom example
    </div>
  )
}
```

---

#### `exampleImport` - `string`

at the top of the page there is code showing how to import component,
something like `import Component from 'module/Component';`

However, due to various reasons story may not show correct import example. In that case use `exampleImport` and pass
hardcoded string of import example

---

#### `exampleProps` - `object`

exampleProps is an object who's keys are prop names, and their values are either: 
- a list of possible values
- a function
##### An example using a list value:
```js
export default {
  // ... other config
  exampleProps: {
    placement: ['bottom','top','right','left']
  }
}
```
In this example the story's Props section (which is interactive) will include a 'placement' props with a Radio-Selection (or Dropdown selection) for the `placement` values.

##### An example using a function value:
```js
export default {
  // ... other config
  exampleProps: {
    onClick: ()=>{/** see interactive preview */})
  }
}
```
In this example auto-docs will create an interactive prop value text which will "glow" when the callback is called.

##### Initial value
Initialy, the rendered Preview is rendered with the props in `componentProps`, and the `placement` selection would be unselected.

##### Moreover
`exampleProps` is mostly useful when the prop values have more complex types like functions or ReactNode. For example, you can use it with the children prop:
```js
export default {
  // ... other config
  exampleProps: {
    children: [
      'hello',
      <span>Another hello</span>,
      <div onClick={() => console.log('you clicked me!')}>yet another hello</div>
    ]
  }
}
```

For simple primitive prop types (like booleans), auto-docs will automatically create the appropriate interactive control.
