import sharp from 'sharp';
import {copyFile} from 'node:fs/promises';
const dir='/Users/salaheddinemimouni/Downloads/';
const files=['10_20_04 AM','10_20_27 AM','10_21_18 AM','10_22_57 AM'].map(t=>dir+`ChatGPT Image Sep 27, 2026, ${t}.png`);
for(const f of files) console.log(f,await sharp(f).metadata());
await copyFile(files[3],'public/assets/logo-officiel.png');
async function crop(file,name,left,top,width,height){await sharp(files[file]).extract({left,top,width,height}).webp({quality:94}).toFile(`public/assets/${name}.webp`)}
await crop(1,'hero',610,108,1062,588);
for(const [i,x] of [79,335,591,846,1101,1356].entries()) await crop(2,`service-${i}`,x,199,240,142);
for(const [i,x] of [426,640,852,1066,1279].entries()) await crop(2,`destination-${i}`,x,580,198,209);
await crop(0,'trust',443,76,677,319);
for(const [i,x] of [88,413,752].entries()) await crop(0,`avatar-${i}`,x,1084,62,62);
await crop(0,'footer',677,1260,443,100);
