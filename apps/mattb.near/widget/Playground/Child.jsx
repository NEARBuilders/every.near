const { text } = props;

State.init({
  description: "This is a description",
});

return (
  <div onClick={() => State.update({ description: "This was a description" })}>
    {text || "Hello world"}
    {state.description}

    <Widget src="mattb.near/widget/Playground.SecondChild" />
  </div>
);
