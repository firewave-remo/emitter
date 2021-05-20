export const createEmitter = () => {
  /**
   * @type {Map<string, Set<() => any)>>}
   */
  const eventMap = new Map();

  /**
   * Emit an event you want
   *
   * @param {string} type
   * @param {*} data
   */
  const emit = (type, data) => {
    const callbacks = eventMap.get(type);

    callbacks?.forEach(sub => sub(data));
  };

  /**
   * Add new Event Listener. Returns a function to remove the listener
   * @param {string} type
   * @param {(data) => void} cb
   * @returns
   */
  const on = (type, cb) => {
    const callbacks = eventMap.get(type);

    callbacks?.add(cb) || eventMap.set(type, new Set().add(cb));

    return () => off(type, cb);
  };

  /**
   * Remove event listener
   *
   * @param {string} type
   * @param {(data) => void} cb
   */
  const off = (type, cb) => {
    const callbacks = eventMap.get(type);

    if (callbacks) {
      callbacks.delete(cb);
      if (callbacks.size === 0) {
        eventMap.delete(type);
      }
    }
  };

  /**
   * Returns all registered event types
   *
   * @returns {[string]}
   */
  const eventTypes = () => [...eventMap.keys()];

  /**
   * Return all listeners for a certain event type
   *
   * @param {string} type
   * @returns
   */
  const listeners = type => [...(eventMap.get(type) || [])];

  return { emit, on, off, eventTypes, listeners };
};

/**
 * Create a Single Event Emitter
 *
 * @template T
 * @returns
 */
export const createSingleEventEmitter = () => {
  const subscriptions = new Set();

  /**
   * Subscribe to this event, Returns a function to unsubscribe
   *
   * @param {(data: T) => void} subscription
   * @returns
   */
  const sub = subscription => {
    subscriptions.add(subscription);

    return () => unsub(subscription);
  };

  /**
   * Unsubscribe from this event
   *
   * @param {(data: T) => void} subscription
   */
  const unsub = subscription => {
    subscriptions.delete(subscription);
  };

  /**
   * Emit Event
   *
   * @param {T} data
   */
  const emit = data => {
    subscriptions.forEach(subscription => subscription(data));
  };

  return { sub, unsub, emit };
};
