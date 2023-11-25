import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useEffect, useState } from "react";
import { useGetMaintenancesQuery } from "state/api";
import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";


const Maintenances = () => {

  useEffect(() => {
    console.log(localStorage.getItem('accessToken'));
  }, [])

  const theme = useTheme();

  const { data, isLoading, refetch } = useGetMaintenancesQuery();

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

  const [formData, setFormData] = useState({ data: '', quilometragem: '', tipo: '', custo: '', veiculoid: '', id: '' });

  const columns = [
    {
      field: "id",
      headerName: "ID da Manutenção",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Data",
      flex: 1,
    },
    {
      field: "vehKm",
      headerName: "Quilometragem",
      flex: 1,
    },
    {
      field: "mainType",
      headerName: "Tipo",
      flex: 1,
    },
    {
      field: "totalAmout",
      headerName: "Custo(R$)",
      flex: 1,
    },
    {
      field: "vehicleId",
      headerName: "ID do veículo",
      flex: 1,
    },
  ];

  const [formValidated, setFormValidated] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setFormData(
      { data: '', quilometragem: '', tipo: '', custo: '', veiculoid: '', id: '' }
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

      create ? createMaintenancePOST(formData) : editMaintenancePUT(formData);

      handleClose();
      refetch();
    }

    setFormValidated(true);
  }

  const createButton = () => {
    setCreate(true);
    handleShow();
  }

  const createMaintenancePOST = (formData) => {
    const newMaintenance = {
      date: formData.data,
      vehKm: parseInt(formData.quilometragem),
      mainType: formData.tipo,
      totalAmout: parseInt(formData.custo),
      vehicleId: formData.veiculoid,
    }

    // axios.post(`${baseURL}/api/vehicles`, { newVehicle }, config)
    axios.post(`${process.env.REACT_APP_MAIN_API}/maintenance/register-maintenance`, newMaintenance, config)
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
      data: row.date,
      quilometragem: row.vehKm,
      tipo: row.mainType,
      custo: row.totalAmout,
      veiculoid: row.vehicleId,
    });
    console.log(formData)
    handleShow();
  }

  const editMaintenancePUT = (formData) => {

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
        console.log(editVehicleData)
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
      });

  }


  const deleteButton = (formData) => {
    const deleteMaintenanceData = {
      year: parseInt(formData.ano),
      vehicleId: formData.id,
      model: formData.modelo,
      plate: formData.placa,
      newKm: parseInt(formData.quilometragem),
      vehType: formData.tipo
    };

    // axios.post(`${baseURL}/api/vehicles`, { newVehicle }, config)
    axios.delete(`${process.env.REACT_APP_MAIN_API}/vehicles/delete`, deleteMaintenanceData, config)
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
        console.log(deleteMaintenanceData)
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
      });

  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MANUTENÇÕES" subtitle="Lista completa de manutenções" />
      <Button onClick={createButton}>CRIAR MANUTENÇÃO</Button>
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
            <Modal.Title>Atualizar Manutenção</Modal.Title> : <Modal.Title>Cadastro Manutenção</Modal.Title>
          }
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Data:</Form.Label>
              <Form.Control
                type="text"
                name="data"
                value={formData.data}
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
              <Form.Label>Custo(R$):</Form.Label>
              <Form.Control
                type="text"
                name="custo"
                value={formData.custo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>ID do veículo:</Form.Label>
              <Form.Control
                type="text"
                name="veiculoid"
                value={formData.veiculoid}
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
              <Button variant="danger" onClick={deleteButton} style={{ margin: '10px' }}>
                Excluir
              </Button> : (<div></div>)
            }
          </Form>
        </Modal.Body>
      </Modal>
    </Box>
  );
};

export default Maintenances;
