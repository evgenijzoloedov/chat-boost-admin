import React from 'react';
import {useAsync} from "react-use";
import {statisticsService} from "../../@core/api/statistics";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rates from "./Rate";
import {useTheme} from "@mui/material/styles";
import {AsyncState} from "react-use/lib/useAsyncFn";
import {DialogsRanking} from "../../@core/types/statistics";



function calculatePercent(a:number, b:number){
  return a/b *100
}

export const DialogsStatistics = () => {
  const theme:any = useTheme();


  const chart = theme.palette.chart
  const result:AsyncState<DialogsRanking> = useAsync(async ()=>{
    const result  = await statisticsService.getCreationStatistics()

    return result.data
  })

  const value = result.value as DialogsRanking



  if (result.loading){
    return <Box>
      <Typography>

        Loading

      </Typography>
    </Box>
  }


  if(result.error){
    return <>Error</>
  }

  const total = value['n_started_dialogues'] || 0
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

