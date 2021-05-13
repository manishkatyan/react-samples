import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import axios from "axios";
import CurrencyConverter from "./currencyConverter";

jest.mock("axios");

describe("CurrencyConverter", () => {
  let cc;
  let findRate;
  let currSrc;
  let currDest;
  let currDate;
  let reset;
  let result;

  describe("renders correct HTML elements", () => {
    beforeEach(() => {
      cc = mount(<CurrencyConverter />);
      findRate = cc.find(".find-rate");
      currSrc = cc.find(".currency-source");
      currDest = cc.find(".currency-destination");
      currDate = cc.find(".currency-date");
      reset = cc.find(".reset-fields");
      result = cc.find(".conversion-result");
    });
    afterEach(jest.resetAllMocks);

    it('should have a "find-rate" button', () => {
      expect(findRate.exists()).toBe(true);
      expect(findRate).toHaveLength(1);
    });

    it('should have a "currency-source" input field', () => {
      expect(currSrc.exists()).toBe(true);
      expect(currSrc).toHaveLength(1);
    });

    it('should have a "currency-dest" input field', () => {
      expect(currDest.exists()).toBe(true);
      expect(currDest).toHaveLength(1);
    });

    it('should have a "currency-date" input field', () => {
      expect(currDate.exists()).toBe(true);
      expect(currDate).toHaveLength(1);
    });

    it('should have a "reset-fields" button', () => {
      expect(reset.exists()).toBe(true);
      expect(reset).toHaveLength(1);
    });

    it('should have a "conversion-result" input field', () => {
      expect(result.exists()).toBe(true);
      expect(result).toHaveLength(1);
    });
  });

  describe("handles form input correctly", () => {
    beforeEach(() => {
      cc = mount(<CurrencyConverter />);
      findRate = cc.find(".find-rate");
      currSrc = cc.find(".currency-source");
      currDest = cc.find(".currency-destination");
      currDate = cc.find(".currency-date");
      reset = cc.find(".reset-fields");
      result = cc.find(".conversion-result");
    });
    afterEach(() => jest.resetAllMocks());

    test('"currency-source" should uppercase alphabetical input', () => {
      currSrc.simulate("change", { target: { value: "abc" } });
      expect(currSrc.instance().value).toEqual("ABC");
      currSrc.simulate("change", { target: { value: "" } });
    });

    test('"currency-source" should limit input to 3 letters', () => {
      currSrc.simulate("change", { target: { value: "abCd" } });
      expect(currSrc.instance().value).toEqual("ABC");
      currSrc.simulate("change", { target: { value: "" } });
    });

    test('"currency-source" should reject non-alphabetical input', () => {
      const input = "123456789!@#$%^&*().,;'[]{}\\|'\"`~:";
      currSrc.simulate("change", { target: { value: input } });
      expect(currSrc.instance().value).toEqual("");
    });

    test('"currency-dest" should uppercase alphabetical input', () => {
      currDest.simulate("change", { target: { value: "abc" } });
      expect(currDest.instance().value).toEqual("ABC");
      currDest.simulate("change", { target: { value: "" } });
    });

    test('"currency-dest" should limit input to 3 letters', () => {
      currDest.simulate("change", { target: { value: "abCd" } });
      expect(currDest.instance().value).toEqual("ABC");
      currDest.simulate("change", { target: { value: "" } });
    });

    test('"currency-dest" should reject non-alphabetical input', () => {
      const input = "123456789!@#$%^&*().,;'[]{}\\|'\"`~:-";
      currDest.simulate("change", { target: { value: input } });
      expect(currDest.instance().value).toEqual("");
    });

    test('"currency-date" should accept digit and hyphen input', () => {
      currDate.simulate("change", { target: { value: "2019-01-01" } });
      expect(currDate.instance().value).toEqual("2019-01-01");
      currDate.simulate("change", { target: { value: "" } });
    });

    test('"currency-date" should limit input to 10 characters', () => {
      currDate.simulate("change", { target: { value: "2019-02-021" } });
      expect(currDate.instance().value).toEqual("2019-02-02");
      currDate.simulate("change", { target: { value: "" } });
    });

    test('"currency-date" should reject non-digit or hyphen input', () => {
      const input = "!@#$%^&*().,;'[]{}\\|'\"`~:abcdefghijklmnopqrstuvwxyz";
      currDate.simulate("change", { target: { value: input } });
      expect(currDate.instance().value).toEqual("");
    });

    it('should show correct error in "conversion-result" on incomplete symbol', async () => {
      currDate.simulate("change", { target: { value: "2012-02-02" } });
      currSrc.simulate("change", { target: { value: "US" } });
      currDest.simulate("change", { target: { value: "EUR" } });
      const expected = "Please complete each field";
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            rates: {
              EUR: 0.7637085688,
            },
            base: "USD",
            date: "2012-02-02",
          },
          status: 200,
          statusText: "",
          headers: {
            "content-type": "application/json",
            "cache-control": "public, max-age=1800",
            expires: "Sat, 20 Jul 2019 02:01:47 GMT",
          },
          config: {
            transformRequest: {},
            transformResponse: {},
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            headers: {
              Accept: "application/json, text/plain, */*",
            },
            method: "get",
            url: "https://api.exchangeratesapi.io/2012-02-02?base=USD&symbols=EUR",
          },
          request: {},
        })
      );
      expect(axios.get).toHaveBeenCalledTimes(0);
      findRate.simulate("click");
      await new Promise(setImmediate);
      cc.update();
      expect(axios.get).toHaveBeenCalledTimes(0);
      expect(result.text()).toEqual(expected);
    });

    it('should show correct error in "conversion-result" on incomplete date', async () => {
      currDate.simulate("change", { target: { value: "2012-02-0" } });
      currSrc.simulate("change", { target: { value: "USD" } });
      currDest.simulate("change", { target: { value: "EUR" } });
      const expected = "Please complete each field";
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            rates: {
              EUR: 0.7637085688,
            },
            base: "USD",
            date: "2012-02-02",
          },
          status: 200,
          statusText: "",
          headers: {
            "content-type": "application/json",
            "cache-control": "public, max-age=1800",
            expires: "Sat, 20 Jul 2019 02:01:47 GMT",
          },
          config: {
            transformRequest: {},
            transformResponse: {},
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            headers: {
              Accept: "application/json, text/plain, */*",
            },
            method: "get",
            url: "https://api.exchangeratesapi.io/2012-02-02?base=USD&symbols=EUR",
          },
          request: {},
        })
      );
      findRate.simulate("click");
      await new Promise(setImmediate);
      cc.update();
      expect(axios.get).toHaveBeenCalledTimes(0);
      expect(result.text()).toEqual(expected);
    });
  });

  describe("performs requests", () => {
    beforeEach(() => {
      cc = mount(<CurrencyConverter />);
      findRate = cc.find(".find-rate");
      currSrc = cc.find(".currency-source");
      currDest = cc.find(".currency-destination");
      currDate = cc.find(".currency-date");
      reset = cc.find(".reset-fields");
      result = cc.find(".conversion-result");
    });
    afterEach(() => jest.resetAllMocks());

    it('should call the `axios.get` function and put the result in the "conversion-result" element upon success', async () => {
      currDate.simulate("change", { target: { value: "2007-11-13" } });
      currSrc.simulate("change", { target: { value: "JPY" } });
      currDest.simulate("change", { target: { value: "GBP" } });
      const expected = "0.0043781064";

      const data = {
        data: {
          base: "JPY",
          rates: {
            GBP: 0.0043781064,
          },
          date: "2007-11-13",
        },
      };

      axios.get.mockImplementationOnce(() => Promise.resolve(data));

      findRate.simulate("click");
      await new Promise(setImmediate);

      expect(axios.get).toHaveBeenCalledTimes(1);

      expect(result.text()).toEqual(expected);
    });

    it('should call the `axios.get` function and put the result in the "conversion-result" element upon src symbol error', async () => {
      currDate.simulate("change", { target: { value: "2000-02-02" } });
      currSrc.simulate("change", { target: { value: "XYZ" } });
      currDest.simulate("change", { target: { value: "USD" } });
      const expected = "Base 'XYZ' is not supported.";

      const error = {
        response: {
          data: {
            error: "Base 'XYZ' is not supported.",
          },
        },
      };

      axios.get.mockImplementationOnce(() => Promise.reject(error));

      findRate.simulate("click");
      await new Promise(setImmediate);

      expect(axios.get).toHaveBeenCalledTimes(1);

      expect(result.text()).toEqual(expected);
    });

    it('should call the `axios.get` function and put the result in the "conversion-result" element upon dest symbol error', async () => {
      currDate.simulate("change", { target: { value: "2000-02-02" } });
      currSrc.simulate("change", { target: { value: "USD" } });
      currDest.simulate("change", { target: { value: "XYZ" } });
      const expected = "Symbols 'XYZ' are invalid for date 2000-02-02.";

      const error = {
        response: {
          data: {
            error: "Symbols 'XYZ' are invalid for date 2000-02-02.",
          },
        },
      };

      axios.get.mockImplementationOnce(() => Promise.reject(error));

      findRate.simulate("click");
      await new Promise(setImmediate);

      expect(axios.get).toHaveBeenCalledTimes(1);

      expect(result.text()).toEqual(expected);
    });

    it('should call the `axios.get` function and put the result in the "conversion-result" element upon date formatting error', async () => {
      currDate.simulate("change", { target: { value: "2000-53-02" } });
      currSrc.simulate("change", { target: { value: "USD" } });
      currDest.simulate("change", { target: { value: "EUR" } });
      const expected = "Please complete each field";

      const error = {
        response: {
          data: {
            error: "time data '2000-53-02' does not match format '%Y-%m-%d'",
          },
        },
      };

      axios.get.mockImplementationOnce(() => Promise.reject(error));

      findRate.simulate("click");
      await new Promise(setImmediate);

      //This error is caugut in validate function. Hence, no API call is made.
      expect(axios.get).toHaveBeenCalledTimes(0);

      expect(result.text()).toEqual(expected);
    });
  });
});
