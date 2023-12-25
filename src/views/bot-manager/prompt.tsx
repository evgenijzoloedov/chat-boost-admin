import React, {useRef, useState} from 'react';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {useAsync, useAsyncFn} from "react-use";
import {promptService} from "../../@core/api/promptService";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";



function PromptChange(){
  const [currentPrompt, setCurrentPrompt] = useState('')
  const initialPrompt = useRef('')
  const {loading} = useAsync(async ()=>{
    const prompt = await promptService.getPrompt().then(res=>res.data) || ''
    if (prompt){
      setCurrentPrompt(prompt.text)
      initialPrompt.current=prompt.text
    }
  },[])

  const [{loading:updateLoading},updateFn] = useAsyncFn((newPrompt:string)=>{

    return promptService.updatePrompt(newPrompt)
  })


  const onUpdatePromptClick= async ()=>{
    try {
      initialPrompt.current = currentPrompt
      await updateFn(currentPrompt)
    }
    catch (e){
      console.error(e)
    }

  }


  const onChangePrompt = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    setCurrentPrompt(e.target.value)
  }


  console.log("initial: ",initialPrompt.current)
  console.log("currentPrompt: ", currentPrompt)

  const isButtonDisabled = initialPrompt.current===currentPrompt || updateLoading
  console.log("isButtonDisabled: ",isButtonDisabled)

  if (loading){
    return (
      <Typography>
        Загрузка
      </Typography>
    )
  }



  return (<>
    <TextField
      fullWidth
      multiline
      minRows={3}
      label='Prompt'
      placeholder={'Введите prompt'}
      sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
      value={currentPrompt} onChange={onChangePrompt}/>

      <Button onClick={onUpdatePromptClick} disabled={isButtonDisabled}>

        Изменить

      </Button>
    </>
  )



}


export const Prompt = () => {








  return (

    <>
      <Box sx={{display:"flex", flexDirection:"column", gap:4, alignItems:"baseline"}}>
      <Typography variant={'h4'}>
        Изменение промпта
      </Typography>

      <PromptChange/>

      </Box>
    </>
  );
};

