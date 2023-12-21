const fs = require('fs');
import config from "../../config";
import path from "path";
import * as prettier from "prettier";

interface Translation {
    l: string;
    v: string;
  }
  
  interface CustomerOverride {
    customer: string;
    tr: Translation[];
  }

interface Message {
    code: string;
    tr: Translation[];
    overrides?: CustomerOverride[];
  }

//checked single file
const checkFile = async (inputPath: string,from: string,to: string)=>{

    const fileContent = require(inputPath)
    let addValue = ""
    let existLang = false;

    const newContent = fileContent.messages.map((messages:Message)=>{
        messages.tr.forEach((value:Translation)=>{
            if(value.l === from){
                addValue = value.v
            }
            if(value.l === to){
                existLang = true
            }
        })

        if(!existLang){
        messages.tr.push({l: to,v: addValue})
        }
        
        if(messages.overrides){
            messages.overrides.forEach((i:CustomerOverride, index)=>{
            let addOverrideValue = ""
            let existOverridesLang = false;
            i.tr.forEach((value:Translation)=>{
                if(value.l === from){
                    addOverrideValue = value.v
                }
                if(value.l === to){
                    existOverridesLang = true
                }
            })
            if(!existOverridesLang){
                messages.overrides![index].tr.push({l: to,v: addOverrideValue})
                }
            })
        }

        return messages
    })

    const writeContent = "exports.messages = "+JSON.stringify(newContent)
    const prettierContent = await prettier.format(writeContent,{parser: "babel"})
    fs.writeFileSync(inputPath, prettierContent, "utf-8")

}


const langCopy = () =>{
    const from = process.env.npm_config_from;
    const to = process.env.npm_config_to;
    const inputPath = path.join(process.cwd(), config.get("i18nMsg").input);
    const isDir = fs.lstatSync(inputPath).isDirectory()

    if(from && to){
    if(isDir){
        fs.readdirSync(inputPath).map(async (fileName: any) => 
        {
            const filePath = path.join(inputPath, fileName);
            checkFile(filePath, from, to)
            
          });
          console.log("Successfully copied")
    }else{

    checkFile(inputPath, from, to)
    console.log("Successfully copied")

    }
}else{
    console.log("Missing params from and to")
}

}



//Main
langCopy();