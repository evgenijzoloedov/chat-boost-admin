
export type Actor = "USER" | "ASSISTANT"
export type Message = {
  utterance:string,
  actor:Actor,
  logged_at:Date,
  success:boolean
}

