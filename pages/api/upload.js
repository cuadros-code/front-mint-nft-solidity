const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('cb3ed7687cbcfc318f18', '85be1f16a5c41dc611d1803347414c6d7b2f97117373a2a285e0425f404d4b59');


export default async function handler(req, res) {

  if (req.method !== 'POST') return

  try {
    const result = await pinata.testAuthentication()

    if(!result) return

    const buffer = Buffer.from(req.body.replace(/^data:image\/png;base64,/, ""), 'base64');
    // const readableStreamForFile = fs.createReadStream(buffer)

    fs.writeFileSync(`./uploads.png`, buffer)

    const readableStreamForFile = fs.createReadStream('./uploads.png');
    
    const upload = await pinata.pinFileToIPFS( readableStreamForFile )

    res.status(200).json({ ok: upload })

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }


}

