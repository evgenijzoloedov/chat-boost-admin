import merge from 'lodash/merge';
import { useState } from 'react';

import { Card, CardHeader, Box, TextField, CardProps } from '@mui/material';
import ReactApexChart, {BaseOptionChart} from "../../@core/utils/baseOptionChart";


// components


// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chartLabels: string[];
  chartData: {
    year: string;
    data: {
      name: string;
      data: number[];
    }[];
  }[];
}

export default function AppAreaInstalled({
                                           title,
                                           subheader,
                                           chartLabels,
                                           chartData,
                                           ...other
                                         }: Props) {
  const [seriesData, setSeriesData] = useState(chartData[0].year);

  const handleChangeSeriesData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesData(event.target.value);
  };

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': {
                pl: 1,
                py: 0.5,
                pr: '24px !important',
                typography: 'subtitle2',
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: 0.75,
                bgcolor: 'background.neutral',
              },
              '& .MuiNativeSelect-icon': {
                top: 4,
                right: 0,
                width: 20,
                height: 20,
              },
            }}
          >
            {chartData.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </TextField>
        }
      />

      {chartData.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="line" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
