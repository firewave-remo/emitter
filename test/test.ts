import { createSingleEventEmitter } from '../src/emitter';

const singleEvent = createSingleEventEmitter<{ hello: string }>();

singleEvent.emit({ hello: '' });

const unsub = singleEvent.sub(data => {});

unsub();
