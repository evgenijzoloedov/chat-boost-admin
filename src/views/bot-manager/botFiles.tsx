import React, { ElementType, useState} from 'react';
import Typography from "@mui/material/Typography";
import {useAsync} from "react-use";
import {botDocuments} from "../../@core/api";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button, {ButtonProps} from "@mui/material/Button";
import {File} from "../../@core/types/files";
import Grid from '@mui/material/Grid'
import {styled} from "@mui/material/styles";
import {format} from "date-fns";
import {uuidv4} from "../../@core/utils/uuid";

function formatBytes(bytes:number, decimals = 2) {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}


const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))


type FileComponentProps = {
  file:File;
  onDelete:(id:string)=>void
}


function FileComponent({file,onDelete }:FileComponentProps){


  return <>
    <Grid container spacing={2} sx={{ flexGrow: 1,alignItems:'center', padding:2 }}>
      <Grid item sx={{ flexGrow: 1 }}>
      <Typography>
        {file.name}
      </Typography>
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
    <Typography>

      {formatBytes(file.size)}
    </Typography>
      </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
    <Typography>

      {format(file.date, 'yyyy-MM-dd')}
    </Typography>
        </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
    <Button onClick = {()=>onDelete(file.id)}>

      Delete
    </Button>
          </Grid>

    </Grid>

    </>
}



function Files (){


    const [files, setFiles] = useState<File[]>([])


  const {loading,value,error} = useAsync(async()=>{
    const {data} = await botDocuments.getDocuments()

    setFiles(data)

  })


  const onDelete =async (id:File['id'])=>{
    await botDocuments.deleteDocument(id);

    setFiles(prevState => prevState.filter(file=>file.id!==id))


  }


  const onChange = async (e: any) => {
    const { files } = e.target as HTMLInputElement

    if (files && files.length !== 0) {


      const loadedFile = e.target.files[0];




      const file:File = {
          id:uuidv4(),
        date:new Date(),
        name:loadedFile.name,
        size:loadedFile.size
      }


       await botDocuments.loadDocuments(file)

      setFiles(prevState => ([...prevState, file]))

    };


  }


  if (loading){
    return <Typography>
      loading
    </Typography>
  }


  return (
    <>


      {!Boolean(files.length)?<Typography>Вы пока не загрузили файлы</Typography>:<Card sx = {{m:4}}>

        {files.map((file)=>{
          return <FileComponent key={file.id} file={file} onDelete={onDelete} />
        })}

      </Card>




      }



      <Box>
        <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
          Загрузить документ
          <input
            hidden
            type='file'
            onChange={onChange}
            accept='application/pdf'
            id='account-settings-upload-image'
          />
        </ButtonStyled>
      </Box>
    </>

  )


}

export const BotFiles = () => {
  return (
      <>
      <Typography sx={{mb:4}} variant={'h4'}>
        Тут загружаются файлы на основе которых модель будет делать предложения
      </Typography>

      <Files/>
      </>
  );
};

