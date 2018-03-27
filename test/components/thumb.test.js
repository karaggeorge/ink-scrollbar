import test from 'ava';
import {h, renderToString} from 'ink';
import Thumb from '../../lib/components/thumb';

test('renders default thumb', t => {
  t.is(renderToString(<Thumb show/>), '\u00A0❙');
});

test('renders missing thumb', t => {
  t.is(renderToString(<Thumb show={false}/>), '\u00A0\u00A0');
});

test('renders the right thumb', t => {
  t.is(renderToString(<Thumb show thumbCharacter="--"/>), '\u00A0--');
});

test('renders the right amount of spaces', t => {
  t.is(renderToString(<Thumb show={false} thumbCharacter="--"/>), '\u00A0\u00A0\u00A0');
});
