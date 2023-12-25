// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports


// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import {BotFiles} from "../../views/bot-manager/botFiles";
import {BotScript} from "../../views/bot-manager/botScript";
import withPageRequiredAuth from "../../@core/context/auth/with-page-required-auth";
import {ManageSteps} from "../../views/bot-manager/manageSteps";
import {Prompt} from "../../views/bot-manager/prompt";
import Poll from "mdi-material-ui/Poll";
import HelpCircleOutline from "mdi-material-ui/HelpCircleOutline";

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const TABS={
  files:'files',
  script:'script',
  scriptManager:'scriptManager',
  prompt:"prompt"
}

const BotSettings = () => {
  const [value, setValue] = useState<string>(TABS.files)

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value={TABS.files}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Информация о продукте</TabName>
              </Box>
            }
          />
          <Tab
            value={TABS.scriptManager}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Управление шагами продаж</TabName>
              </Box>
            }
          />
          <Tab
            value={TABS.script}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Вставляемый скрипт</TabName>
              </Box>
            }
          />
          <Tab
            value={TABS.prompt}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HelpCircleOutline />
                <TabName>Обновление промптов</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 4 }} value={TABS.files}>
          <BotFiles />
        </TabPanel>
        <TabPanel sx={{ p: 4 }} value={TABS.scriptManager}>
          <ManageSteps />
        </TabPanel>
        <TabPanel sx={{ p: 4 }} value={TABS.script}>
          <BotScript />
        </TabPanel>
        <TabPanel sx={{ p: 4 }} value={TABS.prompt}>
          <Prompt />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default withPageRequiredAuth(BotSettings)
