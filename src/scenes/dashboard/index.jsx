import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
  HandymanOutlined,
  AttachMoneyOutlined
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();

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

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "plateNumber",
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
      field: "mileage",
      headerName: "Quilometragem",
      flex: 1,
    },
    {
      field: "modelYear",
      headerName: "Ano",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Bem-vindo ao Dashboard do controle de veículos" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 2"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="2rem"
          borderRadius="0.55rem"
        >
        <StatBox
          title="Manutenções Executadas"
          value = "50"
          // value={data && data.totalCustomers}
          increase="+14%"
          description="Mês atual"
          icon={
            <HandymanOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        {/* <StatBox
          title="Sales Today"
          value={data && data.todayStats.totalSales}
          increase="+21%"
          description="Since last month"
          icon={
            <AttachMoneyOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        /> */}
        <StatBox
          title="Custo Mensal"
          value = "R$7800,00"
          // value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description="Mês atual"
          icon={
            <AttachMoneyOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        </Box>
        <Box
          gridColumn="span 10"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        
        {/* <StatBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        /> */}

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
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
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
