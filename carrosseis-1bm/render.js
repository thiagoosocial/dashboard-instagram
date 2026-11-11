// node render.js cases|mercado  -> out/<nome>/NN.png (1080x1350) + PDF
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{
  const names=process.argv.slice(2).length?process.argv.slice(2):['cases','mercado'];
  const b=await chromium.launch();
  for(const name of names){
    const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:1});
    await p.goto('file://'+path.resolve(__dirname,'src',name+'.html'));
    await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(700);
    const dir=path.resolve(__dirname,'out',name);fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});
    const els=await p.$$('.slide');
    for(let i=0;i<els.length;i++){await els[i].screenshot({path:path.join(dir,String(i+1).padStart(2,'0')+'.png')});}
    console.log(name,els.length,'slides');await p.close();
  }
  await b.close();
})();
