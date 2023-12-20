import React from 'react';
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useAsync} from "react-use";
import {dialogsService} from "../../@core/api/dialogs";
import Card from "@mui/material/Card";
import {Chat} from "../../views/chat/chat";
import Button from "@mui/material/Button";

const SpecialChat = () => {

  const router = useRouter();
  const id = router.query["id"] as string;

  const chat = useAsync(async ()=>{
    if (id){

      const result = await  dialogsService.getDialogById(id)

      return result.data
    }
  },[id])


  if (chat.loading){
    return <Box>
      <Typography>

        Loading

      </Typography>
    </Box>
  }


  return (
    <Card sx={{display:"flex", flexDirection:"column", gap:4}}>
      <Box sx={{display:"flex", gap:4,alignItems:"center", justifyContent:"space-between"}}>
      <Typography sx={{p:2}} variant={"h4"}>
        История чата
      </Typography>
      <Button onClick={()=>router.push('/chats')}>
        Вернуться к диалогам


      </Button>
      </Box>

      <Chat messages={chat.value!}/>


    </Card>
  );
};

export default SpecialChat;
