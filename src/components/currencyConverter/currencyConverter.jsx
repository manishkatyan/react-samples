import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import "./currencyConverter.css";

export default class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    data: { currencySource: "", currencyDestination: "", currencyDate: "" },
    errors: {},
    result: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const errors = this.validate();

    if (errors) {
      console.log(errors);
      const result = JSON.stringify(errors);
      this.setState({ result });
      return false;
    }

    console.log("Converting currency");

    this.findRate();
  };

  validate = () => {
    const errors = {};

    const currencyFormatReg = /^[A-Za-z]{3}$/;

    if (!currencyFormatReg.test(this.state.data.currencySource)) {
      errors.currencySource = "Only alphabetical characters are allowed.";
    }

    if (!currencyFormatReg.test(this.state.data.currencyDestination)) {
      errors.currencyDestination = "Only alphabetical characters are allowed.";
    }

    const dateFormatReg = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    if (!dateFormatReg.test(this.state.data.currencyDate)) {
      errors.currencyDate = "Date doesn't match format YYYY-mm-dd";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = this.state.errors;
    const data = { ...this.state.data };
    const result = this.state.result;
    data[input.name] = input.value.toUpperCase();
    this.setState({ data, errors, result });
  };

  handleReset = () => {
    const data = { ...this.state.data };
    data["currencySource"] = "";
    data["currencyDestination"] = "";
    data["currencyDate"] = "";

    const errors = {};
    const result = "";

    this.setState({ data, errors, result });
    return false;
  };

  findRate = async () => {
    const apiURL =
      "https://api.ratesapi.io/api/" +
      this.state.data.currencyDate +
      "?base=" +
      this.state.data.currencySource +
      "&symbols=" +
      this.state.data.currencyDestination;

    const debug = false;
    if (debug) {
      const result = "Calling server in debug mode";
      this.setState({ result });
    } else {
      axios
        .request(apiURL)
        .then((response) => {
          console.log(response);
          const result =
            response.data.rates[this.state.data.currencyDestination];
          this.setState({ result });
        })
        .catch((error) => {
          console.log(error);
          const result = error.response.data.error;
          this.setState({ result });
        });
    }
  };

  render() {
    return (
      <>
        <p>Enter source and destination currency and date to convert.</p>
        <form onSubmit={this.handleSubmit}>
          <div className="mb">
            <label htmlFor="currencySource">Source Symbol</label>
            <input
              type="text"
              className="currency-source"
              name="currencySource"
              maxLength="3"
              minLength="3"
              placeholder="USD"
              value={this.state.data.currencySource.toUpperCase()}
              onChange={this.handleChange}
            ></input>
          </div>

          <div className="mb">
            <label htmlFor="currencySource">Destination Symbol</label>
            <input
              type="text"
              className="currency-destination"
              name="currencyDestination"
              maxLength="3"
              minLength="3"
              placeholder="EUR"
              value={this.state.data.currencyDestination}
              onChange={this.handleChange}
            ></input>
          </div>

          <div className="mb">
            <label htmlFor="currencyDate">Date</label>
            <input
              type="text"
              className="currency-date"
              name="currencyDate"
              maxLength="10"
              minLength="10"
              placeholder="2021-05-05"
              value={this.state.data.currencyDate}
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="mc">
            <button
              className="find-rate"
              type="submit"
              onSubmit={this.handleSubmit}
            >
              Find Rate
            </button>
            <button
              className="reset-fields"
              type="button"
              onClick={this.handleReset}
            >
              Reset
            </button>
          </div>
        </form>
        <div className="conversion-result">{this.state.result}</div>
      </>
    );
  }
}

CurrencyConverter.propTypes = {
  currencySource: PropTypes.string,
  currencyDestination: PropTypes.string,
  currencyDate: PropTypes.string,
};