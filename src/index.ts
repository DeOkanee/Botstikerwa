import qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (msg) => {
  if (msg.body.toLowerCase() === 'buatkan stiker'){
    msg.reply("Baiklah silakan kirim gambar format JPG/PNG");
  }
});

client.on('message', async (msg) => {
  if ((msg.body.startsWith('#stiker') || msg.body.startsWith('.stiker')) && msg.type === 'image'){

    let media
    try {
      media = await msg.downloadMedia();
    } catch (error){
        console.error(error);
        return msg.reply('Proses Unduh Gambar Gagal!');
    }
   

    client.sendMessage(msg. from, media, {
      sendMediaAsSticker: true,
      stickerAuthor: 'By DEBOT',
      stickerName: 'saatnya anda dijadikan stiker'
    });
  }
});

client.initialize();
