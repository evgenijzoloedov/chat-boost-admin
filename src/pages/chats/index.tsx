import React from 'react';
import {useAsync} from "react-use";
import {dialogsService} from "../../@core/api/dialogs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Link from 'next/link'
import {AsyncState} from "react-use/lib/useAsyncFn";

const Chats = () => {


  const chats:AsyncState<string[]> = useAsync(()=>{
    return dialogsService.getAllDialogs().then(res=>res.data)
  })
  const list = chats.value!

  if (chats.loading){
    return <Box>
      <Typography>

        Loading

      </Typography>
    </Box>
  }

  return (
    <Card>
      {
        list.map((id, index)=>{
          return(
              <Link href={`chats/${id}`} key={id}  >
                <a style={{textDecoration:"none"}}>
                  <Typography  sx={{p:2}}>
                  Диалог {index+1}
                  </Typography>

                  </a>
              </Link>

          )
          })
      }
    </Card>
  );
};

export default Chats;
