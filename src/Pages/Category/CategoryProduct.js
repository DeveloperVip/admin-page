import { Table, Modal, Form, Input, Button } from 'antd';
import './CategoryProduct.css';
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';

const CategoryProduct = () => {
    const [data, setData] = useState([
        {
          id: 1,
          name: "Product 1",
          categoryName: "Category 1",
          image: "/path/to/image1.jpg",
        },
        {
          id: 2,
          name: "Product 2",
          categoryName: "Category 2",
          image: "/path/to/image2.jpg",
        },
        {
          id: 3,
          name: "Product 3",
          categoryName: "Category 1",
          image: "/path/to/image3.jpg",
        },
        {
          id: 4,
          name: "Product 4",
          categoryName: "Category 2",
          image: "/path/to/image4.jpg",
        },
        {
          id: 5,
          name: "Product 5",
          categoryName: "Category 3",
          image: "/path/to/image5.jpg",
        },
    ]);

    const [visible, setVisible] = useState(false); // Trạng thái của Modal
    const [form] = Form.useForm(); // Form để nhập thông tin sản phẩm mới

    const navigate = useNavigate();

    const handleAdd = () => {
        setVisible(true);
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = (id) => {
        const newData = data.filter(item => item.id !== id);
        setData(newData);
    };

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                setVisible(false);
                // Thêm sản phẩm mới vào danh sách
                const newProduct = {
                    id: data.length + 1,
                    name: values.name,
                    categoryName: values.categoryName,
                    image: values.image,
                };
                setData([...data, newProduct]);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        setVisible(false);
    };

    const columns = [
        { title: 'id', dataIndex: 'id', key: 'id' },
        { title: 'Nom', dataIndex: 'name', key: 'name' },
        { title: 'Categories name', dataIndex: 'categoryName', key: 'categoryName' },
        { 
            title: 'Image', 
            dataIndex: 'image', 
            key: 'image',
            render: (image) => (
                <img src={image} alt="Product" style={{ width: '50px', height: '50px' }} />
            )
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'actions',
            render: (record) => (
                <span>
                    <button onClick={() => handleEdit(record.id)}>
                        <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(record.id)}>
                        <FaTrashAlt />
                    </button>
                </span>
            ),
        },
    ];

    return (
        <div className="container">
            <div style={{ marginBottom: '16px' }}>
                <Button type="primary" onClick={() => navigate('/Addproduct')} icon={<FaPlus />}>
                    Thêm sản phẩm
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={{ pageSize: 7 }}
                scroll={{ x: true }}
            />
            <Modal
                title="Thêm sản phẩm mới"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tên danh mục"
                        name="categoryName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Đường dẫn hình ảnh"
                        name="image"
                        rules={[{ required: true, message: 'Vui lòng nhập đường dẫn hình ảnh!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
export default CategoryProduct;