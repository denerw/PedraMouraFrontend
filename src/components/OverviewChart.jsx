import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetMaintenancesQuery } from "state/api"; //BACKEND REAL
// import { useGetMonthlyCostQuery } from "state/api"; //BACKEND MOCK


const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  
  const { data, isLoading } = useGetMaintenancesQuery(); //BACKEND REAL
  // const { data, isLoading } = useGetMonthlyCostQuery(); //BACKEND MOCK


  //BACKEND REAL
  const calcularSomatorioPorMes =  useMemo(() => {
    const somatorioPorMes = {
      "Jan": 0,
      "Fev": 0,
      "Mar": 0,
      "Abr": 0,
      "Mai": 0,
      "Jun": 0,
      "Jul": 0,
      "Ago": 0,
      "Sep": 0,
      "Out": 0,
      "Nov": 0,
      "Dez": 0,
    };
    
    
    if(!data) return 0

    data.forEach(item => {
      const data = new Date(item.date);
      // const mes = data.getMonth() + 1; // +1 porque os meses em JavaScript são baseados em zero (janeiro = 0, fevereiro = 1, etc.)
      const mes = data.getDate();  //getDate pega o dia, mas por causa do formato USA está pegando o mês
      const ano = data.getFullYear();

      // const chave = `${ano}-${mes}`;
      let chave;
      switch (mes) {
        case 1:
          chave = 'Jan'
          break;
        case 2:
          chave = 'Fev'
          break;
        case 3:
          chave =  'Mar'
          break;
        case 4:
          chave =  'Abr'
          break;
        case 5:
          chave =  'Mai'
          break;
        case 6:
          chave =  'Jun'
          break;
        case 7:
          chave = 'Jul'
          break;
        case 8:
          chave = 'Ago'
          break;
        case 9:
          chave = 'Set'
          break;
        case 10:
          chave = 'Out'
          break;
        case 11:
          chave = 'Nov'
          break;
        case 12:
          chave = 'Dez'
          break;
        default:
          break;
      }
  
      if (!somatorioPorMes[chave]) {
        somatorioPorMes[chave] = 0;
      }
  
      somatorioPorMes[chave] += item.totalAmout;
    });
  
    const resultado = [];
  
    for (const chave in somatorioPorMes) {
      if (somatorioPorMes.hasOwnProperty(chave)) {
        resultado.push({ x: chave, y: somatorioPorMes[chave] });
      }
    }
  
    console.log(somatorioPorMes)
    return JSON.parse(JSON.stringify(resultado));
  }, [data]);

  const dataToPlot = useMemo(() => {   
    const dados = [
      {
      id: 'series-1',
      data : calcularSomatorioPorMes,
      },
    ]
    return dados
  }, [data]);


  //BACKEND MOCK
  // const dataToPlot = useMemo(() => {   
  //   const dados = [
  //     {
  //     id: 'series-1',
  //     data : data,
  //     },
  //   ]
  //   return dados
  // }, [data]);

   if (!data || isLoading) return "Loading...";


  return (
    <ResponsiveLine
      loading={isLoading || !data}
      data={dataToPlot}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? "" : "Custo total de manutenção em reais (R$)",
          // : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;
