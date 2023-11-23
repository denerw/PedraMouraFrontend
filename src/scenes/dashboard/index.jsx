import React, { useMemo } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  HandymanOutlined,
  AttachMoneyOutlined
} from "@mui/icons-material";
import {
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import OverviewChart from "components/OverviewChart";
import { useGetMaintenancesQuery } from "state/api";
import StatBox from "components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetMaintenancesQuery();


  const custoMensalMedio = useMemo(() => {   
    return (!data) ? 0 : ((data.reduce((accumulator, currentItem) => {
           return parseFloat(accumulator + currentItem.totalAmout) }, 0))/12).toFixed(2)
  }, [data]);

  const numeroManutencoes = useMemo(() => {   
    return (!data) ? 0 : Object.keys(data).length;
  }, [data]);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Bem-vindo ao Dashboard do controle de veículos" />

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
          loading={isLoading || !data}
          value={numeroManutencoes}
          increase="+14%"
          description="Ano Atual"
          icon={
            <HandymanOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Custo Mensal Médio"
          loading={isLoading || !data}
          value={custoMensalMedio}
          increase="+5%"
          description="Ano Atual"
          icon={
            <AttachMoneyOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        </Box>
        <Box
          gridColumn="span 10"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          
        <OverviewChart view="sales" isDashboard={false} />
        </Box>

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

        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
