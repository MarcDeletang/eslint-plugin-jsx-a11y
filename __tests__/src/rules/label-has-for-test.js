/* eslint-env jest */
/**
 * @fileoverview Enforce label tags have htmlFor attribute.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import assign from 'object.assign';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/label-has-for';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedNestingError = {
  message: 'Form label must have the following type of associated control: nesting',
  type: 'JSXOpeningElement',
};

const expectedSomeError = {
  message: 'Form label must have ANY of the following types of associated control: nesting, id',
  type: 'JSXOpeningElement',
};

const expectedEveryError = {
  message: 'Form label must have ALL of the following types of associated control: nesting, id',
  type: 'JSXOpeningElement',
};


const array = [{
  components: ['Label', 'Descriptor'],
}];
const optionsRequiredNesting = [{
  required: 'nesting',
}];
const optionsRequiredSome = [{
  required: { some: ['nesting', 'id'] },
}];
const optionsRequiredEvery = [{
  required: { every: ['nesting', 'id'] },
}];
const optionsChildrenAllowed = [{
  allowChildren: true,
}];

ruleTester.run('label-has-for', rule, {
  valid: [
    // DEFAULT ELEMENT 'label' TESTS
    { code: '<div />' },
    { code: '<label htmlFor="foo"><input /></label>' },
    { code: '<Label />' }, // lower-case convention refers to real HTML elements.
    { code: '<Label htmlFor="foo" />' },
    { code: '<Descriptor />' },
    { code: '<Descriptor htmlFor="foo">Test!</Descriptor>' },
    { code: '<UX.Layout>test</UX.Layout>' },

    // CUSTOM ELEMENT ARRAY OPTION TESTS
    { code: '<Label htmlFor="foo" />', options: [assign({}, array[0], optionsRequiredSome[0])] },
    { code: '<Label htmlFor={"foo"} />', options: [assign({}, array[0], optionsRequiredSome[0])] },
    { code: '<Label htmlFor={foo} />', options: [assign({}, array[0], optionsRequiredSome[0])] },
    { code: '<Label htmlFor={`${id}`} />', options: [assign({}, array[0], optionsRequiredSome[0])] },
    { code: '<div />', options: array },
    { code: '<Label htmlFor="something"><input /></Label>', options: array },
    { code: '<Label htmlFor="foo">Test!</Label>', options: [assign({}, array[0], optionsRequiredSome[0])] },
    { code: '<Descriptor htmlFor="foo" />', options: [assign({}, array[0], optionsRequiredSome[0])] },
    { code: '<Descriptor htmlFor={"foo"} />', options: [assign({}, array[0], optionsRequiredSome[0])] },
    { code: '<Descriptor htmlFor={foo} />', options: [assign({}, array[0], optionsRequiredSome[0])] },
    { code: '<Descriptor htmlFor={`${id}`} />', options: [assign({}, array[0], optionsRequiredSome[0])] },
    { code: '<Descriptor htmlFor="foo">Test!</Descriptor>', options: [assign({}, array[0], optionsRequiredSome[0])] },
    { code: '<label htmlFor="foo" />', options: optionsRequiredSome },
    { code: '<label htmlFor={"foo"} />', options: optionsRequiredSome },
    { code: '<label htmlFor={foo} />', options: optionsRequiredSome },
    { code: '<label htmlFor={`${id}`} />', options: optionsRequiredSome },
    { code: '<label htmlFor="foo">Test!</label>', options: optionsRequiredSome },
    { code: '<label><input /></label>', options: optionsRequiredSome },
    { code: '<label><input /></label>', options: optionsRequiredNesting },
    { code: '<label htmlFor="input"><input /></label>', options: optionsRequiredEvery },
    { code: '<label><input /></label>', options: optionsChildrenAllowed },
    { code: '<Descriptor htmlFor="foo">Test!</Descriptor>', options: [assign({}, array, optionsChildrenAllowed)] },
    { code: '<label>Test!</label>', options: optionsChildrenAllowed },
    { code: '<label htmlFor="foo">Test!</label>', options: optionsChildrenAllowed },
    { code: '<label>{children}</label>', options: optionsChildrenAllowed },
    { code: '<label htmlFor="children">{children}</label>', options: optionsChildrenAllowed },
  ].map(parserOptionsMapper),
  invalid: [
    // DEFAULT ELEMENT 'label' TESTS
    { code: '<label id="foo" />', errors: [expectedEveryError] },
    { code: '<label htmlFor={undefined} />', errors: [expectedEveryError] },
    { code: '<label htmlFor={`${undefined}`} />', errors: [expectedEveryError] },
    { code: '<label>First Name</label>', errors: [expectedEveryError] },
    { code: '<label {...props}>Foo</label>', errors: [expectedEveryError] },
    { code: '<label><input /></label>', errors: [expectedEveryError] },
    { code: '<label>{children}</label>', errors: [expectedEveryError] },
    { code: '<label htmlFor="foo" />', errors: [expectedEveryError] },
    { code: '<label htmlFor={"foo"} />', errors: [expectedEveryError] },
    { code: '<label htmlFor={foo} />', errors: [expectedEveryError] },
    { code: '<label htmlFor={`${id}`} />', errors: [expectedEveryError] },
    { code: '<label htmlFor="foo">Test!</label>', errors: [expectedEveryError] },
    //
    // // CUSTOM ELEMENT ARRAY OPTION TESTS
    { code: '<Label></Label>', errors: [expectedEveryError], options: array },
    { code: '<Label htmlFor="foo" />', errors: [expectedEveryError], options: array },
    { code: '<Label htmlFor={"foo"} />', errors: [expectedEveryError], options: array },
    { code: '<Label htmlFor={foo} />', errors: [expectedEveryError], options: array },
    { code: '<Label htmlFor={`${id}`} />', errors: [expectedEveryError], options: array },
    { code: '<Label htmlFor="foo">Test!</Label>', errors: [expectedEveryError], options: array },
    { code: '<Descriptor htmlFor="foo" />', errors: [expectedEveryError], options: array },
    { code: '<Descriptor htmlFor={"foo"} />', errors: [expectedEveryError], options: array },
    { code: '<Descriptor htmlFor={foo} />', errors: [expectedEveryError], options: array },
    { code: '<Descriptor htmlFor={`${id}`} />', errors: [expectedEveryError], options: array },
    {
      code: '<Descriptor htmlFor="foo">Test!</Descriptor>',
      errors: [expectedEveryError],
      options: array,
    },
    { code: '<Label id="foo" />', errors: [expectedEveryError], options: array },
    {
      code: '<Label htmlFor={undefined} />',
      errors: [expectedEveryError],
      options: array,
    },
    {
      code: '<Label htmlFor={`${undefined}`} />',
      errors: [expectedEveryError],
      options: array,
    },
    { code: '<Label>First Name</Label>', errors: [expectedEveryError], options: array },
    {
      code: '<Label {...props}>Foo</Label>',
      errors: [expectedEveryError],
      options: array,
    },
    { code: '<Descriptor id="foo" />', errors: [expectedEveryError], options: array },
    {
      code: '<Descriptor htmlFor={undefined} />',
      errors: [expectedEveryError],
      options: array,
    },
    {
      code: '<Descriptor htmlFor={`${undefined}`} />',
      errors: [expectedEveryError],
      options: array,
    },
    {
      code: '<Descriptor>First Name</Descriptor>',
      errors: [expectedEveryError],
      options: array,
    },
    {
      code: '<Descriptor {...props}>Foo</Descriptor>',
      errors: [expectedEveryError],
      options: array,
    },
    { code: '<label>{children}</label>', errors: [expectedEveryError], options: array },
    { code: '<label htmlFor="foo" />', errors: [expectedNestingError], options: optionsRequiredNesting },
    { code: '<label>First Name</label>', errors: [expectedNestingError], options: optionsRequiredNesting },
    { code: '<label>First Name</label>', errors: [expectedSomeError], options: optionsRequiredSome },
    { code: '<label>{children}</label>', errors: [expectedSomeError], options: optionsRequiredSome },
    { code: '<label>{children}</label>', errors: [expectedNestingError], options: optionsRequiredNesting },
  ].map(parserOptionsMapper),
});
