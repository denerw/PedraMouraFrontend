import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import { useEffect, useState } from "react";
import { useGetMaintenancesQuery } from "state/api";
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";


const Maintenances = () => {

  // useEffect(() => {
  //   console.log(localStorage.getItem('accessToken'));
  // }, [])

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
      field: "plate",
      headerName: "Placa",
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

  const createMaintenancePOST = async (formData) => {
    const newMaintenance = {
      date: formData.data,
      vehKm: parseInt(formData.quilometragem),
      mainType: formData.tipo,
      totalAmout: parseInt(formData.custo),
      plate: formData.placa,
    }

    // axios.post(`${baseURL}/api/vehicles`, { newVehicle }, config)
    await axios.post(`${process.env.REACT_APP_MAIN_API}/maintenance/register`, newMaintenance, config)
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
      })
      .catch((error) => {
        console.log('Erro na solicitação:', error);
        const { message } = error.response.data;
        alert(message);
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
      placa: row.plate,
      id: row.id
    });
    handleShow();
  }

  const editMaintenancePUT = (formData) => {

    const editVehicleData = {
      mainType: formData.tipo,
      id: formData.id
    };

    // axios.post(`${baseURL}/api/vehicles`, { newVehicle }, config)
    axios.put(`${process.env.REACT_APP_MAIN_API}/maintenance/update`, editVehicleData, config)
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
        console.log(editVehicleData)
      })
      .catch((error) => {
        console.log('Erro na solicitação:', error);
        alert('Error ao editar manutenção');
      });

  }


  const deleteButton = () => {
    axios.get(`${process.env.REACT_APP_MAIN_API}/maintenance/delete/${formData.id}`)
      .then((response) => {
        console.log('Resposta do servidor:', response.data);
        handleClose();
        refetch();
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
        alert('Error ao deletar manutenção');
      });

  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MANUTENÇÕES" subtitle="Lista completa de manutenções" />
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
              CRIAR MANUTENÇÃO
            </Button>
          ) : (
            <Button
              onClick={createButton} 
              color="inherit"
              style={{border: '1px solid black', float: 'right', backgroundColor: theme.palette.secondary[300]}}
            >
              CRIAR MANUTENÇÃO
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

      <Modal show={show} onHide={handleClose} style={modalStyles}>
        <Modal.Header style={{backgroundColor: theme.palette.primary.light}} closeButton>
            {!create 
              ? <Modal.Title><Header title="ATUALIZAÇÃO DE MANUTENÇÃO" subtitle="Atualize a manutenção desejada abaixo"/></Modal.Title> 
              : <Modal.Title><Header title="CADASTRO DE MANUTENÇÃO" subtitle="Cadastre a manutenção desejada abaixo"/></Modal.Title>
            }
        </Modal.Header >
        <Modal.Body style={{backgroundColor: theme.palette.primary.light}}>
          <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Data:</Form.Label>
              <Form.Control
                type="date"
                name="data"
                value={formData.data}
                disabled={!create}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group style={{marginTop: '10px'}}>
              <Form.Label>Quilometragem:</Form.Label>
              <Form.Control
                type="text"
                name="quilometragem"
                value={formData.quilometragem}
                disabled={!create}
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
                <option value="PREVENTIVA">Preventiva</option>
                <option value="CORRETIVA">Corretiva</option>
              </Form.Select>
            </Form.Group>
            <Form.Group style={{marginTop: '10px'}}>
              <Form.Label>Custo(R$):</Form.Label>
              <Form.Control
                type="number"
                step=".01"
                disabled={!create}
                name="custo"
                value={formData.custo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group style={{marginTop: '10px'}}>
              <Form.Label>Placa do veiculo:</Form.Label>
              <Form.Control
                type="text"
                disabled={!create}
                name="placa"
                value={formData.placa}
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

export default Maintenances;
