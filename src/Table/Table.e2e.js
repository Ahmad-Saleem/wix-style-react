import eyes from 'eyes.it';

import {tableTestkitFactory} from '../../testkit/protractor';
import {createStoryUrl, waitForVisibilityOf} from '../../test/utils/protractor';

import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

describe('Table', () => {
  const storyUrl = createStoryUrl({kind: '13. Work in progress', story: '13.1 Table Card', withExamples: false});
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

  eyes.it('should display table', async () => {
    expect(driver.getTable().isPresent()).toBe(true);
  });

});
