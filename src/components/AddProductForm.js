import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productsReducer";
import Select from "./Select";

const AddProductForm = ({ setVisibleForm }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();

  // const navigate = useNavigate();
  const options = [
    { label: "Văn phòng phẩm", value: "Văn phòng phẩm" },
    { label: "Thực phẩm", value: "Thực phẩm" },
    { label: "Khác", value: "Khác" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
    };
    dispatch(addProduct(newProduct));
    // addNotification("Thêm hàng hóa thành công", "success");
    setVisibleForm(false);
    // navigate("/products"); // Chuyển hướng về danh sách hàng hóa sau khi thêm
  };

  return (
    <div className="form-container">
      <h2>Thêm Hàng Hóa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên hàng hóa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Giá hàng hóa"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Select
          options={options}
          value={selectedOption}
          onChange={(value) => {
            setSelectedOption(value);
          }}
          placeholder="Loại hàng hóa"
        />
        {/* {selectedOption === "1" && ( */}
        {selectedOption === "Văn phòng phẩm" && (
          <input
            type="text"
            placeholder="Hạn sử dụng"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        {/* )} */}

        <button type="submit">Thêm hàng hóa</button>
      </form>
      <button className="back-btn" onClick={() => setVisibleForm(false)}>
        Đóng
      </button>
    </div>
  );
};

export default AddProductForm;
