import test from 'ava';
import {h, renderToString, Text} from 'ink';
import Scrollbar from '../../lib';

test('renders nothing', t => {
  t.is(renderToString(<Scrollbar/>), '');
});

test('renders no scrollbar', t => {
  t.is(renderToString(<Scrollbar><Text>1</Text></Scrollbar>), '1\u00A0\u00A0\u00A0\n');
});

test('renders the scrollbar in the right place', t => {
  t.is(renderToString(
    <Scrollbar show={3}>
      <Text>1</Text>
      <Text>2</Text>
      <Text>3</Text>
      <Text>4</Text>
      <Text>5</Text>
      <Text>6</Text>
      <Text>7</Text>
      <Text>8</Text>
      <Text>9</Text>
    </Scrollbar>
  ), '1\u00A0\u00A0┃\n2\u00A0\u00A0\u00A0\n3\u00A0\u00A0\u00A0\n');

  t.is(renderToString(
    <Scrollbar show={3} current={2}>
      <Text>1</Text>
      <Text>2</Text>
      <Text>3</Text>
      <Text>4</Text>
      <Text>5</Text>
      <Text>6</Text>
      <Text>7</Text>
      <Text>8</Text>
      <Text>9</Text>
    </Scrollbar>
  ), '2\u00A0\u00A0┃\n3\u00A0\u00A0\u00A0\n4\u00A0\u00A0\u00A0\n');

  t.is(renderToString(
    <Scrollbar show={3} current={3}>
      <Text>1</Text>
      <Text>2</Text>
      <Text>3</Text>
      <Text>4</Text>
      <Text>5</Text>
      <Text>6</Text>
      <Text>7</Text>
      <Text>8</Text>
      <Text>9</Text>
    </Scrollbar>
  ), '3\u00A0\u00A0\u00A0\n4\u00A0\u00A0┃\n5\u00A0\u00A0\u00A0\n');

  t.is(renderToString(
    <Scrollbar show={3} current={5}>
      <Text>1</Text>
      <Text>2</Text>
      <Text>3</Text>
      <Text>4</Text>
      <Text>5</Text>
      <Text>6</Text>
      <Text>7</Text>
      <Text>8</Text>
      <Text>9</Text>
    </Scrollbar>
  ), '5\u00A0\u00A0\u00A0\n6\u00A0\u00A0┃\n7\u00A0\u00A0\u00A0\n');

  t.is(renderToString(
    <Scrollbar show={3} current={6}>
      <Text>1</Text>
      <Text>2</Text>
      <Text>3</Text>
      <Text>4</Text>
      <Text>5</Text>
      <Text>6</Text>
      <Text>7</Text>
      <Text>8</Text>
      <Text>9</Text>
    </Scrollbar>
  ), '6\u00A0\u00A0\u00A0\n7\u00A0\u00A0\u00A0\n8\u00A0\u00A0┃\n');

  t.is(renderToString(
    <Scrollbar show={3} current={8}>
      <Text>1</Text>
      <Text>2</Text>
      <Text>3</Text>
      <Text>4</Text>
      <Text>5</Text>
      <Text>6</Text>
      <Text>7</Text>
      <Text>8</Text>
      <Text>9</Text>
    </Scrollbar>
  ), '7\u00A0\u00A0\u00A0\n8\u00A0\u00A0\u00A0\n9\u00A0\u00A0┃\n');
});

test('renders the right amount of padding', t => {
  t.is(renderToString(
    <Scrollbar padding={2} show={2}>
      <Text>1</Text>
      <Text>2</Text>
      <Text>3</Text>
    </Scrollbar>
  ), '1\u00A0\u00A0\u00A0┃\n2\u00A0\u00A0\u00A0\u00A0\n');
});
