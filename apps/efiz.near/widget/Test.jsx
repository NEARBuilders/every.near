function createThing({ data, type, thingId, onCommit, onCancel }) {
  thingId = thingId || generateUID();

  const save = {
    test: {
      thing: {
        [thingId]: {
          "": "test",
          categories: {
            test: "nice",
          },
        },
      },
    },
    index: {
      test: JSON.stringify({
        key: type,
        value: {
          thingId,
          type,
        },
      }),
    },
  };
  Social.set(save, {
    onCommit,
    onCancel,
  });
}

const plugins = Social.index("thing", "efiz.near/type/plugin", {
  limit: 10,
});

const data = {
  data: { name: "we're just testing it out" },
  template: {
    src: "efiz.near/widget/placeholder",
  },
  type: "efiz.near/type/plugin",
};

return (
  <>
    <div>
      <button
        onClick={() => {
          createThing({ data, type: "efiz.near/type/plugin", thingId: "test" });
        }}
      >
        create plugin
      </button>
      {plugins &&
        plugins.map((it) => {
          return <p>plugin: {JSON.stringify(it)}</p>;
        })}
    </div>
    <br />
    <div>
      <button
        onClick={() => {
          createThing(data, "efiz.near/type/");
        }}
      >
        create category
      </button>
      {plugins &&
        plugins.map((it) => {
          return <p>plugin: {JSON.stringify(it)}</p>;
        })}
    </div>
  </>
);
