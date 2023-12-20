import React from 'react';
import {useAsync} from "react-use";
import {statisticsService} from "../../@core/api/statistics";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rates from "./Rate";
import {useTheme} from "@mui/material/styles";



function calculatePercent(a, b){
  return a/b *100
}

export const DialogsStatistics = () => {
  const theme = useTheme();


  const chart = theme.palette.chart
  const {loading,value,error} = useAsync(async ()=>{
    const result  = await statisticsService.getCreationStatistics()

    return result.data
  })




  if (loading){
    return <Box>
      <Typography>

        Loading

      </Typography>
    </Box>
  }
  console.log("value: ",value)
  const total = value['n_started_dialogues']
  const failed = value['n_started_dialogues'] - value['n_succeeded_dialogues']
  const success =  value['n_succeeded_dialogues']



  const successPercent = calculatePercent(success,total)
  const failedPercent = calculatePercent(failed,total)



  return (

      <Rates
        title="Реакция пользвателей"
        total={total}
        chartData={[
          { label: 'Успешных диалогов', value: successPercent },
          { label: 'Неуспешных диалогов', value: failedPercent },
        ]}
        chartColors={[
          [chart.violet[0], chart.violet[2]],
          [chart.yellow[0], chart.yellow[2]],
        ]}

      />

  );
};

