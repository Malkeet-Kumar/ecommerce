const path = require('path')
const fs = require('fs')
function csvPreProcessor(filename){
    return new Promise(async(resolve, reject) => {
        try {
            const filepath = (path.resolve(path.join('public/importedCsv/')+filename))
            const rawData = await fs.readFileSync(filepath,{encoding:"utf-8"})
            await fs.unlinkSync(filepath) 
            const dataArray = rawData.split("\r\n");
            const nameValPair = dataArray.map(val=>{
                const row = val.split(",")
                return {
                    name: row[0],
                    category:row[1],
                    price: row[2],
                    description: row[3],
                    stock: row[4]
                }
            })
            resolve(nameValPair.slice(1,nameValPair.length-1));
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {csvPreProcessor}