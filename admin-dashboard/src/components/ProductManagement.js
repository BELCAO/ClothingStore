import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, IconButton, Modal, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './ProductManagement.css'; // Import file CSS cho react-paginate

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5 rows per page
  const [totalPages, setTotalPages] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    productId: '',
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    status: 1,
    quantity: 100,
    imageUrls: [],
    categoryId: ''
  });

  useEffect(() => {
    fetchProducts(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const fetchProducts = (page, size) => {
    axios.get(`http://localhost:8080/products?page=${page}&size=${size}`)
      .then(response => {
        setProducts(response.data.content || []);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  };

  const handleOpen = (product) => {
    setSelectedProduct(product.imageUrls ? product : { ...product, imageUrls: [] });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct({
      productId: '',
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      status: 1,
      quantity: 100,
      imageUrls: [],
      categoryId: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  const handleImageUrlsChange = (e, index) => {
    const newImageUrls = [...selectedProduct.imageUrls];
    newImageUrls[index] = e.target.value;
    setSelectedProduct({ ...selectedProduct, imageUrls: newImageUrls });
  };

  const addImageUrlField = () => {
    setSelectedProduct({ ...selectedProduct, imageUrls: [...selectedProduct.imageUrls, ''] });
  };

  const removeImageUrlField = (index) => {
    const newImageUrls = selectedProduct.imageUrls.filter((_, i) => i !== index);
    setSelectedProduct({ ...selectedProduct, imageUrls: newImageUrls });
  };

  const handleSave = () => {
    if (selectedProduct.productId) {
      axios.put(`http://localhost:8080/product/${selectedProduct.productId}`, selectedProduct)
        .then(() => {
          fetchProducts(page, rowsPerPage);
          handleClose();
        })
        .catch(error => {
          console.error('There was an error updating the product!', error);
        });
    } else {
      axios.post('http://localhost:8080/product', selectedProduct)
        .then(() => {
          fetchProducts(page, rowsPerPage);
          handleClose();
        })
        .catch(error => {
          console.error('There was an error creating the product!', error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete('http://localhost:8080/product', { data: [id] })
      .then(() => {
        fetchProducts(page, rowsPerPage);
      })
      .catch(error => {
        console.error('There was an error deleting the product!', error);
      });
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPage(selectedPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Quản lý sản phẩm
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen({})}>
        Thêm sản phẩm mới
      </Button>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="rows-per-page-label">Số lượng</InputLabel>
        <Select
          labelId="rows-per-page-label"
          id="rows-per-page"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          label="Số lượng"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>15</MenuItem>
          <MenuItem value={50}>20</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>ID Danh mục</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.productId}>
                <TableCell>{product.productId}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.categoryId}</TableCell> {/* Hiển thị ID của danh mục */}
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleOpen(product)}>Chỉnh sửa</Button>
                  <Button variant="contained" color="secondary" sx={{ ml: 1 }} onClick={() => handleDelete(product.productId)}>Xóa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 4, bgcolor: 'background.paper', boxShadow: 24, margin: 'auto', width: 400, maxHeight: '80vh', overflowY: 'auto' }}>
          <Typography variant="h6" gutterBottom>
            {selectedProduct.productId ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </Typography>
          <TextField label="Tên" name="name" value={selectedProduct.name} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Mô tả" name="description" value={selectedProduct.description} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Giá" name="price" type="number" value={selectedProduct.price} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="URL Hình ảnh" name="imageUrl" value={selectedProduct.imageUrl} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Trạng thái" name="status" type="number" value={selectedProduct.status} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Số lượng" name="quantity" type="number" value={selectedProduct.quantity} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Category ID" name="categoryId" type="number" value={selectedProduct.categoryId} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
          {selectedProduct.imageUrls.map((url, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                label={`Image URL ${index + 1}`}
                value={url}
                onChange={(e) => handleImageUrlsChange(e, index)}
                fullWidth
              />
              <IconButton color="secondary" onClick={() => removeImageUrlField(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button variant="contained" color="primary" onClick={addImageUrlField}>Thêm URL Hình ảnh</Button>
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>Lưu</Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default ProductManagement;
