import React from 'react';
import {Actor, Message} from "../../@core/types/message";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import {format} from "date-fns";
import InformationOutline from "mdi-material-ui/InformationOutline";


type ChatProps = {
  messages:Message[]
}


function getSender(actor:Actor):string{
  switch (actor){
    case "USER":
      return 'Пользователь';
    case "ASSISTANT":
      return "Бот";
    default:
      return ""
  }
}

function MessageComponent({message}:{message:Message}){

  const isUser = message.actor === "USER"



  return(
    <Box sx={{p:4, width:"100%",display:"flex",flexDirection:isUser?"row":"row-reverse"}}>
      <div style={{maxWidth:"75%"}}>
        <Typography variant={"h5"} sx={{textAlign:isUser?"left":"right",display:"flex", alignItems:'center', gap:4}}>
          {message.utterance} {message.success && <Tooltip title={'Успешное сообщение'}>
          <InformationOutline/>
        </Tooltip>}
        </Typography>
        <div style={{display:"flex",gap:"20px", textAlign:"center",justifyContent:isUser?"start":"end"}}>
          <Typography>
            {format(message['logged_at'], "dd MMMM yyyy HH:mm")}
          </Typography>
        <Typography>
          {getSender(message.actor)}
        </Typography>
        </div>
      </div>
    </Box>
  )
}

export const Chat = ({messages}:ChatProps) => {

  if (!messages){
    return <></>
  }

return (
    <Card>

      {
        messages.map(message=><MessageComponent key={message.utterance} message={message}/>)
      }



    </Card>
  );
};


