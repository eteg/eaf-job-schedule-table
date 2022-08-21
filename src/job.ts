import { getTickets } from "./helpers";
import { updateSchedule, disconnect } from "./database"

const jobSchedule = async(): Promise<any>  =>{
    const tickets = await getTickets();
    
    await Promise.all(tickets.map(async(ticket: any) => {
        if (ticket.ticket_form_id == 6551837227412) return
        if (!ticket.external_id) return
        if (!ticket.external_id.includes('doc_cpf')) return
        const codFamiliar = ticket.custom_fields.filter((customField: any) => { 
            if (customField.id == 6914306681364) return customField.value
        })
        const codFamiliarValue = codFamiliar[0].value
        if (!codFamiliarValue) return
        const CPF = ticket.external_id.replace('doc_cpf_','')
        await updateSchedule({
            ticketId: String(ticket.id),
            codFam: String(codFamiliarValue),
            cpf: String(CPF)
        })
    }))
    await disconnect();
}

export{
    jobSchedule
}