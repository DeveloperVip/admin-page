import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';

const Wrapper = styled('div')({
  width: '100%',
  display: 'flex',
});

const NewContainer = styled('div')({
  flex: 6,
});

const Top = styled('div')({
  backgroundColor: 'white',
  boxShadow: '2px 4px 10px 1px rgba(0, 0, 0, 0.47)',
  padding: '10px',
  margin: '20px',
  display: 'flex',

  h1: {
    color: 'lightgray',
    fontSize: '20px',
  },
});

const Bottom = styled('div')({
  backgroundColor: 'white',
  boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
  padding: '10px',
  margin: '20px',
  display: 'flex',
});

const Left = styled('div')({
  flex: 1,
  textAlign: 'center',

  img: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
});

const Right = styled('div')({
  flex: 2,

  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    justifyContent: 'space-around',

    '.formInput': {
      width: '80%',
      height: '50px',

      label: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',

        '.icon': {
          cursor: 'pointer',
        },
      },

      input: {
        width: '100%',
        padding: '5px',
        border: 'none',
        borderBottom: '1px solid gray',
      },
    },

    button: {
      width: '150px',
      padding: '10px',
      border: 'none',
      backgroundColor: '#4B7BE5',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',

      '&:disabled': {
        backgroundColor: 'rgba(3, 92, 92, 0.322)',
        cursor: 'not-allowed',
      },
    },
  },
});

const SuccessMessage = styled('div')({
  backgroundColor: '#4caf50',
  color: 'white',
  padding: '10px',
  marginTop: '10px',
  textAlign: 'center',
});

const EditProduct = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [size, setSize] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorieDetails, setCategorieDetails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [categorieId, setCategorieId] = useState('');
  const [categorieDetailsId, setCategorieDetailsId] = useState('');
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePrixChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value.split(','));
  };

  const handleCategorieIdChange = (e) => {
    handleCategory(e.target.value)
    console.log("🚀 ~ handleCategorieIdChange ~ e.target.value:", e.target.value)
    setCategorieId(e.target.value);
    
  };

  const handleCategory=(category)=>{
    switch (category) {
      case "Technology": setCategorieDetails(
        [
          "Điện thoại",
          "Máy tính",
          "Tablet",
          "Phụ kiện công nghệ",
          "Máy giặt",
          "Tủ lạnh",
        ],
      )
        
        break;
        case "Furniture": setCategorieDetails(
          ["Ghế", "Sofa", "Bàn", "Giường", "Khác"],
        )
          
          break;
          case "Fashion": setCategorieDetails(
            ["Đầm/váy", "Dép và Guốc", "Quần", "Áo", "Balo", "Giày"],
          )
            
            break;
    
      default:setCategorieDetails(
        [
          "Máy chiếu",
          "Tivi",
          "Quạt",
          "Gia dụng",
          "Bàn ủi",
          "Máy quay phim",
          "Máy ảnh",
          "Công cụ",
          "Máy in",
        ],
      )
        break;
    }
  }

  const handleSelectChange = (event) => {
    setCategorieDetailsId(event.target.value) // Changed to 'categorie_id'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', name);
    formData.append('price', price);
    formData.append('imageFile', image);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('size', size);
    formData.append('categorie_id', categorieId);
    formData.append('categorieDetails_id', categorieDetailsId);
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT',
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/api/products/${id}`,
        formData,
        config
      );

      const updatedUser = response.data;
      console.log('user updated:', updatedUser);
      setUpdateSuccess(true);
      //navigate(-1);
    } catch (error) {
      console.error('failed to update:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/_categories');
      setCategories(response.data['hydra:member']);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div
      className='new'
      style={{ display: 'flex', justifyContent: 'center',  height: '100vh', width: '180vh' }}
    >
      <Wrapper sx={{ margin: '0 auto', height: '70vh', width: '170vh' }}>
        <NewContainer>
          {updateSuccess && <SuccessMessage>Mise à jour réussie!</SuccessMessage>}
          <Top>
            <h1>Chỉnh sửa sản phẩm</h1>
          </Top>
          <div></div>
          <Bottom>
            <Left>
              <label htmlFor='file'>
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt=''
                />
                Image: <DriveFolderUploadOutlinedIcon className='icon' />
              </label>
              <input type='file' id='file' onChange={handleImageChange} style={{ display: 'none' }} />
            </Left>
            <Right>
              <form onSubmit={handleSubmit}>
                <div className='formInput' style={{ display: 'flex', gap: '30px' }}>
                  <label htmlFor='name'>
                    Tên:
                    <input type='text' id='name' value={name} onChange={handleNameChange} />
                  </label>
                  <label htmlFor='price'>
                    Giá:
                    <input type='number' id='price' value={price} onChange={handlePrixChange} />
                  </label>
                </div>
                <div className='formInput' style={{ display: 'flex', gap: '30px' }}>
                  <label htmlFor='size'>
                    Số lượng:
                    <input type='text' id='size' value={size[0]} onChange={handleSizeChange} />
                  </label>
                  
                </div>
                <div className='formInput' style={{ display: 'flex', gap: '30px' }}>
                  <label htmlFor='description'>
                    Mô tả:
                    <input type='text' id='description' value={description} onChange={handleDescriptionChange} />
                  </label>
                </div>
                <div className='formInput' style={{ display: 'flex', gap: '30px' }}>
                  <label htmlFor='categorie'>
                    Danh mục:
                    <select name='categorie' id='categorie' onChange={handleCategorieIdChange}>
                      {categories.map((categorie) => (
                        <option key={categorie.id} value={categorie.id}>
                          {categorie.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor='categorieDetails'>
                    Danh mục chi tiết:
                    <select name='categorieDetails' id='categorieDetails' onChange={handleSelectChange}>
                      {categorieDetails.map((categorieDetails) => (
                        <option key={categorieDetails.id} value={categorieDetails.id}>
                          {categorieDetails}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <button type='submit'>Gửi</button>
              </form>
            </Right>
          </Bottom>
        </NewContainer>
      </Wrapper>
    </div>
  );
};

export default EditProduct;