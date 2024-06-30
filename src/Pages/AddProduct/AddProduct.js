import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CategoryDetail from "../../utils/CategoryDetail";
import Brand from "../../utils/Brand";
import Colors from "../../utils/Color";
import { InternalMemory, Sizes } from "../../utils/Size";
import Materials from "../../utils/Material";

const Wrapper = styled("div")({
  width: "100%",
  display: "flex",
});

const NewContainer = styled("div")({
  flex: 6,
});

const Top = styled("div")({
  backgroundColor: "white",
  boxShadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
  padding: "10px",
  margin: "20px",
  display: "flex",

  h1: {
    color: "lightgray",
    fontSize: "20px",
  },
});

const Bottom = styled("div")({
  backgroundColor: "white",
  boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
  padding: "10px",
  margin: "20px",
  display: "flex",
});

const Left = styled("div")({
  flex: 1,
  textAlign: "center",

  img: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
  },
});

const Right = styled("div")({
  flex: 2,

  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    justifyContent: "space-around",

    ".formInput": {
      width: "80%",
      height: "50px",

      label: {
        display: "flex",
        alignItems: "center",
        gap: "10px",

        ".icon": {
          cursor: "pointer",
        },
      },

      input: {
        width: "100%",
        padding: "5px",
        border: "none",
        borderBottom: "1px solid gray",
      },
    },

    button: {
      width: "150px",
      padding: "10px",
      border: "none",
      backgroundColor: "#4B7BE5",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "10px",

      "&:disabled": {
        backgroundColor: "rgba(3, 92, 92, 0.322)",
        cursor: "not-allowed",
      },
    },
  },
});

