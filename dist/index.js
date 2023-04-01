"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const whatsapp_web_js_1 = require("whatsapp-web.js");
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth(),
});
client.on('qr', (qr) => {
    qrcode_terminal_1.default.generate(qr, { small: true });
});
client.on('ready', () => {
    console.log('Debots is ready!');
});
client.on('message', (msg) => {
    if (msg.body.toLowerCase() === 'buatkan stiker') {
        msg.reply("Baiklah silakan kirim gambar format JPG/PNG lalu isikan tag #stiker dan .stiker ");
    }
    if (msg.body.toLowerCase() === "bot stiker off?") {
        msg.reply("Saya akan OFF pada sesuai keingin pogram dijalankan")
    }
});
client.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if ((msg.body.startsWith('#stiker') || msg.body.startsWith('.stiker')) && msg.type === 'image') {
        let media;
        try {
            media = yield msg.downloadMedia();
        }
        catch (error) {
            console.error(error);
            return msg.reply('Proses Unduh Gambar Gagal!');
        }
        client.sendMessage(msg.from, media, {
            sendMediaAsSticker: true,
            stickerAuthor: 'By DEBOT',
            stickerName: 'saatnya anda dijadikan stiker'
        });
    }
}));
client.initialize();
