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

    const errors = this.validate();

    if (errors) {
      //const result = JSON.stringify(errors);
      const result = "Please complete each field";
      this.setState({ result });
      return false;
    }

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

  handleCurrencySourceChange = ({ target: input }) => {
    const currencyFormatReg = /^[A-Za-z]+$/;
    if (!currencyFormatReg.test(input.value)) {
      return;
    }

    const data = { ...this.state.data };
    data.currencySource = input.value.substring(0, 3).toUpperCase();
    this.setState({ data });
  };

  handleCurrencyDestinationChange = ({ target: input }) => {
    const currencyFormatReg = /^[A-Za-z]+$/;
    if (!currencyFormatReg.test(input.value)) {
      return;
    }

    const data = { ...this.state.data };
    data.currencyDestination = input.value.substring(0, 3).toUpperCase();
    this.setState({ data });
  };

  handleCurrencyDateChange = ({ target: input }) => {
    const dateFormatReg = /^[\d-]+$/;
    if (!dateFormatReg.test(input.value)) {
      return;
    }

    const data = { ...this.state.data };
    data.currencyDate = input.value.substring(0, 10);
    this.setState({ data });
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

    axios
      .get(apiURL)
      .then((response) => {
        //console.log("response", JSON.stringify(response));
        const result = response.data.rates[this.state.data.currencyDestination];
        this.setState({ result });
      })
      .catch((error) => {
        //console.log("error", JSON.stringify(error));
        const result = error.response.data.error;
        this.setState({ result });
      });
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
              placeholder="USD"
              value={this.state.data.currencySource}
              onChange={this.handleCurrencySourceChange}
            ></input>
          </div>

          <div className="mb">
            <label htmlFor="currencySource">Destination Symbol</label>
            <input
              type="text"
              className="currency-destination"
              name="currencyDestination"
              placeholder="EUR"
              value={this.state.data.currencyDestination}
              onChange={this.handleCurrencyDestinationChange}
            ></input>
          </div>

          <div className="mb">
            <label htmlFor="currencyDate">Date</label>
            <input
              type="text"
              className="currency-date"
              name="currencyDate"
              placeholder="2021-05-05"
              value={this.state.data.currencyDate}
              onChange={this.handleCurrencyDateChange}
            ></input>
          </div>
          <div className="mc">
            <button
              className="find-rate"
              type="submit"
              onClick={this.handleSubmit}
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
