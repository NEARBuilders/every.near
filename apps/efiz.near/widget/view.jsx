const path = props.path;
const type = props.type;

if (path.endsWith("/")) {
  path = path.slice(0, -1);
}

const parts = path.split("/");
let value = {};

console.log(`path: ${path}, type: ${type}`);

// ACCOUNT //
if (type === "account") {
  if (parts.length > 1) {
    return (
      <Widget
        src="efiz.near/widget/Tree"
        props={{ rootPath: parts[parts.length - 1], rootType: type }}
      />
    );
  }
  // THING //
} else if (type === "thing") {
  // path: "everything"
  // type: "thing"
  return "VIEW: thing";
  // WIDGET //
} else if (type === "widget") {
  return <Widget src={path} />;
  // PROFILE //
} else if (type === "graph") {
  parts.push("**");
  value = Social.get(parts.join("/"), "final");
} else if (type === "index") {
  value = Social.get(parts.join("/"), "final");
} else if (type === "profile") {
  value = Social.get(parts.join("/"), "final");
  return <p>{value}</p>;
} else if (type === "settings") {
  return (
    <Widget
      src="efiz.near/widget/Every.Setting"
      props={{ accountId: parts[0] }}
    />
  );
} else if (type === "post") {
  // Replace this with a better component
  // with hashtag filter

  if (parts[0].endsWith(".near")) {
    const index = {
      action: parts[1],
      key: parts[2],
      options: {
        limit: 10,
        order: "desc",
        accountId: parts[0],
      },
    };

    function renderItem(a) {
      if (a.value.type === "md") {
        return (
          <Widget
            src="near/widget/Posts.Post"
            props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
          />
        );
      }
    }
    return (
      <Widget
        src="efiz.near/widget/MergedIndexFeed"
        props={{ index, renderItem, disableCaching: true }}
      />
    );
  } else {
    let hashtagFilter = [];
    if (parts[2] !== "main") {
      hashtagFilter = [{ name: parts[2], required: true }];
    }
    return (
      <Widget
        src="efiz.near/widget/Community.Posts"
        props={{
          communityHashtags: hashtagFilter,
          communityMembers: [],
          exclusive: false,
          allowPublicPosting: true,
        }}
      />
    );
  }
} else {
  value = Social.get(parts.join("/"), "final");
  value = JSON.parse(value);
}

const text = `
\`\`\`json
${JSON.stringify(value, undefined, 2)}
\`\`\`
`;
return <Markdown text={text} />;
