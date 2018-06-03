import eyes from 'eyes.it';

import {
  tableTestkitFactory,
  createStoryUrl,
  waitForVisibilityOf
} from '../../testkit/protractor';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

describe('Table', () => {
  const storyUrl = createStoryUrl({kind: '10. Tables', story: '10.2 Table Card', withExamples: false});
  const driver = tableTestkitFactory({dataHook: 'storybook-table'});

  beforeAll(() => {
    browser.get(storyUrl);
  });

  beforeEach(done => {
    waitForVisibilityOf(driver.element(), 'Can not find Table Component').then(done);
  });

  afterEach(() => {
    autoExampleDriver.reset();
  });

  eyes.it('should filter search options by input', () => {
    expect(driver.getTable().isDisplayed()).toBe(true);
  });

});
