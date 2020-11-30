import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("in constructor");
    // create three state variables.
    // apiData is an array to hold our JSON data
    // isFetched indicates if the API call has finished
    // errorMsg is either null (none) or there is some error
    //isBeginner/isIntermediate property begins set to false
    this.state = {
      apiData: [],
      apiDataBeginner: [],
      apiDataIntermediate: [],
      isFetched: false,
      errorMsg: null,
      isBeginner: false,
      isIntermediate: false
    };
  }
  //****************function called on button click, isBeginnerisIntermediate = true*********************//
  //****************this function can be copied for each button********************//
  toggleBeginner = () => {
    this.setState((state) => ({ isBeginner: !state.isBeginner }));
  };

  toggleIntermediate = () => {
    this.setState((state) => ({ isIntermediate: !state.isIntermediate }));
  };
  //****************function called on button click, isBeginner/isIntermediate = true*********************//

  //****************API calls starts here********************//
  // componentDidMount() is invoked immediately after a
  // component is mounted (inserted into the tree)
  async componentDidMount() {
    try {
      const API_URL =
        "https://raw.githubusercontent.com/jphoulihan/yoga-app/main/yoga.json"; //Needs to be updated
      // Fetch or access the service at the API_URL address
      const response = await fetch(API_URL);
      // wait for the response. When it arrives, store the JSON version
      // of the response in this variable.
      const jsonResult = await response.json();

      // update the state variables correctly.
      //access different parts of the json array by initializing this.setState and creating key:value pairs.
      this.setState({ apiDataBeginner: jsonResult.Beginner });
      this.setState({ apiDataIntermediate: jsonResult.Intermediate });
      this.setState({ isFetched: true });
    } catch (error) {
      // In the case of an error ...
      this.setState({ isFetched: false });
      // This will be used to display error message.
      this.setState({ errorMsg: error });
    } // end of try catch
  } // end of componentDidMount()

  // PAY ATTENTION to the JSON returned. We need to be able to
  // access specific properties from the JSON returned.
  // Notice that this time we have three possible returns for our
  // render. This is conditional rendering based on some conditions
  render() {
    if (this.state.errorMsg) {
      return (
        <div className="error">
          <h1>An error has occured in the API call</h1>
        </div>
      ); // end of return.
    } else if (this.state.isFetched === false) {
      return (
        <div className="fetching">
          <h1>We are loading your API request</h1>
        </div>
      ); // end of return
    } else {
      // we have no errors and we have data
      //****************API calls end here********************//

      //****************App return starts here********************//
      return (
        <div className="App">
          {/*start of drop down button menu*/}
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Please select your level
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button
              onClick={this.toggleBeginner}
              className="dropdown-item"
              type="button"
            >
              Beginner
            </button>
            <button
              onClick={this.toggleIntermediate}
              className="dropdown-item"
              type="button"
            >
              Intermediate
            </button>
          </div>
          {/*end of drop down button menu*/}

          {/*card container starts with map function*/}
          {/*Start of beginner map function triggered by a drop down button click. The button is a toggle button with two states, true and false.
        The function is a ternary operator, if is beginner is true the card and its contents is rendered, otherwise null.
        First click renders card content to the screen. Second click hides card*/}
          {this.state.isBeginner ? (
            <div className="card-group">
              {this.state.apiDataBeginner.map((person, index) => (
                <div className="card text-center">
                  <div class="card">
                    <div className="card-body">
                      <img
                        className="card-img-top"
                        alt="yogapic"
                        src={person.imgURL}
                        key={index}
                      />

                      <h3 className="card-title">{person.body_part}</h3>
                      <h5 className="car-title">{person.Position}</h5>
                      <p className="card-text">{person.Description}</p>

                      <audio controls autoplay>
                        <source src={person.Audio} />
                      </audio>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {/*End of level beginner map function triggered by a drop down button click*/}
          {/*container ends*/}

          {/*card container starts with map function*/}
          {/*Start of intermediate map function triggered by a drop down button click. The button is a toggle button with two states, true and false. 
        First click renders card content to the screen. Second click hides card*/}
          {this.state.isIntermediate ? (
            <div className="card-group">
              {this.state.apiDataIntermediate.map((person, index) => (
                <div className="card text-center">
                  <div class="card">
                    <div className="card-body">
                      <img
                        className="card-img-top"
                        alt="yogapic"
                        src={person.imgURL}
                        key={index}
                      />

                      <h3 className="card-title">{person.body_part}</h3>
                      <h5 className="car-title">{person.Position}</h5>
                      <p className="card-text">{person.Description}</p>

                      <audio controls autoplay>
                        <source src={person.Audio} />
                      </audio>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {/*End of intermediate map function triggered by a drop down button click*/}
          {/*container ends*/}
        </div>
      ); // end of return
    } // end of the else statement.
  } // end of render()
} // end of App class

export default App;
