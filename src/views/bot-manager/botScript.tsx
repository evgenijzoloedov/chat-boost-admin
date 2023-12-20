import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useAsyncFn} from "react-use";


export const BotScript = () => {


  const [{loading, value}, loadingScriptFn] = useAsyncFn(async ()=>{
    return new Promise(resolve=>{
      setTimeout(()=>{
          resolve(`<script src="http://localhost:3001/script-ebe0a30b-f4f3-4a18-b810-5a271252dbf7.js"></script>`)
      },1500)
    })
  })


  const [copied, setCopied] = useState(false)
  const [script , setScript] = useState('')



  useEffect(()=>{
    if (copied){
      setTimeout(()=>{
        setCopied(false)
      },5000)
    }
  },[copied])
const onCopy = async ()=> {

    try {
      if (typeof value === "string") {
        await navigator.clipboard.writeText(script);
      }

      setCopied(true)
    }
    catch (e){
      console.error(e)
    }




}

  const generateScript = ()=>{
    loadingScriptFn().then((res:any)=>setScript(res))
  }


  return (
    <div>
      <Typography variant='h4'>
        Скрипт для установки бота на сайт
      </Typography>
      {loading && <Typography variant={'h5'}>Loading</Typography>}

      {!Boolean(script) ?  <Button onClick={generateScript}>Создать скрипт</Button>:<Card sx={{display:"flex",justifyContent:"space-between", alignItems:"center", mt:4}} >
      <pre>
        {script}
      </pre>


        <Button onClick={onCopy} disabled={copied}>
          Скопировать
        </Button>
      </Card> }







    </div>
  );
};

