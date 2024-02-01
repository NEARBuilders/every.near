const { Feed } = VM.require("devs.near/widget/Module.Feed") || (() => <></>);

return (
  <>
    {context.accountId ? (
      <Widget
        key="compose"
        loading=""
        src="every.near/widget/request.compose"
        props={{
          includedHashtags: ["request"],
        }}
      />
    ) : (
      <div className="py-5">Please login in order to post</div>
    )}
    <Feed
      index={[
        {
          action: "hashtag",
          key: "request",
          options: {
            limit: 10,
            order: "desc",
            accountId: props.accounts,
          },
          cacheOptions: {
            ignoreCache: true,
          },
        },
      ]}
      Item={(p) => (
        <Widget
          loading={<div className="w-100" style={{ height: "200px" }} />}
          src="mob.near/widget/MainPage.N.Post"
          props={{ accountId: p.accountId, blockHeight: p.blockHeight }}
        />
      )}
    />
  </>
);
