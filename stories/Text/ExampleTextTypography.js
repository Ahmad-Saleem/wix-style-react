import React from 'react';

import Text from 'wix-style-react/Text';
import styles from './styles.scss';

export default () =>
  <div>
    <h3>Text</h3>
    <ul className={`ltr ${styles.root}`}>
      <li><Text>Helvetica_45 / 16px / 24px</Text><Text skin="premium" bold> (T1)</Text></li>
      <li><Text secondary>secondary - Helvetica_45 / 16px / 24px</Text><Text skin="premium" bold> (T1.1)</Text></li>
      <li className={styles.inverted}>
        <Text light>light - Helvetica_45 / 16px / 24px</Text>
        <Text skin="premium" bold> (T1.2)</Text>
      </li>
      <li><Text secondary light>secondary light - Helvetica_45 / 16px / 24px</Text><Text skin="premium" bold> (T1.4)</Text></li>
    </ul>

    <h3>Bold Text</h3>
    <ul className={`ltr ${styles.root}`}>
      <li><Text bold>bold - Helvetica_55 / 16px / 24px</Text><Text skin="premium" bold> (T2)</Text></li>
      <li><Text bold secondary>bold secondary - Helvetica_55 / 16px / 24px</Text></li>
      <li className={styles.inverted}>
        <Text bold light>bold light - Helvetica_55 / 16px / 24px</Text>
        <Text skin="premium" bold> (T2.2)</Text>
      </li>
      <li><Text bold secondary light>bold secondary light - Helvetica_55 / 16px / 24px</Text><Text skin="premium" bold> (T2.1)</Text></li>
    </ul>

    <h3>Small Text</h3>
    <ul className={`ltr ${styles.root}`}>
      <li><Text size="small">small - Helvetica_45 / 14px / 18px</Text><Text skin="premium" bold> (T3)</Text></li>
      <li><Text size="small" secondary>small secondary - Helvetica_45 / 14px / 18px</Text><Text skin="premium" bold> (T3.1)</Text></li>
      <li className={styles.inverted}>
        <Text size="small" light>small light - Helvetica_45 / 14px / 18px</Text>
        <Text skin="premium" bold> (T3.2)</Text>
      </li>
      <li><Text size="small" secondary light>small secondary light - Helvetica_45 / 14px / 18px</Text><Text skin="premium" bold> (T3.4)</Text></li>
    </ul>

    <h3>Small Bold Text</h3>
    <ul className={`ltr ${styles.root}`}>
      <li><Text size="small" bold>small bold - Helvetica_55 / 14px / 18px</Text><Text skin="premium" bold> (T4)</Text></li>
      <li><Text size="small" secondary bold>small secondary bold - Helvetica_55 / 14px / 18px</Text><Text skin="premium" bold> (T4.1)</Text></li>
      <li className={styles.inverted}>
        <Text size="small" bold light>small + bold + light - Helvetica_55 / 14px / 18px</Text>
        <Text skin="premium" bold> (T4.2)</Text>
      </li>
      <li><Text size="small" secondary bold light>small secondary bold light - Helvetica_55 / 14px / 18px</Text></li>
    </ul>
  </div>;

