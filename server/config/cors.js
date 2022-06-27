const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'https://sentimo.surge.sh', 'http://sentimo.surge.sh'];

export const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1){ //found this origin in my whitelist
            callback(null, true);
        }else{
            callback(new Error()); //not found
        }
    },
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
};