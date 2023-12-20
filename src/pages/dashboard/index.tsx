import React from 'react';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {DialogsStatistics} from "../../views/bot-dashboard/DialogsStatistics";








function Base({text, title}) {
  return <Card >
    <CardContent>
      <Box sx={{ display: 'flex', flexDirection:"column",padding:5, alignItems: 'center', justifyContent: 'center' }} >
        <Typography variant="h3">

          {title}

        </Typography>

        <Typography variant={"h6"}>
          {text}
        </Typography>
      </Box>
    </CardContent>
  </Card>
}



function Engineer(){


  return <Card >
    <CardContent>
      <Box sx={{ display: 'flex', flexDirection:"column",padding:5, alignItems: 'center', justifyContent: 'center' }} >
        <Typography variant="h3">

          25,8%

        </Typography>

        <Typography variant={"h6"}>
        Переведено на менеджера
        </Typography>
      </Box>
    </CardContent>
  </Card>
}



const Dashboard = () => {






  return (
      <Grid container spacing={6}>
        <DialogsStatistics/>

      </Grid>
  );
};



export default Dashboard



// <AppAreaInstalled
// title="Количество обработанных обращений по дням"
// subheader="(+43%) в сравнении с прошлим годом"
// chartLabels={['1 Января', '14 Января', '1 Февраля', '14 Февраля', '1 Марта', '15 Марта', '1 Апреля', '15 Апреля', '1 Мая']}
// chartData={[
//     {
//       year: '2023',
//       data: [
//         { name: 'Продажи через бота', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
//         { name: 'Продажи через человека', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
//       ],
//     }
//     ]}
// />
