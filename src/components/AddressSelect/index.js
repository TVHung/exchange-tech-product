import React, { useState, useEffect } from "react";
import "./_addressSelect.scss";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { apiCity, apiDistrict, apiWard } from "./../../constants";
import { isNull } from "./../../validations";

export default function AddressSelect({
  address,
  setAddress,
  validateAddress,
}) {
  //address handle
  const [show, setShow] = useState(false);
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [addressSelect, setAddressSelect] = useState("");
  const [addressDetail, setAddressDetail] = useState({
    city: "",
    district: "",
    wards: "",
    cityName: "",
    districtName: "",
    wardName: "",
  });

  const [addressValidate, setAddressValidate] = useState({
    city: "",
    district: "",
    wards: "",
    cityName: "",
    districtName: "",
    wardName: "",
  });

  useEffect(() => {
    return () => {
      setShow();
      setDataCity([]);
      setDataDistrict([]);
      setAddressDetail({});
    };
  }, []);

  const handleOnChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddressDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name == "city") fetchDistrict(value); //lay gia tri de render ra quan, huyen
    if (name == "district") fetchWard(value); //lay gia tri de render ra xa
  };

  const handleOkAddress = () => {
    let cityName = "city";
    let districtName = "district";
    let wardName = "wards";
    if (isNull(addressDetail.city) || addressDetail.city == "0")
      setAddressValidate((prevState) => ({
        ...prevState,
        [cityName]: "Bạn chưa chọn tỉnh, thành phố",
      }));
    else
      setAddressValidate((prevState) => ({
        ...prevState,
        [cityName]: "",
      }));
    if (isNull(addressDetail.district) || addressDetail.district == "0")
      setAddressValidate((prevState) => ({
        ...prevState,
        [districtName]: "Bạn chưa chọn quận, huyện, thị xã",
      }));
    else
      setAddressValidate((prevState) => ({
        ...prevState,
        [districtName]: "",
      }));
    if (isNull(addressDetail.wards) || addressDetail.wards == "0")
      setAddressValidate((prevState) => ({
        ...prevState,
        [wardName]: "Bạn chưa chọn phường, xã, thị trấn",
      }));
    else
      setAddressValidate((prevState) => ({
        ...prevState,
        [wardName]: "",
      }));
    if (
      addressDetail.city !== "" &&
      addressDetail.district !== "" &&
      addressDetail.wards !== "" &&
      addressDetail.city !== "0" &&
      addressDetail.district !== "0" &&
      addressDetail.wards !== "0"
    ) {
      let city, district, wards;
      for (let i = 0; i < dataCity.length; i++) {
        if (dataCity[i].code == addressDetail.city) {
          city = dataCity[i].name;
          let name = "cityName";
          // eslint-disable-next-line no-loop-func
          setAddressDetail((prevState) => ({
            ...prevState,
            [name]: city,
          }));
        }
      }
      for (let i = 0; i < dataDistrict.length; i++) {
        if (dataDistrict[i].code == addressDetail.district) {
          district = dataDistrict[i].name;
          let name = "districtName";
          // eslint-disable-next-line no-loop-func
          setAddressDetail((prevState) => ({
            ...prevState,
            [name]: district,
          }));
        }
      }
      for (let i = 0; i < dataWard.length; i++) {
        if (dataWard[i].code == addressDetail.wards) {
          wards = dataWard[i].name;
          let name = "wardName";
          // eslint-disable-next-line no-loop-func
          setAddressDetail((prevState) => ({
            ...prevState,
            [name]: wards,
          }));
        }
      }
      setAddressSelect(`${wards}, ${district}, ${city}`);
      setAddress(`${wards}, ${district}, ${city}`);
      handleClose();
    } else {
      setAddressSelect("");
      setAddress("");
    }
  };
  const handleClose = () => {
    setShow(false);
    setAddressDetail({ city: "", district: "" });
    setAddressValidate({});
  };
  const handleShow = () => {
    fetchCity();
    setShow(true);
  };

  const fetchCity = async () => {
    await axios
      .get(apiCity)
      .then((res) => {
        const data = res.data;
        setDataCity(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchDistrict = async (city_id) => {
    await axios
      .get(`${apiDistrict}/${city_id}/?depth=2`)
      .then((res) => {
        const data = res.data;
        setDataDistrict(data.districts);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchWard = async (district_id) => {
    await axios
      .get(`${apiWard}/${district_id}/?depth=2`)
      .then((res) => {
        const data = res.data;
        setDataWard(data.wards);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <Modal show={show} onHide={() => handleClose()} centered>
          <Modal.Header closeButton>
            <Modal.Title>Chọn địa chỉ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="post-city">
                  <b>Tỉnh, thành phố*</b>
                </label>
                <select
                  className="form-select"
                  aria-label="Disabled select example"
                  name="city"
                  id="post-city"
                  onChange={(e) => handleOnChangeAddress(e)}
                  required
                >
                  <option value="0">Tỉnh, thành phố</option>
                  {dataCity?.map((data, index) => (
                    <option key={index} value={data.code}>
                      {data.name}
                    </option>
                  ))}
                </select>
                <p className="validate-form-address">{addressValidate.city}</p>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="post-district">
                  <b>Quận, huyện, thị xã*</b>
                </label>
                <select
                  className="form-select"
                  aria-label="Disabled select example"
                  name="district"
                  id="post-district"
                  onChange={(e) => handleOnChangeAddress(e)}
                  required
                >
                  <option value="0">Quận, huyện, thị xã</option>
                  {dataDistrict?.map((data, index) => (
                    <option key={index} value={data.code}>
                      {data.name}
                    </option>
                  ))}
                </select>
                <p className="validate-form-address">
                  {addressValidate.district}
                </p>
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="post-ward">
                  <b>Phường, xã, thị trấn*</b>
                </label>
                <select
                  className="form-select"
                  aria-label="Disabled select example"
                  name="wards"
                  id="post-ward"
                  onChange={(e) => handleOnChangeAddress(e)}
                  required
                >
                  <option value="0">Phường, xã, thị trấn</option>
                  {dataWard?.map((data, index) => (
                    <option key={index} value={data.code}>
                      {data.name}
                    </option>
                  ))}
                </select>
                <p className="validate-form-address">{addressValidate.wards}</p>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Hủy
            </Button>
            <Button variant="primary" onClick={() => handleOkAddress()}>
              Xong
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <input
          type="text"
          id="post-address"
          className={
            validateAddress ? "form-control is-invalid" : "form-control"
          }
          placeholder="Chọn địa chỉ"
          readOnly
          value={addressSelect == "" ? address : addressSelect}
          onClick={() => handleShow()}
        />
      </div>
    </div>
  );
}
