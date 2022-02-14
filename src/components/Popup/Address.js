import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { apiCity, apiDistrict, apiWard } from "./../../constants";

export default function ChooseAddress() {
  const [show, setShow] = useState(false);
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [address, setAddress] = useState("");
  const [postInfor, setPostInfor] = useState({
    city: "",
    district: "",
    wards: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPostInfor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name == "city") fetchDistrict(value);
    if (name == "district") fetchWard(value);
  };
  const handleOkAddress = () => {
    if (
      postInfor.city !== "" &&
      postInfor.district !== "" &&
      postInfor.wards !== "" &&
      postInfor.city !== "0" &&
      postInfor.district !== "0" &&
      postInfor.wards !== "0"
    ) {
      let city = dataCity[Number(postInfor.city) - 1].name;
      let district, wards;
      for (let i = 0; i < dataDistrict.length; i++) {
        if (dataDistrict[i].code == postInfor.district) {
          district = dataDistrict[i].name;
        }
      }
      for (let i = 0; i < dataWard.length; i++) {
        if (dataWard[i].code == postInfor.wards) {
          wards = dataWard[i].name;
        }
      }
      setAddress(`${wards}, ${district}, ${city}`);
      handleClose();
    } else {
      setAddress("");
    }
  };

  const handleClose = () => {
    setPostInfor({ city: "", district: "", wards: "" });
    setShow(false);
  };
  const handleShow = () => {
    fetchCity();
    setPostInfor({ city: "", district: "", wards: "" });
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
      <Modal show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chọn địa chỉ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="form6Example4">
                Tỉnh, thành phố*
              </label>
              <select
                className="form-select"
                aria-label="Disabled select example"
                name="city"
                onChange={(e) => handleOnChange(e)}
                required
              >
                <option value="0">Tỉnh, thành phố</option>
                {dataCity.map((data, index) => (
                  <option key={index} value={data.code}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="form6Example4">
                Quận, huyện, thị xã*
              </label>
              <select
                className="form-select"
                aria-label="Disabled select example"
                name="district"
                onChange={(e) => handleOnChange(e)}
                required
              >
                <option value="0">Quận, huyện, thị xã</option>
                {dataDistrict.map((data, index) => (
                  <option key={index} value={data.code}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="form6Example4">
                Phường, xã, thị trấn*
              </label>
              <select
                className="form-select"
                aria-label="Disabled select example"
                name="wards"
                onChange={(e) => handleOnChange(e)}
                required
              >
                <option value="0">Phường, xã, thị trấn</option>
                {dataWard.map((data, index) => (
                  <option key={index} value={data.code}>
                    {data.name}
                  </option>
                ))}
              </select>
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
  );
}
