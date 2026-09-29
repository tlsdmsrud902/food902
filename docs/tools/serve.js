// 로컬 미리보기 서버 : node docs/tools/serve.js  →  http://localhost:8765
// <!--@layout--> · <!--@import--> · <!--@css--> · <!--@js--> 를 풀어서 보여 주고,
// 상품 카드는 cafe24-assets/products/products.json 으로 채운다. (로그인 · 장바구니 · 게시판은 동작하지 않음)
const http = require('http'), fs = require('fs'), path = require('path'), url = require('url');
const REPO = path.resolve(__dirname, '..', '..');
const root = path.resolve(REPO, fs.readdirSync(REPO).find(d => /_s2_260925195134_d_skin1_E$/.test(d)), 'skin1');
const PRD = path.resolve(REPO, 'cafe24-assets/products');
const products = JSON.parse(fs.readFileSync(path.join(PRD, 'products.json'), 'utf8'));
let CTX = {};
const read = p => { try { return fs.readFileSync(path.join(root, p.replace(/^\//, '')), 'utf8'); } catch (e) { return ''; } };
const won = n => n.toLocaleString('ko-KR') + '원';
function cards() {
  let list = products;
  if (CTX.group) list = list.filter(p => p.group === CTX.group);
  else if (CTX.cate && CTX.cate !== '28') list = list.filter(p => p.cates.includes(+CTX.cate));
  if (CTX.keyword) list = list.filter(p => p.name.includes(CTX.keyword));
  return list.map(p => `<li class="xans-record-"><div class="thumbnail"><div class="prdImg"><a href="/product/detail.html?product_no=${p.product_no_temp}"><img src="/__prd/${p.img}" alt="${p.name}"></a></div></div>
<div class="description"><strong class="name"><a href="#"><span>${p.name}</span></a></strong><ul class="xans-product-listitem spec"><li><strong class="title displaynone">판매가</strong> <span>${won(p.price)}</span></li>${p.retail ? `<li><span style="text-decoration:line-through">${won(p.retail)}</span></li>` : ''}</ul></div></li>`).join('');
}
function expand(s, depth = 0) {
  if (depth > 12) return '';
  s = s.replace(/module="product_listmain_(\d)"([\s\S]*?)<!--@import\(\/product\/list_product\.html\)-->/g, (m, n, mid) => {
    const keep = CTX.group; CTX.group = ({ 1: 'rec', 2: 'new', 3: 'best' })[n];
    const out = 'module="product_listmain_' + n + '"' + mid + cards(); CTX.group = keep; return out;
  });
  return s.replace(/<!--@import\(([^)]+)\)-->/g, (_, p) => p === '/product/list_product.html' ? cards() : expand(read(p), depth + 1))
    .replace(/<!--@css\(([^)]+)\)-->/g, '<link rel="stylesheet" href="$1">')
    .replace(/<!--@js\(([^)]+)\)-->/g, '<script src="$1"></script>');
}
function page(p) {
  let body = read(p);
  const m = body.match(/<!--@layout\(([^)]+)\)-->/);
  body = expand(body.replace(/<!--@layout\([^)]*\)-->/, ''));
  if (!m) return body;
  let layout = read(m[1]);
  return expand(layout.replace(/<!--@contents-->/, () => body));
}
const TYPES = { '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' };
http.createServer((req, res) => {
  const u = url.parse(req.url, true);
  CTX = { cate: u.query.cate_no, keyword: u.query.keyword };
  let p = decodeURIComponent(u.pathname);
  if (p.startsWith('/__prd/')) {
    const f = path.resolve(PRD, p.slice(7));
    if (!f.startsWith(PRD)) { res.writeHead(403); return res.end(); }
    return fs.readFile(f, (e, d) => { res.writeHead(e ? 404 : 200, { 'Content-Type': 'image/jpeg' }); res.end(d); });
  }
  if (p.endsWith('/')) p += 'index.html';
  const f = path.resolve(root, p.replace(/^\//, ''));
  if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (p.endsWith('.html')) { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); return res.end(page(p)); }
  fs.readFile(f, (e, d) => { res.writeHead(e ? 404 : 200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' }); res.end(d); });
}).listen(8765, () => console.log('http://localhost:8765  (' + root + ')'));
