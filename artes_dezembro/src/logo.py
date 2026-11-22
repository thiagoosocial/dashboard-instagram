from PIL import Image
import numpy as np
im=np.array(Image.open('assets/logo_original.png').convert('RGB')).astype(float)
R,G,B=im[...,0],im[...,1],im[...,2]
orange=np.clip((R-B)/255,0,1)
isor=(R-B)>25
gray=np.where(isor,0,np.clip((255-G)/(255-118),0,1))
orange=np.where(isor,orange,0)
def hexrgb(h): h=h.lstrip('#'); return [int(h[i:i+2],16) for i in (0,2,4)]
def make(name,tooth,word):
    H,W=R.shape
    out=np.zeros((H,W,4),float)
    t=np.array(hexrgb(tooth)); w=np.array(hexrgb(word))
    a=np.clip(orange+gray,0,1)
    col=(orange[...,None]*t+gray[...,None]*w)/np.maximum(a[...,None],1e-6)
    out[...,:3]=col; out[...,3]=a*255
    img=Image.fromarray(out.astype('uint8'),'RGBA')
    img=img.crop(img.getbbox())
    img.save(f'assets/{name}.png'); print(name,img.size)
make('logo_laranja','#E4701C','#E4701C')
make('logo_marrom','#E4701C','#4A2B1B')
make('logo_branco','#FFFFFF','#FFFFFF')
make('logo_branco_laranja','#FF9A3C','#FFFFFF')
