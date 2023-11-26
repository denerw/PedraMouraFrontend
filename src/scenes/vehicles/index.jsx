import { FormatListNumbered } from "@mui/icons-material";
import { Box, Button, InputLabel, MenuItem, Select, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Header from "components/Header";
import { useState } from "react";
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useGetVehiclesQuery } from "state/api";

const Vehicles = () => {


  const { data, isLoading, refetch } = useGetVehiclesQuery();
  const [create, setCreate] = useState(true);
  const [formData, setFormData] = useState({ placa: '', modelo: '', tipo: '', quilometragem: '', ano: '', id: '' });
  const [formValidated, setFormValidated] = useState(false);
  const [show, setShow] = useState(false);
  const theme = useTheme();

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

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
    } else {

      if (validateInvalidFields()) {
        return;
      }

      create ? createVehiclePOST(formData) : editVehiclePUT(formData);

      handleClose();
      refetch();
    }

    setFormValidated(true);
  }

  function validateInvalidFields() {
    if (create) {
      const placa = formData.placa.replace('-', '');
      const regex = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';
      if (!placa.match(regex)) {
        alert('Placa inválida!\nRevise a informação');
        return true;
      }
      if (!formData.tipo || formData.tipo == "") {
        alert('Tipo inválido!\nRevise a informação');
        return true;
      }
    }
    return false;
  }

  const createButton = () => {
    setCreate(true);
    handleShow();
  }

  const createVehiclePOST = (formData) => {

    const newVehicle = {
      plate: formData.placa.replace('-', ''),
      model: formData.modelo,
      vehType: formData.tipo,
      space: '0',
      currentKM: parseInt(formData.quilometragem),
      year: parseInt(formData.ano),
      isArchived: false,
    }

    // axios.post(`${baseURL}/api/vehicles`, { newVehicle }, config)
    axios.post(`${process.env.REACT_APP_MAIN_API}/vehicles`, newVehicle, config)
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
      })
      .catch((error) => {
        console.log('Erro na solicitação:', error);
        alert('Erro ao cadastrar veiculo!');
      });

  }

  const editButton = (row) => {
    setCreate(false);
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
    axios.put(`${process.env.REACT_APP_MAIN_API}/vehicles/update-vehicle`, editVehicleData, config)
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
        console.log(editVehicleData);
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
        alert('Error ao editar veiculo');
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
    // axios.post(`${baseURL}/api/vehicles`, { newVehicle }, config)
    axios.put(`${process.env.REACT_APP_MAIN_API}/vehicles/`, deleteVehicleData, config)
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
        alert('Error ao excluir veículo');
      });

      handleClose();
      refetch();
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="VEÍCULOS" subtitle="Lista completa de veículos" />
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
        <div style={{width: '100%', height: '48px'}}>
        {theme.palette.mode === "dark" ? (
          <Button
            onClick={createButton} 
            color="inherit"
            style={{border: '1px solid black', float: 'right', backgroundColor: theme.palette.primary.dark}}
          >
            CRIAR VEÍCULO
          </Button>
        ) : (
          <Button
            onClick={createButton} 
            color="inherit"
            style={{border: '1px solid black', float: 'right', backgroundColor: theme.palette.secondary[300]}}
          >
            CRIAR VEÍCULO
          </Button>
        )}
        </div>
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={data || []}
          columns={columns}
          onRowClick={(row) => editButton(row.row)}
        />

      </Box>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header style={{backgroundColor: theme.palette.primary.light}} closeButton>
            {!create 
              ? <Modal.Title><Header title="ATUALIZAÇÃO DE VEÍCULO" subtitle="Atualize o veículo desejado abaixo"/></Modal.Title> 
              : <Modal.Title><Header title="CADASTRO DE VEÍCULO" subtitle="Cadastre o veículo desejado abaixo"/></Modal.Title>
            }
        </Modal.Header >
        <Modal.Body style={{backgroundColor: theme.palette.primary.light}}>
          <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
            <Form.Group  >
              <Form.Label>Placa:</Form.Label>
              <Form.Control
                type="text"
                name="placa"
                value={formData.placa}
                onChange={handleInputChange}
                disabled={!create}
                required
              />
            </Form.Group>
            <Form.Group style={{marginTop: '10px'}}>
              <Form.Label>Modelo:</Form.Label>
              <Form.Control
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group style={{marginTop: '10px'}}>
              <Form.Label>Tipo:</Form.Label>
              <Form.Select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                required
              >
                <option value=''>Selecione um tipo</option>
                <option value="Hatch">Hatch</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
              </Form.Select>
            </Form.Group>
            <Form.Group style={{marginTop: '5px'}}>
              <Form.Label>Ano:</Form.Label>
              <Form.Control
                type="number"
                name="ano"
                value={formData.ano}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group style={{marginTop: '10px'}}>
              <Form.Label>Quilometragem:</Form.Label>
              <Form.Control
                type="number"
                name="quilometragem"
                value={formData.quilometragem}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            {theme.palette.mode === "dark" ? (
              <div style={{width: '100%', height: '60px', paddingTop: '9px'}}>
                  <Button variant="secondary" onClick={handleClose} style={{ margin: '10px', border: '1px solid black', backgroundColor: theme.palette.primary.dark }}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="primary" style={{border: '1px solid black', float: 'right', margin: '10px', backgroundColor: theme.palette.primary.dark}} >
                  Salvar
                </Button>
                {!create ?
                  <Button  variant="danger" onClick={deleteButton} style={{ margin: '10px', border: '1px solid black', float: 'right', backgroundColor: theme.palette.primary.dark}}>
                    Excluir
                  </Button> : (<div></div>)
                }
              </div>
            ) : (
              <div style={{width: '100%', height: '60px', paddingTop: '9px'}}>
                  <Button variant="secondary" onClick={handleClose} style={{ margin: '10px', border: '1px solid black', backgroundColor: theme.palette.secondary[300] }}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="primary" style={{border: '1px solid black', float: 'right', margin: '10px', backgroundColor: theme.palette.secondary[300]}} >
                  Salvar
                </Button>
                {!create ?
                  <Button  variant="danger" onClick={deleteButton} style={{ margin: '10px', border: '1px solid black', float: 'right', backgroundColor: theme.palette.secondary[300] }}>
                    Excluir
                  </Button> : (<div></div>)
                }
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </Box>
  );
};

export default Vehicles;
