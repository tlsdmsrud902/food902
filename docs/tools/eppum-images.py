# 새 K-뷰티 사진(저장소 루트) → 스킨용 webp / 상품 jpg 만들기
#   python3 docs/tools/eppum-images.py          (저장소 루트에서 실행, Pillow 필요)
import glob, os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'eppum902_s2_260925195134_d_skin1_E/skin1/SkinImg/beauty')
PRD = os.path.join(ROOT, 'cafe24-assets/products')

def src(key):  # 파일 이름 앞부분으로 원본 찾기
    return glob.glob(os.path.join(ROOT, key + '*'))[0]

S = {
    'lip': 'Applying_vibrant_lip_gloss', 'botanical': 'Botanical_skincare',
    'model': 'ChatGPT Image 2026년 9월 29일 오후 07_17_16', 'glow': 'ChatGPT Image 2026년 9월 29일 오후 07_20_51',
    'cream': 'Face_cream_in_glass_jar', 'mask': 'Face_mask_squeezed', 'powder': 'Face_powder_puff',
    'base': 'Frosted_glass_foundation', 'hair': 'Hairdryer_and_oil', 'palette': 'Luxury_eyeshadow_palette',
    'brush': 'Makeup_brushes_in_ceramic', 'mascara': 'Mascara_wand', 'nail': 'Nail_polish_bottles',
    'liner': 'Neon_eyeliner_pencils', 'red': 'Red_lipstick_with_smear', 'serum': 'Skincare_serum_bottle',
    'sun': 'Sunblock_bottle', 'oil': 'Woman_holding_facial_oil',
}
# Designer_perfume_bottle… · Beauty_store_shelf… 사진은 실제 브랜드 이름이 보여서 쓰지 않는다.

def crop(key, ratio, cx, cy, s=1.0):
    """ratio = 가로/세로, (cx, cy) = 중심 비율, s = 들어갈 수 있는 최대 크기 대비 비율"""
    im = Image.open(src(S[key])).convert('RGB')
    w, h = im.size
    cw, ch = (w, w / ratio) if w / h < ratio else (h * ratio, h)
    cw, ch = cw * s, ch * s
    x = min(max(0, w * cx - cw / 2), w - cw)
    y = min(max(0, h * cy - ch / 2), h - ch)
    return im.crop((round(x), round(y), round(x + cw), round(y + ch)))

def webp(name, img, size):
    img.resize(size, Image.LANCZOS).save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=80, method=6)

