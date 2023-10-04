import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetVehiclesQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

import Modal from 'react-modal';

const Vehicles = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetVehiclesQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  // const { isLoading } = useGetVehiclesQuery({
  //   page,
  //   pageSize,
  //   sort: JSON.stringify(sort),
  //   search,
  // });

  // const data = [
  //   { "_id": 1, "placa": "ABC-1234", "modelo": "Toyota Corolla", "tipo": "sedan", "quilometragem": 50000, "ano": 2018 },
  //   { "_id": 2, "placa": "DEF-5678", "modelo": "Honda Civic", "tipo": "sedan", "quilometragem": 60000, "ano": 2019 },
  //   { "_id": 3, "placa": "GHI-9012", "modelo": "Ford Focus", "tipo": "hatchback", "quilometragem": 45000, "ano": 2017 }];

  // const columns = [
  //   {
  //     field: "_id",
  //     headerName: "ID",
  //     flex: 1,
  //   },
  //   {
  //     field: "userId",
  //     headerName: "User ID",
  //     flex: 1,
  //   },
  //   {
  //     field: "createdAt",
  //     headerName: "CreatedAt",
  //     flex: 1,
  //   },
  //   {
  //     field: "products",
  //     headerName: "# of Products",
  //     flex: 0.5,
  //     sortable: false,
  //     renderCell: (params) => params.value.length,
  //   },
  //   {
  //     field: "cost",
  //     headerName: "Cost",
  //     flex: 1,
  //     renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  //   },
  // ];

  const modalStyles = {
    content: {
      backgroundColor: 'purple', // Define a cor de fundo da modal como roxa     
      width: '500px', // Define a largura da modal     
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

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const abrirModal = () => { setModalIsOpen(true); }
  const fecharModal = () => { setModalIsOpen(false); }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="VEÍCULOS" subtitle="Lista completa de veículos" />
      <Button onClick={abrirModal}>CRIAR VEÍCULO</Button>
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
        />

      </Box>

      <Modal isOpen={modalIsOpen} onRequestClose={fecharModal} style={modalStyles} // Aplica os estilos definidos acima à modal       
        contentLabel="Nova Modal de Veículo"   >
        <h2>Novo Veículo</h2>
        {/* <form onSubmit={handleSubmit}> */}
        <form>
          <div>
            <label htmlFor="placa">Placa:</label>
            <input type="text" id="placa" name="placa"
              value={formData.placa}/>
          </div>
          <div>
            <label htmlFor="modelo">Modelo:</label>
            <input
              type="text" id="modelo" name="modelo" value={formData.modelo}  required />
          </div>
          <div>
            <label htmlFor="tipo">Tipo:</label>
            <input type="text" id="tipo" name="tipo" value={formData.tipo}  required />
          </div>
          <div>
            <label htmlFor="quilometragem">Quilometragem:</label>
            <input type="text" id="quilometragem" name="quilometragem" value={formData.quilometragem}  required />
          </div>
          <div>
            <label htmlFor="ano">Ano:</label>
            <input type="text" id="ano" name="ano" value={formData.ano}  required />
          </div>
          <button type="submit">Salvar</button>
        </form>
        <button onClick={fecharModal}>Fechar Modal</button>
      </Modal>
    </Box>
  );
};

export default Vehicles;
