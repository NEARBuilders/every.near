const { Feed } = VM.require("devs.near/widget/Module.Feed") || {
  Feed: () => <></>,
};

return (
  <Feed
    index={[
      {
        action: "post",
        key: "test",
        options: {
          limit: 10,
          order: "desc",
        },
        cacheOptions: {
          ignoreCache: true,
        },
      },
    ]}
    Item={(p) => (
      <Widget
        src="buildbox.near/widget/post.item"
        loading={<div className="w-100" style={{ height: "200px" }} />}
        props={{
          item: p.item,
          accountId: p.accountId,
          blockHeight: p.blockHeight,
          noBorder: true,
        }}
      />
    )}
  />
);