const AddProduct = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({});
  const [additionalImages, setAdditionalImages] = useState([]);
  const [categories, setCategories] = useState([
    "Đồ điện tử",
    "Nội thất",
    "Thời trang",
    "Thiết bị khác",
  ]);
  const [brand, setBrand] = useState([]);

  const categoryName = ["Technology", "Furniture", "Fashion", "Another"];
  const [categorieDetails, setCategorieDetails] = useState([]);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleFileChange = (event) => {
    console.log(
      "🚀 ~ handleFileChange ~ event.target.files[0].name:",
      event.target.files[0]
    );
    setData({ ...data, file: `${event.target.files[0].name}` });
  };

  const handleAdditionalImagesChange = (event) => {
    const additionalImages = event.target.files;
    const additionalImageNames = [];

    for (let i = 0; i < additionalImages.length; i++) {
      additionalImageNames.push(additionalImages[i].name);
    }
    console.log(additionalImages);
    setData({ ...data, additionalImages: additionalImageNames });

    setAdditionalImages([...additionalImages]);
  };
  
  const handleSelectDetailChange = (e) => {
    setData({ ...data, categorieDetail_id: e.target.selectedOptions[0].value });
  };

  const handleSelectChange = (event) => {
    setData({ ...data, categorie_id: event.target.selectedOptions[0].value });
    console.log(
      "🚀 ~ handleSelectDetailChange ~ e.target.selectedOptions[0].value:",
      event.target.selectedOptions[0].value
    );
    handleCategory(event.target.selectedOptions[0].value); // Changed to 'categorie_id'
  };

  const handleBrandChange = (event) => {
    setData({ ...data, brand: event.target.selectedOptions[0].value });
  };

  const handleCategory = (category) => {
    switch (category) {
      case "Technology":
        setCategorieDetails(CategoryDetail.Technology);
        setBrand(Brand.Technology);
        break;
      case "Furniture":
        setCategorieDetails(CategoryDetail.Furniture);
        setBrand(Brand.Furniture);
        break;
      case "Fashion":
        setCategorieDetails(CategoryDetail.Fashion);
        setBrand(Brand.Fashion);

        break;

      default:
        setCategorieDetails(CategoryDetail.Another);
        setBrand(Brand.Another);
        break;
    }
  };

  const handleColorChange = (e) => {
    console.log(e.target.selectedOptions[0].value);
    e.target.nextElementSibling.style.backgroundColor =
      e.target.selectedOptions[0].value;
      const color = {name:e.target.selectedOptions[0].getAttribute("name"),
        value:e.target.selectedOptions[0].value
      }
    setData({...data,color:color})
  };

  const handleSizeNumberChange = (e)=>{
    console.log(e.target.selectedOptions[0].value);
    setData({...data,sizeOfNumber:e.target.selectedOptions[0].value})
  }

  const handleSizeStringChange = (e)=>{
    console.log(e.target.selectedOptions[0].value);
    setData({...data,sizeOfString:e.target.selectedOptions[0].value})
  }

  const handleInternalMemoryChange = (e)=>{
    console.log(e.target.selectedOptions[0].value);
    setData({...data,internalMemory:e.target.selectedOptions[0].value})
  }

  const handleMaterialChange =(e)=>{
    console.log(e.target.selectedOptions[0].value);
    setData({...data,material:e.target.selectedOptions[0].value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(data);
    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("price", data.price);
    // formData.append("file", file);
    // formData.append("categorie_id", data.categorie_id); // Changed to 'categorie_id'
    // formData.append("categorieDetail_id", data.categorieDetail_id);
    // formData.append("brand", data.brand);
    // formData.append("description", data.description);
    // formData.append("size", data.size);
    // console.log(formData);
    console.log(data);
    axios
      .post("http://localhost:8000/product/create-product", data)
      .then((response) => {
        console.log(response.data);
        // handle success
        navigate(-1);
      })
      .catch((error) => {
        console.log(error.response.data);
        // handle error
      });
  };

  return (
    <div
      className="new"
      style={{
        display: "flex",
        justifyContent: "center",
        height: "110vh",
        width: "180vh",
      }}
    >
      <Wrapper sx={{ margin: "0 auto", height: "70vh", width: "170vh" }}>
        <NewContainer>
          <Top>
            <h1>Thêm sản phẩm mới </h1>
          </Top>
          <div></div>
          <Bottom>
            <Left>
              <label htmlFor="file">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
                Hình ảnh: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="additionalImages">
                Hình ảnh phụ:
                {additionalImages.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`additional-image-${index}`}
                  />
                ))}
                <input
                  type="file"
                  id="additionalImages"
                  onChange={handleAdditionalImagesChange}
                  multiple // Cho phép chọn nhiều file
                  style={{ display: "none" }}
                />
                <button
                  onClick={() =>
                    document.getElementById("additionalImages").click()
                  }
                >
                  Thêm hình ảnh phụ
                </button>
              </label>
            </Left>
            <Right>
              <form onSubmit={handleSubmit}>
                <div
                  className="formInput"
                  style={{ display: "flex", gap: "30px" }}
                >
                  <label htmlFor="name">
                    Tên:
                    <input
                      type="text"
                      id="name"
                      placeholder="Tên sản phẩm"
                      onChange={handleInput}
                    />
                  </label>
                  <label htmlFor="price">
                    Giá:
                    <input
                      type="number"
                      id="price"
                      placeholder="Giá sản phẩm"
                      onChange={handleInput}
                    />
                  </label>
                </div>
                <div
                  className="formInput"
                  style={{ display: "flex", gap: "30px" }}
                >
                  <label htmlFor="size">
                    Số lượng:
                    <input
                      type="number"
                      id="size"
                      placeholder="Số lượng sản phẩm"
                      onChange={handleInput}
                    />
                  </label>
                </div>
                <div className="formInput" style={{ height: "auto" }}>
                  <label htmlFor="categorie_id">
                    {" "}
                    {/* Updated htmlFor value */}
                    Chọn danh mục:
                    <select id="categorie_id" onChange={handleSelectChange}>
                      {" "}
                      {/* Updated id value */}
                      <option value="">Chọn danh mục</option>
                      {categories.map((category, index) => (
                        <option key={category.id} value={categoryName[index]}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="categorieDetail_id">
                    {" "}
                    {/* Updated htmlFor value */}
                    Chọn danh mục chi tiết:
                    <select
                      id="categorieDetail_id"
                      onChange={handleSelectDetailChange}
                    >
                      {" "}
                      {/* Updated id value */}
                      <option value="">Mục chi tiết</option>
                      {categorieDetails.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="brand">
                    Thương hiệu:
                    <select id="brand" onChange={handleBrandChange}>
                      {" "}
                      {/* Updated id value */}
                      {brand.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="colors">
                    Màu sắc:
                    <select id="colors" onChange={handleColorChange}>
                      {Colors.map((item) => (
                        <option
                          className="d-flex"
                          name={item.name}
                          value={item.hexCode}
                        >
                          <label
                            className="form-check-label"
                            htmlFor={`color-${item.name}`}
                          >
                            {item.name}
                          </label>
                        </option>
                      ))}
                    </select>
                    <div
                      style={{
                        height: "15px",
                        width: "15px",
                        backgroundColor: "red",
                      }}
                    ></div>
                  </label>

                  {data.categorie_id === "Fashion" ? (
                    <label htmlFor="sizeOfNumber">
                      Kích cỡ theo số:
                      <select id="sizeOfNumber" onChange={handleSizeNumberChange}>
                        {Sizes.number.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    ""
                  )}

                  {data.categorie_id === "Technology" ? (
                    <label htmlFor="internalMemory">
                      Bộ nhớ trong:
                      <select id="internalMemory" onChange={handleInternalMemoryChange}>
                        {InternalMemory.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    ""
                  )}

                  {data.categorie_id === "Fashion" ? (
                    <label htmlFor="sizeOfString">
                      Kích cỡ theo chữ:
                      <select id="sizeOfString" onChange={handleSizeStringChange}>
                        {Sizes.string.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    ""
                  )}
                  
                  {data.categorie_id === "Furniture" ? (
                    <label htmlFor="material">
                      Chất liệu:
                      <select id="material" onChange={handleMaterialChange}>
                        {Materials.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    ""
                  )}
                </div>
                <div className="formInput">
                  <label htmlFor="description">
                    Mô tả:
                    <textarea
                      id="description"
                      placeholder="Mô tả sản phẩm"
                      onChange={handleInput}
                    ></textarea>
                  </label>
                </div>
                <div className="formInput">
                  <button type="submit">Gửi</button>
                </div>
              </form>
            </Right>
          </Bottom>
        </NewContainer>
      </Wrapper>
    </div>
  );
};

export default AddProduct;
