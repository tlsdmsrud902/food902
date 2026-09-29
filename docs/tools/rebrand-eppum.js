// PETPIA(펫) → eppum(K-뷰티) 일괄 치환. 저장소 루트에서 node docs/tools/rebrand-eppum.js
const fs = require('fs');
const { execSync } = require('child_process');
const SKIP = /(^manual|^manual-cms|^cafe24-assets\/sample|\/\.recovery\/|index_before_cleanup_|^docs\/|swiper-bundle\.min\.js)/;
const files = execSync('git -c core.quotepath=off ls-files', { encoding: 'utf8' }).split('\n').filter(Boolean)
  .filter(f => /\.(html|css|js|json|txt|xml|svg)$/i.test(f) && !SKIP.test(f) && fs.existsSync(f));

const img = { // 옛 이미지 → 새 이미지
  'hero-petpia-start': 'scene-glow', 'hero-petpia-web': 'scene-glow', 'hero-petpia': 'scene-glow',
  'hero-editorial-v2': 'scene-glow', 'banner-picnic': 'scene-botanical', 'hero-home': 'scene-palette',
  'story-outdoor': 'scene-serum', 'guide-play': 'scene-mask', 'guide-walk': 'scene-sun', 'guide-rest': 'scene-cream',
  'starter-home': 'portrait-vanity', 'coupon-dog': 'card-skincare', 'coupon-cat': 'card-makeup',
  'coupon-gifts': 'sq-powder', 'product-bed': 'sq-cream', 'product-toy': 'sq-lip', 'product-bowl': 'sq-mask',
  'product-walk-kit': 'sq-sun', 'products-flatlay': 'sq-serum', 'event-birthday': 'scene-oil',
  'sale-hero': 'scene-nail', 'shop-hero': 'scene-vanity', 'category-walk': 'scene-sun', 'category-cat': 'scene-palette',
  'submenu-dog': 'scene-cream', 'submenu-cat': 'scene-palette', 'submenu-walk': 'scene-hair',
  'submenu-review-puppy': 'scene-lip', 'submenu-review': 'scene-lip', 'community-home': 'scene-model',
  'logo-petpia': 'logo-eppum', 'wordmark-petpia': 'wordmark-eppum'
};
const names = Object.keys(img).sort((a, b) => b.length - a.length).join('|');
const SKIN = 'eppum902_s2_260925195134_d_skin1_E/skin1';

const rules = [
  [/https:\/\/cdn\.jsdelivr\.net\/gh\/tlsdmsrud902\/pet@[0-9a-f]+\/adia902222_s2_260925195134_d_skin1_E\/skin1\//g, 'https://cdn.jsdelivr.net/gh/tlsdmsrud902/k_eppum@main/' + SKIN + '/'],
  [/https:\/\/ecimg\.cafe24img\.com\/pg[0-9a-f]+\/petpia902\/pet\//g, '/SkinImg/beauty/'],
  [new RegExp('(?<![a-z-])(' + names + ')\\.(png|webp|mp4)', 'g'), (m, n) => img[n] + '.webp'],
  [new RegExp("(['\"])(" + names + ")\\1", 'g'), (m, q, n) => q + img[n] + q],
  [/SkinImg\/pet\//g, 'SkinImg/beauty/'],
  [/adia902222_s2_260925195134_d_skin1_E/g, 'eppum902_s2_260925195134_d_skin1_E'],
  [/petpia902|adia902222|adia90222/g, 'eppum902'],
  [/tlsdmsrud902\/pet(?![a-z])/g, 'tlsdmsrud902/k_eppum'],
  [/PETPIA_/g, 'EPPUM_'], [/PETPIA/g, 'eppum'], [/Petpia/g, 'Eppum'], [/petpia/g, 'eppum'], [/펫피아/g, 'eppum'],
  [/petedit/g, 'beautyedit'], [/PET EDIT/g, 'BEAUTY EDIT'],
  [/(?<![A-Za-z])pets(?![a-z])/g, 'routines'], [/(?<![A-Za-z])pet(?![a-z])/g, 'beauty'],
  [/(?<=[a-z])Pet(?![a-z])/g, 'Beauty'], [/(?<![A-Za-z])Pets(?![a-z])/g, 'Routines'], [/(?<![A-Za-z])Pet(?![a-z])/g, 'Beauty'],
  [/(?<![A-Za-z])PETS(?![A-Za-z])/g, 'ROUTINES'], [/(?<![A-Za-z])PET(?![A-Za-z])/g, 'BEAUTY']
];

let changed = 0;
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  let out = src;
  for (const [re, to] of rules) out = out.replace(re, to);
  if (out !== src) { fs.writeFileSync(f, out); changed++; }
}
console.log(changed, 'files changed');
