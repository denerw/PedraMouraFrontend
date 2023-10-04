import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetVehiclesQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { Form, Button } from 'react-bootstrap'; 
import Modal from 'react-bootstrap/Modal';

const Vehicles = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const { isLoading } = useGetVehiclesQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const data = [
    { "id": 1, "placa": "ABC-1234", "modelo": "Toyota Corolla", "tipo": "sedan", "quilometragem": 50000, "ano": 2018 },
    { "id": 2, "placa": "DEF-5678", "modelo": "Honda Civic", "tipo": "sedan", "quilometragem": 60000, "ano": 2019 },
    { "id": 3, "placa": "GHI-9012", "modelo": "Ford Focus", "tipo": "hatchback", "quilometragem": 45000, "ano": 2017 }];

  const modalStyles = {
    content: {
      backgroundColor: theme.palette.background.alt, // Define a cor de fundo da modal como roxa     
      margin: 'auto', // Centraliza a modal horizontalmente     
      borderRadius: '10px', // Adiciona cantos arredondados    
      padding: '20px', // Adiciona espaço interno   
    }
  };

  const [formData, setFormData] = useState({ placa: '', modelo: '', tipo: '', quilometragem: '', ano: '', });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "placa",
      headerName: "Placa",
      flex: 1,
    },
    {
      field: "modelo",
      headerName: "Modelo",
      flex: 1,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      flex: 1,
    },
    {
      field: "quilometragem",
      headerName: "Quilometragem",
      flex: 1,
    },
    {
      field: "ano",
      headerName: "Ano",
      flex: 1,
    }
  ];

  const [formValidated, setFormValidated] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    else{
  
      // Aqui você pode adicionar a lógica para lidar com os dados do formulário
      console.log('Dados do formulário:', formData);
      handleClose();
    }
    
    setFormValidated(true);
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="VEÍCULOS" subtitle="Lista completa de veículos" />
      <Button onClick={handleShow}>CRIAR VEÍCULO</Button>
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          // rows={(data && data.transactions) || []}
          rows={(data) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          onRowClick={(modalData) => console.log(modalData)}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>

      <Modal show={show} onHide={handleClose} style={modalStyles}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Veiculo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Placa:</Form.Label>
            <Form.Control
              type="text"
              name="placa"
              value={formData.placa}
              onChange={handleInputChange}
              required
            />
            </Form.Group>
            <Form.Group>
              <Form.Label>Modelo:</Form.Label>
              <Form.Control
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo:</Form.Label>
              <Form.Control
                type="text"
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quilometragem:</Form.Label>
              <Form.Control
                type="text"
                name="quilometragem"
                value={formData.quilometragem}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ano:</Form.Label>
              <Form.Control
                type="text"
                name="ano"
                value={formData.ano}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose} style={{margin:'10px'}}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Box>
  );
};

export default Vehicles;
