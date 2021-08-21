import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import FormContainer from '../components/FormContainer';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading: loadingProductDetails, error: errorProductDetails, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingProductUpdate, success: successProductUpdate, error: errorProductUpdate } = productUpdate;

  useEffect(() => {
    if (successProductUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    }
    if (!product.name || product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setBrand(product.brand);
      setDescription(product.description);
      setImage(product.image);
      setCountInStock(product.countInStock);
    }
  }, [dispatch, product, productId, history, successProductUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        category,
        brand,
        price,
        countInStock,
        description,
        image,
      })
    );
  };

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingProductUpdate && <Loader />}
        {errorProductUpdate && <Message variant="danger">{errorProductUpdate}</Message>}
        {loadingProductDetails ? (
          <Loader />
        ) : errorProductDetails ? (
          <Message variant="danger">{errorProductDetails}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the description of the product"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="phone"
                placeholder="Enter the price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Upload the image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File id="image-file" label="Choose File" custom onChange={handleUploadFile}></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter the count in stocks"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
