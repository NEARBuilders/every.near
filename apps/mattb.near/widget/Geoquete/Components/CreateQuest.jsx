const CreateQuest = styled.div`
        margin:auto;
        width:100%;
        max-width: 400px;
        border: 1px solid rgba(0,0,0, .15);
        padding: 1.5rem;
        border-radius: .7rem;
        box-shadow: .3rem .3rem 1rem rgba(0,0,0, .1);
        h1 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 2rem;
        }
        input, textarea {
            resize: none;
            &::placeholder {
                font-size: .8rem;
            }
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }

            &:placeholder-shown {
                & + label {
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-1rem);
                }
                & + .eth-label {
                    opacity: 0;
                    visibility: hidden;
                    transform: translateX(-18rem);
                }
            }
        }

        label {
            font-size: .8rem;
            color: rgba(0,0,0,.4);
            margin-left: .8rem;
            margin-top: .2rem;
            display: block;
            transition: all .3s;
        }

        ul { 
          list-style-type: none;
          position: relative;
        }

        li {
          width: 100%;
          position: absolute;
          border: 1px solid rgba(0,0,0, .1);
          top: 2px;
          left: 0;
          padding: 8px;
          border-radius: 5px; 
          background-color: white;
          box-shadow: 1px 4px 8px rgba(0,0,0,.2);
          font-size: .8rem;

          &:hover {
            cursor: pointer;
            background-color: #f0eded;
          }
        }

        .eth-label {
            margin-top: -1.7rem;
            margin-left: 19rem;
            margin-bottom: 2.6rem;
        }
        .form-group {
            margin-bottom: .5rem;
        }
        .selected {
          display: none;
        }
`;

const LocationList = styled.div`
    .location-wrapper {
        position:relative;

        &:not(:last-of-type) {
            margin-bottom:1rem;
        }

        &::before {
            content:'';
            width:5px;
            height:5px;
            background-color:rgb(73, 159, 245);
            border-radius:100%;
            position:absolute;
            top:0;
            bottom:0;
            margin: auto;
        }

        &::after {
            content:'';
            width:2px;
            height:100%;
            background-color:rgba(0,0,0,.2);
            border-radius:100%;
            position:absolute;
            bottom:90%;
            left:1.5px;
            border-radius:0;
        }

        input {
            width:calc(100% - 15px);
            border:0;
            padding:0;
            margin-left:15px;
            font-size:.8rem;
            border-bottom: 1px solid rgba(0,0,0,.1);
            padding-bottom:5px;

            &:focus {
                outline-style:none;
            }
        }
    }
`;

const Button = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
    color:#fff;
    width:100%;
    height:50px;
    border-radius:10px;
    background-color:#2fbc2f;
    text-align:center;
    cursor: pointer;
    user-select: none;
    box-shadow: 0 3px 3px rgba(0,0,0,.3);

    &:active {
      box-shadow: 0 0 0 rgba(0,0,0,0);
      transform: translateY(2px);
    }
`;

State.init({
  sdk: null,
  questName: "",
  questPrize: null,
  numberOfPlayers: "",
  description: "",
  location: "",
  city: "",
});

const cities = ["Paris"];

const match = () => {
  const inputText = state.city.toLowerCase();

  return inputText
    ? cities.filter((city) => city.toLowerCase().includes(inputText))
    : [];
};

const handleCityClick = (city) => {
  State.update({ location: "Eiffel Tower, Paris France" });
  State.update({ city });
};

const createQuest = () => {
  state.sdk
    .createQuest({
      questName: state.questName,
      questPrize: state.questPrize,
      numberOfPlayers: state.numberOfPlayers,
      location: state.city,
      description: state.description,
      coordinates: [],
    })
    .then((rawResponse) => {
      const response = state.sdk.decode("createQuest", rawResponse);
      console.log(response);
    });
};

return (
  <CreateQuest>
    <div
      style={{
        display: "none",
      }}
    >
      <Widget
        src="mattb.near/widget/Geoquete.Libs.GeoqueteSDK"
        props={{
          onLoad: (sdk) => State.update({ sdk: sdk }),
          loaded: !!state.sdk,
        }}
      />
    </div>

    <h1>Create a Quête:</h1>

    <div className="form-group">
      <input
        id="name"
        type="text"
        placeholder="Quête name"
        value={state.questName}
        onChange={(event) => State.update({ questName: event.target.value })}
        required
      />
      <label for="name">Quête name</label>
    </div>

    <div className="form-group">
      <textarea
        id="description"
        type="text"
        placeholder="Description"
        rows="6"
        required
        className="description form-control"
        value={state.description}
        onChange={(event) => State.update({ description: event.target.value })}
      />
      <label for="description">Description</label>
    </div>

    <div className="form-group">
      <input
        id="eth"
        type="number"
        placeholder="APE"
        value={state.questPrize}
        onChange={(event) => State.update({ questPrize: event.target.value })}
      />
      <label className="eth-label" for="eth">
        APE
      </label>
    </div>

    <div className="form-group">
      <input
        id="people"
        type="number"
        value={state.numberOfPlayers}
        onChange={(event) =>
          State.update({ numberOfPlayers: event.target.value })
        }
        placeholder="Max. amount of Explorers"
      />
      <label for="people">Max. amount of Explorers</label>
    </div>

    <div className="form-group">
      <input
        id="city"
        type="text"
        placeholder="City"
        onChange={(event) => {
          State.update({ city: event.target.value });
        }}
        value={state.city}
      />
      <ul>
        {match().map((city, id) => {
          return (
            <li
              key={id}
              onClick={() => handleCityClick(city)}
              className={state.city === city ? "selected" : ""}
            >
              {city}
            </li>
          );
        })}
      </ul>
    </div>

    <div className="form-group">
      <input
        id="location"
        type="text"
        value={state.location}
        placeholder="Location"
      />
      <label for="location">Location</label>
    </div>

    <Button onClick={() => createQuest()}>Create Quest</Button>
  </CreateQuest>
);
