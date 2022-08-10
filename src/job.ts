import { getTickets, getUserFields } from "./helpers";
// import {updateSchedule} from "./database"

const jobSchedule = async(): Promise<any>  =>{
    const usersTickets:any[] = [];
    const tickets = await getTickets();
     
    tickets.map((t:any)=>{
         usersTickets.push({ticketId:t.id, userId:t.requester_id})
     })

    const users = await getUserFields()

    const saveListBd:any[] = []
    
    usersTickets.map(async (t)=> {

      await users.map((u:any ) =>{ 

        if (u.id == t.userId){

         saveListBd.push({
            ticketId:String(t.ticketId),
            userId:t.userId,
            codFam:String(u.user_fields.codigo_da_familia),
            cpf:String(u.user_fields.cpf)
        })
       }

    })

    })
    for(const obj of saveListBd){
        console.log('Atualizando: '+ obj.ticketId)
        // await updateSchedule(obj)
    }

  
    
    // const testeBd =  {
    //     ticketId: String(99999),
    //     userId: 7939724404633,
    //     codFam: String('99999999999'),
    //     cpf: String('12345678901')
    //   }
}

export{
    jobSchedule
}