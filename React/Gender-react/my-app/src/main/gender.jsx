import React from "react";

const SERVER_URL = "https://api.genderize.io";

async function getGender(name) {
  const url = `${SERVER_URL}?name=${name}`;
  const response = await fetch(url);
  const gender = (await response.json()).gender;
  return gender;
}

class Gender extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gender: 'ASS'};
    this.setGender = this.setGender.bind(this)
  }

  setGender(gender) {
    this.setState({gender: gender})
    console.log(this.state.gender);
  }

  render() {
    return (
      <div>
        <h1>Let's find out your gender!</h1>
        <Form setGender={this.setGender}/>
        <Output gender={this.state.gender}/>
      </div>
    );
  }
}

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "artem",
      gender: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <form action="" className="form">
          <input
            type="text"
            className="input"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </form>
        <Button name={this.state.name} setGender={this.props.setGender}/>
      </div>
    );
  }
}

export class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: undefined,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const gender = await getGender(this.props.name);
    this.setState({ gender: gender });
    this.props.setGender(this.state.gender)
  }

  render() {
    return (
      <div>
        <button className="button" onClick={this.handleClick}>
          Find out
        </button>
      </div>
    );
  }
}

export class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: undefined,
    };
  }

  render() {
    return (
      <div>
        <span>Probably, your gender is </span><span className="outPut">{this.props.gender}</span>
      </div>
    );
  }
}

export default Gender;
