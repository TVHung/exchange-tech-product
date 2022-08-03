import React, { useState, useEffect } from "react";
import "../AddressSelect/_addressSelect.scss";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { apiCity, apiDistrict } from "./../../constants";

export default function AddressSelectSearch({ addressValue, setAddress }) {
  //address handle
  const [show, setShow] = useState(false);
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [addressDetail, setAddressDetail] = useState({
    city: "0",
    district: "",
  });

  useEffect(() => {
    return () => {
      setShow();
      setDataCity();
      setDataDistrict();
      setAddressDetail();
    };
  }, []);

  const handleOnChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddressDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "city" && value !== "0") fetchDistrict(value); //lay gia tri de render ra quan, huyen
  };

  const handleOkAddress = () => {
    let city, district;
    if (addressDetail.city !== "0")
      for (let i = 0; i < dataCity.length; i++) {
        if (dataCity[i].code == addressDetail.city) {
          city = dataCity[i].name;
        }
      }
    else {
      city = "Toàn quốc";
    }
    for (let i = 0; i < dataDistrict.length; i++) {
      if (dataDistrict[i].code == addressDetail.district) {
        district = dataDistrict[i].name;
      }
    }
    if (addressDetail.district !== "" && addressDetail.district !== "0") {
      setAddress(`${district}, ${city}`);
    } else if (addressDetail.city !== "" && addressDetail.city !== "0") {
      setAddress(`${city}`);
    } else {
      setAddress("");
    }
    handleClose();
  };
  const handleClose = () => {
    setShow(false);
    setAddressDetail({ city: "0", district: "" });
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
                  <option value="0">Toàn quốc</option>
                  {dataCity &&
                    dataCity.map((data, index) => (
                      <option key={index} value={data.code}>
                        {data.name}
                      </option>
                    ))}
                </select>
              </div>
              {addressDetail?.city !== "0" && (
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
                    {dataDistrict &&
                      dataDistrict.map((data, index) => (
                        <option key={index} value={data.code}>
                          {data.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
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
          className={"form-control"}
          placeholder="Toàn quốc"
          readOnly
          value={addressValue}
          onClick={() => handleShow()}
        />
      </div>
    </div>
  );
}
