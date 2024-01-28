const { onLoad, onRefresh, loaded } = props;
const DEFAULT_APP_NAME = "SkipApp";
const STORAGE_KEY = "SkipFramework.store";
const EVENTS_KEY = "SkipFramework.events";

let SkipFramework = {
  $appName: DEFAULT_APP_NAME,
  $path: "",
  $props: {},
  $state: {},
  $store: {},
  $watchers: {},
  $events: {},
  $subscribedEvents: {},
  $locks: {},
  $storeLoaded: false,
  $initialized: false,
  $listenersInitialized: false,
  $listenersEnabled: false,
  $output: "",
  $route: {
    name: "",
    widget: null,
    props: {},
  },
  create: (appName) => {
    if (SkipFramework.$appName == DEFAULT_APP_NAME) {
      SkipFramework.$appName = appName;
      SkipFramework.$refresh();
    }

    return SkipFramework;
  },
  with: (vars) => {
    if (!SkipFramework.$initialized) {
      SkipFramework.$state = SkipFramework.$destructure(vars);
      SkipFramework.$setMethods(vars);
      SkipFramework.$setStore(vars);
      SkipFramework.$setWatchers(vars);
      SkipFramework.$setComputed(vars);
      SkipFramework.$triggerComputed();
      SkipFramework.$initComponentEventChain();
      SkipFramework.$initialized = true;
      SkipFramework.$refresh();
    }

    return SkipFramework;
  },
  listens: (events) => {
    SkipFramework.$subscribedEvents = events;
    SkipFramework.$initEventsChain();

    return SkipFramework;
  },
  routing: (ctx, params, routes) => {
    if (!SkipFramework.$path) {
      SkipFramework.$path = ctx.widgetSrc;
      SkipFramework.$refresh();
    }

    if (
      !SkipFramework.$route.widget &&
      Object.keys(routes).filter((key) => Object.keys(params).includes(key))
        .length > 0
    ) {
      let route = Object.keys(routes)
        .filter((route) => route in params)
        .shift();

      if (typeof routes[route] === "function") {
        delete params[route];
        SkipFramework.$route = {
          name: route,
          widget: routes[route],
          props: params,
        };
        SkipFramework.$refresh();
      }
    }
  },
  to: (route, params) => {
    return `/#/${SkipFramework.$path}?${route}${Object.keys(params || {})
      .map((key) => `&${key}=${params[key]}`)
      .join("")}`;
  },
  $destructure: (vars) => {
    let state = vars["state"] || {};

    return {
      ...state,
    };
  },
  $setMethods: (vars) => {
    let methods = vars["methods"] || {};
    Object.keys(methods)
      .filter(
        (method) =>
          !(method in SkipFramework) && typeof methods[method] === "function"
      )
      .forEach((method) => {
        SkipFramework[method] = methods[method];
      });
  },
  $setStore: (vars) => {
    SkipFramework.$store = {
      ...SkipFramework.$store,
      ...(vars["store"] || {}),
    };

    Storage.get(SkipFramework.$getStorageKey());

    setTimeout(() => {
      SkipFramework.$state = {
        ...SkipFramework.$state,
        ...SkipFramework.$filterStore(
          Storage.get(SkipFramework.$getStorageKey()) || {}
        ),
      };
      SkipFramework.$storeLoaded = true;
      SkipFramework.$triggerComputed();
      SkipFramework.$refresh();
    }, 100);
  },
  $setComputed: (vars) => {
    SkipFramework.$computed = {
      ...SkipFramework.$computed,
      ...(vars["computed"] || {}),
    };
  },
  $setWatchers: (vars) => {
    SkipFramework.$watchers = {
      ...SkipFramework.$watchers,
      ...(vars["watch"] || {}),
    };
  },
  $filterStore: (storage) => {
    let actualStore = {};

    Object.keys(storage).map((key) =>
      !!SkipFramework.$store[key] ? (actualStore[key] = storage[key]) : ""
    );

    return actualStore;
  },
  $triggerWatchers: (vars) => {
    if (Object.keys(vars) in SkipFramework.$watchers) {
      Object.keys(vars).forEach((key) => {
        if (typeof SkipFramework.$watchers[key] == "function") {
          let modifiers = SkipFramework.$watchers[key](
            SkipFramework.$state[key],
            vars[key]
          );

          if (!!modifiers) {
            SkipFramework.set(modifiers);
          }

          SkipFramework.$refresh();
        }
      });
    }
  },
  $triggerStore: (vars) => {
    if (SkipFramework.$store && Object.keys(vars) in SkipFramework.$store) {
      let res = {};
      Object.keys(vars)
        .filter(
          (key) => key in SkipFramework.$store && SkipFramework.$store[key]
        )
        .forEach((key) => {
          res[key] = vars[key];
        });
      Storage.set(SkipFramework.$getStorageKey(), {
        ...(Storage.get(SkipFramework.$getStorageKey()) || {}),
        ...res,
      });
    }
  },
  $triggerComputed: () => {
    Object.keys(SkipFramework.$computed).forEach((key) => {
      if (typeof SkipFramework.$computed[key] == "function") {
        SkipFramework.$state[key] = SkipFramework.$computed[key](
          SkipFramework.$state
        );
      }
    });
    SkipFramework.$refresh();
  },
  set: (values) => {
    SkipFramework.$triggerWatchers(values);
    SkipFramework.$state = {
      ...SkipFramework.$state,
      ...values,
    };
    SkipFramework.$triggerStore(values);
    SkipFramework.$triggerComputed(values);

    SkipFramework.$refresh();
  },
  get: (key) => {
    return SkipFramework.$state[key] ?? "";
  },
  render: (html) => {
    if (
      !!SkipFramework.$route.widget &&
      typeof SkipFramework.$route.widget === "function"
    ) {
      SkipFramework.$output = SkipFramework.$route.widget(
        SkipFramework.$route.props,
        SkipFramework.$state
      );
    } else {
      SkipFramework.$output = html;
      SkipFramework.$listenEvents();
    }

    return SkipFramework.$output;
  },
  $refresh: () => {
    if (!!onRefresh) {
      onRefresh(SkipFramework);
    }
  },
  $getStorageKey: () => {
    return `${STORAGE_KEY}-${SkipFramework.$appName}`;
  },
  $getCurrentComponentEventsKey: () => {
    return SkipFramework.$getComponentEventsKey(SkipFramework.$appName);
  },
  $getComponentEventsKey: (key) => {
    return `${EVENTS_KEY}-${key}`;
  },
  $initComponentEventChain: () => {
    Storage.get(SkipFramework.$getCurrentComponentEventsKey());

    setTimeout(() => {
      Storage.set(
        SkipFramework.$getCurrentComponentEventsKey(),
        Storage.get(SkipFramework.$getCurrentComponentEventsKey()) || {
          name: SkipFramework.$appName,
          data: [],
          locked: false,
        }
      );
    }, 200);
  },
  $initEventsChain: () => {
    if (
      Object.keys(SkipFramework.$subscribedEvents).length > 0 &&
      !SkipFramework.$listenersInitialized
    ) {
      Object.keys(SkipFramework.$subscribedEvents).forEach((componentName) => {
        let extComponentKey =
          SkipFramework.$getComponentEventsKey(componentName);

        Storage.set(
          SkipFramework.$getCurrentComponentEventsKey() + "." + extComponentKey,
          {
            name: componentName,
            data: [],
            locked: false,
          }
        );
      });
      SkipFramework.$listenersInitialized = true;
      SkipFramework.$refresh();
    }
  },
  $listenEvents: () => {
    Object.keys(SkipFramework.$subscribedEvents).forEach((componentName) => {
      Storage.get(SkipFramework.$getComponentEventsKey(componentName));
    });
    Storage.get(SkipFramework.$getCurrentComponentEventsKey());

    if (
      Object.keys(SkipFramework.$subscribedEvents).length > 0 &&
      !SkipFramework.$listenersEnabled
    ) {
      setInterval(() => {
        Object.keys(SkipFramework.$subscribedEvents).forEach(
          (componentName) => {
            let extComponentKey =
              SkipFramework.$getComponentEventsKey(componentName);
            let eventsChain = Storage.get(extComponentKey) || {};
            let componentEventsChain =
              Storage.get(
                SkipFramework.$getCurrentComponentEventsKey() +
                  "." +
                  extComponentKey
              ) || {};

            if (
              eventsChain &&
              !(extComponentKey in SkipFramework.$locks) &&
              eventsChain.data.length > componentEventsChain.data.length
            ) {
              SkipFramework.$locks[extComponentKey] = true;
              SkipFramework.$refresh();

              SkipFramework.$processEvents(
                componentName,
                eventsChain.data.slice(
                  componentEventsChain.data.length,
                  eventsChain.data.length
                )
              );

              SkipFramework.$commitEvents(extComponentKey, eventsChain);
              delete SkipFramework.$locks[extComponentKey];
              SkipFramework.$refresh();
            }
          }
        );
      }, 500);
      SkipFramework.$listenersEnabled = true;
      SkipFramework.$refresh();
    }
  },
  $lockEvents: (events) => {
    Storage.set(SkipFramework.$getCurrentComponentEventsKey(), {
      ...events,
      name: SkipFramework.$appName,
      locked: true,
    });
  },
  $commitEvents: (key, events) => {
    Storage.set(
      SkipFramework.$getCurrentComponentEventsKey() + "." + key,
      events
    );
  },
  $processEvents: (componentName, events) => {
    events.forEach((event) => {
      SkipFramework.$triggerEvent(componentName, event);
    });
  },
  $triggerEvent: (componentName, event) => {
    let triggers = SkipFramework.$subscribedEvents[componentName];
    if (event.name in triggers && typeof triggers[event.name] === "function") {
      triggers[event.name](event.data);
    }
  },
  emit: (eventName, data) => {
    SkipFramework.$emitEvent(eventName, data);
  },
  $emitEvent: (eventName, data) => {
    let eventsChain = Storage.get(
      SkipFramework.$getCurrentComponentEventsKey()
    );
    eventsChain.data = eventsChain.data.concat({
      name: eventName,
      data: data,
    });

    Storage.set(SkipFramework.$getCurrentComponentEventsKey(), eventsChain);
  },
};

if (onLoad && !loaded) {
  onLoad({
    skip: SkipFramework,
  });
}
