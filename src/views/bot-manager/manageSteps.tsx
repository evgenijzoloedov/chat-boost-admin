import React, {ChangeEvent, useState} from 'react';
import Typography from "@mui/material/Typography";
import {useAsync, useAsyncFn} from "react-use";
import {Step} from "../../@core/types/step";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {stepsService} from "../../@core/api/steps";
import Button from "@mui/material/Button";


type Fileds = 'description' | 'sign'

type StepsProps = {
  onChangeStep:(id:Step['id'], fiels:Fileds, value:string)=>void ,
    steps:Step[],
    loading:boolean
}


type StepComponentProps = {
  step:Step,
  onChangeStep:(id:Step['id'], fiels:Fileds, value:string)=>void ,
}



function StepComponent({onChangeStep,step}:StepComponentProps){


  const onChange = (field:Fileds,e:ChangeEvent<HTMLInputElement>) => {
    onChangeStep(step.id,field, e.target.value)
  }


  return<>

  <Box sx={{p:4, display:"flex",flexDirection:"column",alignItems:'flex-start', gap:4}}>
    <Typography>{step.title}</Typography>
    <TextField
      fullWidth
      multiline
      minRows={3}
      label='Описание'
      placeholder='Bio...'
      sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
      value={step.description} onChange={(e)=>onChange('description', e)}/>

    <TextField
      value={step.sign}
      fullWidth
      multiline
      minRows={3}
      label='Признак'
      placeholder='Bio...'
      sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
      onChange={(e)=>onChange('sign', e)}
    />

  </Box>
  </>




}


function Steps({onChangeStep,steps,loading}:StepsProps){




  if (loading){
    return<>
      loading
    </>
  }




  return<>


    {steps.map(step=>{
      return <StepComponent key={step.id}step={step} onChangeStep={onChangeStep}/>
    })}

  </>



}

export const ManageSteps = () => {


    const [steps, setSteps] = useState<Step[]>([])


    const { loading: loadingList} = useAsync(async ()=>{
      const {data} = await stepsService.getSteps()
      setSteps(data)
    },[])

    // @ts-ignore
  const onChangeStep = (id, field, value) => {
      setSteps(prevState => {


        return prevState.map(step=>{
          if (step.id===id){
            return {
              ...step,
              [field]:value
            }
          }

          return step
        })
      })
    }


    const [{loading}, onSubmit] = useAsyncFn(async ()=>{
      await stepsService.updateSteps(steps)
    },[steps])






  return (
    <>
    <Typography variant={'h4'}>
      Управлением шагами продаж
    </Typography>


    <Steps onChangeStep={onChangeStep} steps={steps} loading={loadingList}/>



      <Button onClick={onSubmit} disabled={loading}>

        Изменить настройку шагов

      </Button>
    </>
  );
};

