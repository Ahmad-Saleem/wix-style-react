export {
  getStoryUrl, // Deprecated
  createStoryUrl,
  waitForVisibilityOf,
  protractorTestkitFactoryCreator,
  isFocused,
  scrollToElement
} from 'wix-ui-test-utils/protractor';

// TODO: protractor helper methods should be moved to wix-ui-test-utils/protractor
/**
 * Protractor helper for checking the presence of an attribute.
 */
export const hasAttribute = (elementFinder, attributeName) =>
  elementFinder.getAttribute(attributeName).then(value => value !== null);
/**
 * Protractor helper for checking the presence of a css class name.
 */
export const hasClass = (element, className) =>
  element.getAttribute('class').then(classes => classes.split(' ').some(c => c.includes(className)));
