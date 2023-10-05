import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetVehiclesQuery } from "state/api";
import Header from "components/Header";
import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";


const Vehicles = () => {
  const theme = useTheme();

  const { data, isLoading, refetch } = useGetVehiclesQuery();

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const modalStyles = {
    content: {
      backgroundColor: theme.palette.background.alt, // Define a cor de fundo da modal como roxa     
      margin: 'auto', // Centraliza a modal horizontalmente     
      borderRadius: '10px', // Adiciona cantos arredondados    
      padding: '20px', // Adiciona espaço interno   
    }
  };

  const [formData, setFormData] = useState({ placa: '', modelo: '', tipo: '', quilometragem: '', ano: '', id: '' });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "plate",
      headerName: "Placa",
      flex: 1,
    },
    {
      field: "model",
      headerName: "Modelo",
      flex: 1,
    },
    {
      field: "vehType",
      headerName: "Tipo",
      flex: 1,
    },
    {
      field: "currentKM",
      headerName: "Quilometragem",
      flex: 1,
    },
    {
      field: "year",
      headerName: "Ano",
      flex: 1,
    },
  ];

  const [formValidated, setFormValidated] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setFormData(
      { placa: '', modelo: '', tipo: '', quilometragem: '', ano: '', id: '' }
    );
    setShow(false);
  }
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
    else {

      create ? createVehiclePOST(formData) : editVehiclePUT(formData);

      handleClose();
      refetch();
    }

    setFormValidated(true);
  }

  const createButton = () => {
    setCreate(true);
    handleShow();
  }

  const createVehiclePOST = (formData) => {
    const newVehicle = {
      plate: formData.placa,
      model: formData.modelo,
      vehType: formData.tipo,
      space: '0',
      currentKM: parseInt(formData.quilometragem),
      year: parseInt(formData.ano),
      isArchived: false,

    }

    // axios.post(`${baseURL}/api/vehicles`, { newVehicle }, config)
    axios.post('http://localhost:3333/api/vehicles', newVehicle, config)
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
      });

  }

  const [create, setCreate] = useState(true);

  const editButton = (row) => {
    setCreate(false)
    setFormData({
      ano: row.year,
      id: row.id,
      modelo: row.model,
      placa: row.plate,
      quilometragem: row.currentKM,
      tipo: row.vehType
    });

    handleShow();
  }

  const editVehiclePUT = (formData) => {

    const editVehicleData = {
      year: parseInt(formData.ano),
      vehicleId: formData.id,
      model: formData.modelo,
      plate: formData.placa,
      newKm: parseInt(formData.quilometragem),
      vehType: formData.tipo
    };

    // axios.post(`${baseURL}/api/vehicles`, { newVehicle }, config)
    axios.put('http://localhost:3333/api/vehicles/update-vehicle', editVehicleData, config)
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
        console.log(editVehicleData)
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
      });

  }


  const deleteButton = () => {
    const deleteVehicleData = {
      id: formData.id,
      year: parseInt(formData.ano),
      vehicleId: formData.id,
      model: formData.modelo,
      plate: formData.placa,
      newKm: parseInt(formData.quilometragem),
      vehType: formData.tipo,
      isArchived: true,
    };
    console.log(formData)
    console.log(deleteVehicleData)
    // axios.post(`${baseURL}/api/vehicles`, { newVehicle }, config)
    axios.put('http://localhost:3333/api/vehicles/', deleteVehicleData, config)
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
      });

      handleClose();
      refetch();
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="VEÍCULOS" subtitle="Lista completa de veículos" />
      <Button onClick={createButton}>CRIAR VEÍCULO</Button>
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
          rows={data || []}
          columns={columns}
          onRowClick={(row) => editButton(row.row)}
        />

      </Box>

      <Modal show={show} onHide={handleClose} style={modalStyles}>
        <Modal.Header closeButton>
            {!create ?
              <Modal.Title>Atualizar Veiculo</Modal.Title> : <Modal.Title>Cadastro Veiculo</Modal.Title>
            }
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
            <Button variant="secondary" onClick={handleClose} style={{ margin: '10px' }}>
              Fechar
            </Button>
            <Button type="submit" variant="primary">
              Salvar
            </Button>
            {!create ?
              <Button  variant="danger" onClick={deleteButton} style={{ margin: '10px' }}>
                Excluir
              </Button> : (<div></div>)
            }
          </Form>
        </Modal.Body>
      </Modal>
    </Box>
  );
};

export default Vehicles;
