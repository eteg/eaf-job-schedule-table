import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



interface objSchedule {
    ticketId: string;
    codFam: string;
    cpf: string;
}

const updateSchedule = async (obj:objSchedule): Promise<void> =>{
   await prisma.schedule.updateMany({
        where:{
            ticketId: obj.ticketId
        },
        data:{
            cod_familiar: obj.codFam,
            cpf:obj.cpf
        }
    })
}

export{updateSchedule}