SCENES = {  # 가로 장면 1672×941 (16:9)
    'scene-glow': ('glow', .5, .5), 'scene-model': ('model', .5, .5), 'scene-botanical': ('botanical', .5, .5),
    'scene-palette': ('palette', .5, .5), 'scene-serum': ('serum', .5, .5), 'scene-cream': ('cream', .5, .5),
    'scene-mask': ('mask', .5, .5), 'scene-vanity': ('brush', .5, .5), 'scene-powder': ('powder', .64, .55, .78),
    'scene-base': ('base', .5, .5), 'scene-hair': ('hair', .5, .5), 'scene-nail': ('nail', .5, .5),
    'scene-sun': ('sun', .5, .5), 'scene-oil': ('oil', .5, .5), 'scene-lip': ('lip', .5, .5),
    'scene-mascara': ('mascara', .5, .5), 'scene-liner': ('liner', .5, .5),
}
SQUARES = {  # 정사각 1254
    'sq-serum': ('serum', .52, .6, .8), 'sq-cream': ('cream', .5, .55, .85), 'sq-mask': ('mask', .62, .5, 1),
    'sq-sun': ('sun', .5, .6, .9), 'sq-lip': ('lip', .45, .5, 1), 'sq-eye': ('palette', .55, .45, .95),
    'sq-base': ('base', .5, .6, .8), 'sq-nail': ('nail', .45, .6, .8), 'sq-powder': ('powder', .55, .6, 1),
    'sq-hair': ('hair', .5, .6, .9), 'sq-oil': ('oil', .45, .5, 1), 'sq-mascara': ('mascara', .72, .5, .9),
    'sq-brush': ('brush', .38, .6, .9), 'sq-red': ('red', .76, .5, 1), 'sq-botanical': ('botanical', .55, .55, .9),
    'sq-liner': ('liner', .5, .5, 1), 'sq-model': ('model', .62, .5, 1), 'sq-glow': ('glow', .45, .5, 1),
}
CARDS = {  # 세로 3:4 카드 1086×1448
    'card-skincare': ('model', .66, .5), 'card-makeup': ('lip', .45, .5),
}
PORTRAIT = {  # 세로 4:5 1122×1402
    'portrait-vanity': ('brush', .52, .5), 'portrait-glow': ('glow', .52, .5),
}
PRODUCTS = [  # 상품 이미지 800×800 (code, 사진, cx, cy, s)
    ('p01', 'botanical', .64, .55, .62), ('p02', 'serum', .58, .62, .55), ('p03', 'cream', .52, .58, .6),
    ('p04', 'mask', .58, .5, .9), ('p05', 'model', .46, .76, .45), ('p06', 'glow', .28, .72, .5),
    ('p07', 'oil', .47, .45, .6), ('p08', 'sun', .5, .5, .55), ('p09', 'botanical', .3, .6, .6),
    ('p10', 'botanical', .42, .52, .35), ('p11', 'base', .5, .58, .6), ('p12', 'palette', .56, .38, .7),
    ('p13', 'mascara', .72, .5, .75), ('p14', 'lip', .6, .7, .6), ('p15', 'red', .75, .5, .9),
    ('p16', 'powder', .5, .6, .7), ('p17', 'liner', .5, .5, .8), ('p18', 'brush', .35, .5, .7),
    ('p19', 'nail', .45, .75, .5), ('p20', 'nail', .7, .72, .5), ('p21', 'hair', .66, .5, .55),
    ('p22', 'hair', .45, .55, .6), ('p23', 'sun', .6, .65, .8), ('p24', 'cream', .5, .5, 1),
    ('p25', 'nail', .35, .7, .6), ('p26', 'brush', .4, .75, .5), ('p27', 'powder', .6, .55, .5),
    ('p28', 'serum', .8, .72, .45), ('p29', 'sun', .62, .7, .6), ('p30', 'palette', .5, .5, 1),
]

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True); os.makedirs(PRD, exist_ok=True)
    for n, (k, *c) in SCENES.items(): webp(n, crop(k, 16 / 9, *c), (1672, 941))
    for n, (k, cx, cy, s) in SQUARES.items(): webp(n, crop(k, 1, cx, cy, s), (1254, 1254))
    for n, (k, cx, cy) in CARDS.items(): webp(n, crop(k, 3 / 4, cx, cy), (1086, 1448))
    for n, (k, cx, cy) in PORTRAIT.items(): webp(n, crop(k, 4 / 5, cx, cy), (1122, 1402))
    for code, k, cx, cy, s in PRODUCTS:
        crop(k, 1, cx, cy, s).resize((800, 800), Image.LANCZOS).save(os.path.join(PRD, code + '.jpg'), quality=85)
    print('done')


# 글자 로고 (배경 투명) — python3 docs/tools/eppum-images.py logo
def text_logo(name, size, text, font_px, color, font='/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf'):
    from PIL import ImageDraw, ImageFont
    im = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    f = ImageFont.truetype(font, font_px)
    l, t, r, b = d.textbbox((0, 0), text, font=f)
    d.text(((size[0] - (r - l)) / 2 - l, (size[1] - (b - t)) / 2 - t), text, font=f, fill=color)
    im.save(os.path.join(OUT, name + '.webp'), 'WEBP', lossless=True)

if __name__ == '__main__':
    text_logo('logo-eppum', (560, 200), 'eppum', 150, (74, 52, 52, 255))
    text_logo('wordmark-eppum', (2146, 724), 'eppum', 600, (226, 150, 146, 255))
    print('logo done')
