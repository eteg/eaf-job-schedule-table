import axios from 'axios';
import 'dotenv/config';

const config = {
    DOMAIN: process.env.ZENDESK_API_URL,
    AUTH: {
        username: `${process.env.ZENDESK_API_EMAIL}/token`,
        password: `${process.env.ZENDESK_API_TOKEN}`,
    }
}

const getTickets = async (): Promise<any> =>{

    const configRequest = {
        method: 'GET',
        url: `${config.DOMAIN}/tickets?page=210`,
        auth: config.AUTH,
    };

    try{
        const returnsTicket =[]
        let nextPage = '';
        const {data:RequestTickets} = await axios(configRequest)

        nextPage = RequestTickets.next_page
        
        returnsTicket.push(...RequestTickets.tickets)
        
        while(nextPage){
            configRequest.url = nextPage

            let page: any = nextPage.split('?page=')
            page = page[1]
            console.log(`Loaded page: ${page}`)
 
            const {data:tickets} = await axios(configRequest)
 
            nextPage = tickets.next_page
            returnsTicket.push(...tickets.tickets)
            if (page == 220) break
        }
        return returnsTicket;

    } catch(e:any){
        console.log(e)
    }
      
}

const getUserFields = async (): Promise<any> =>{

    const configRequest = {
        method: 'GET',
        url: `${config.DOMAIN}/users`,
        auth: config.AUTH,
    };
    
    try{
        const returnsUsers =[]
        let nextPage = '';
        const {data:requestUsers} = await axios(configRequest)

        nextPage = requestUsers.next_page
        
        returnsUsers.push(...requestUsers.users)

         while(nextPage){
             configRequest.url = nextPage
      
             const {data:users} = await axios(configRequest)
      
             nextPage = users.next_page
                  
             returnsUsers.push(...users.users)
         }
        return returnsUsers;

    }catch(e:any){

        console.log(e)
    }
      
}
export {
    getTickets,
    getUserFields
}