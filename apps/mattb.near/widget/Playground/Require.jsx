const { text } = props;
const { Box, Circle } = VM.require(
  "mattb.near/widget/Playground.Styles"
);

State.init({
  text: "Hello World!",
});

return (
  <>
    <Box onClick={() => State.update({ text: "Bye world!" })}>{state.text}</Box>
    {text}
    <Widget
      src="mattb.near/widget/Playground.Child"
      props={{
        text: state.text,
      }}
    />
  </>
);
