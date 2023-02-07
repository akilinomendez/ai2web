// Pending to be tested and debugged when the function is ready

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import AdmZip from "adm-zip";
import { NextApiRequest, NextApiResponse } from "next";
import { Duplex, Stream } from 'stream';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
   
    const supabase = createServerSupabaseClient({ req, res });
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data, error } = await supabase.from('template').select('url').eq('type', 'astro').limit(1)



    if (error) {
      console.log(error)
      return res.status(500).json({ error: "Internal Sever Error" })
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Not Found" })
    }
    console.log(data[0].url)
    const url = data[0].url
    const arraybuffer = await fetch(url).then(res => res.arrayBuffer());
  
    const buffer = Buffer.from(arraybuffer);
    const zip = new AdmZip(buffer);
  
    const datafile = await supabase.from("promts").select();



    if (datafile.error) {
      console.log(datafile.error)
      return res.status(500).json({ error: "Internal Sever Error" })
    }
   const json = {
    "Hero": {
      "image": "../../public/assets/hero.png",
      "alt": datafile.data[0].title!,
      "text":  datafile.data[0].title!
    },
    "About": {
      "text": datafile.data[0].description!,
    },
    "Products":  datafile.data[0].products!,
    "globalc": {
      "main": {
        "font": datafile.data[0].font!,
        "tag": "main",
        "style": `color : ${datafile.data[0].fontColor!}; font-family: ${datafile.data[0].font!};`,
        "class":  datafile.data[0].gradient!
      }
    }
   }
   const iarr = datafile.data[0].image.split("/");
   const imagePath = iarr[2] + "/" + iarr[3];
    const image = await supabase.storage
        .from("images").download(imagePath); 
      
    if (image.error) {
      console.log(image.error)
      return res.status(500).json({ error: "Internal Sever Error" })
    }
    const  imageBuffer = Buffer.from(await image.data.arrayBuffer());
    
    zip.addFile("template-autodeploy-astro-1.0.0-alpha/src/data/data.json", Buffer.from(JSON.stringify(json)));
    zip.addFile("template-autodeploy-astro-1.0.0-alpha/public/assets/hero.png", Buffer.from(imageBuffer));
    const finishBuffer = zip.toBuffer();

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=astro.zip");
    res.setHeader("Content-Length", finishBuffer.length);

    const myReadableStream = bufferToStream(finishBuffer);
    myReadableStream.pipe(res);
    
  } catch (error) {
    console.log(error);
  }
}


function bufferToStream(buffer: any) {
  let tmp = new Duplex();
  tmp.push(buffer);
  tmp.push(null);
  return tmp;
}

async function stream2buffer(stream: Stream): Promise<Buffer> {

  return new Promise < Buffer > ((resolve, reject) => {
      
      const _buf = Array < any > ();

      stream.on("data", chunk => _buf.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(_buf)));
      stream.on("error", err => reject(`error converting stream - ${err}`));

  });
} 