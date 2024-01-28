let { slot, onClose, showModal } = props;

State.init({
  open: showModal ?? false,
});

const Slot = () => <>{slot}</>;

const Box = styled.div`
    background-color:#fff;
    padding:1.5rem;
    min-height:200px;
    width:100%;
    max-width:400px;
`;

const Overlay = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:rgba(0,0,0,.5);
    z-index:9999999;
`;

return (
  <>
    {props.showModal && (
      <Overlay
        onClick={() => {
          State.update({ open: !state.open });

          if (typeof onClose === "function") {
            onClose(state.open);
          }
        }}
      >
        <Box>
          <Slot />
        </Box>
      </Overlay>
    )}
  </>
);
