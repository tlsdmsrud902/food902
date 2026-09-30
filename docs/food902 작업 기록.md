# food902 (식품) 리뉴얼 작업 기록 — 2026-09-30

`신규 스킨 작업.md` 절차(A. 내 PC 코드 1 ~ 8)에 따라 eppum(K-뷰티) 스킨을 식품 쇼핑몰 **food902** 로 바꾼 기록.
브랜드 이름은 **임시로 `food902`** 다. 정식 이름이 정해지면 화면 글자(`food902`)와 로고 이미지만 다시 바꾼다. (3장 참고)

| 항목 | 값 |
|---|---|
| 카페24 계정 (mall_id) | `food902` (`https://food902.cafe24.com`) |
| 스킨 폴더 | `food902_s2_260925195134_d_skin1_E/skin1` |
| 디자인 코드 · 번호 | `base` · `1` (`ez/ez-settings.json`) — 새 계정 기본값. 다르면 고친다 |
| 이미지 서버 번호 | **아직 모름** → 코드에는 `PG_NUMBER` 로 둠 (`ez/ez-product-display-setting.data.json`). `docs/pack.py` 가 복구 파일을 만들 때 넣어 준다 |
| 이미지 폴더 | `SkinImg/food/` (파일업로더 폴더도 `food` 로 만든다) |
| 코드 이름 | 클래스 `food-*`, 전역 변수 `FOOD902_*`, 페이지 `/food/guide.html`, 게시판 편집 이벤트 `food902:cms` |

## 1. 이름 · 경로 바꾸기
- `git mv` : `eppum902_…` → `food902_…`, `beauty/` → `food/`, `SkinImg/beauty/` → `SkinImg/food/`, `beauty-*.css/js` → `food-*`, `eppum-designcenter-*` → `food902-designcenter-*`
- 일괄 치환 : `node docs/tools/rebrand-food.js` (eppum902 → food902 먼저, `EPPUM_` → `FOOD902_`, eppum → food902, beauty → food, routines → meals, 옛 이미지 이름 → 새 이미지 이름, `pg3424…` → `PG_NUMBER`)
- 분류 키 : `skincare` → `fresh`, `makeup` → `meal`, `body` → `bakery` (HTML · CSS · JS · 가이드 앵커 `#bakery`)
- 메뉴 찾기 선택지 값 : `hydrate/glow/daily` → `morning/light/dinner`

## 2. 새 이미지 (`python3 docs/tools/food-images.py`, Pillow 필요)
저장소 루트의 ChatGPT 사진 36장으로 스킨 이미지 33개(`SkinImg/food/*.webp`)와 상품 이미지 `cafe24-assets/products/p01~p30.jpg` 를 만든다.
- 가로 장면 1672×941 `scene-*` 14개, 정사각 1254 `sq-*` 12개, 세로 카드 1086×1448 `card-*` 2개, 세로 1122×1402 `portrait-*` 2개
- 글자 로고 `logo-food902.webp`(560×200) · 하단 큰 글자 `wordmark-food902.webp`(2146×724), 배경 투명 (Liberation Serif Bold)
- 부분만 다시 만들기 : `python3 docs/tools/food-images.py skin|products|logo`
- **쓰지 않은 사진**
  - `02_08_52 ~ 02_09_04` (10장) : `02_57_*` 와 같은 상품의 넓은 배너판. 그중 `02_08_55` 는 **실제 파스타 브랜드(RUMMO) 포장**이 보임
  - `02_57_48` : 문구가 들어간 배너 시안 모음
  - `01_56_53`(선물 바구니)은 **와인 병**이 보여서 상품 `p30` 만 병이 빠지게 잘라 쓰고, 기획전 · 세일 사진은 `scene-giftbox`(올리브오일 선물세트)로 바꿨다

## 3. 분류 · 메뉴
| 번호 | 분류 | 목록 배너 키 |
|---|---|---|
| 28 | 전체 상품 | all |
| 24 | 신선식품 (채소 · 과일 · 주스 · 샐러드) | fresh |
| 25 | 간편식 (밀키트 · 브런치 · 아침) | meal |
| 26 | 베이커리/팬트리 (빵 · 케이크 · 치즈 · 오일 · 견과 · 선물세트) | bakery |
| 27 | SALE | (세일 전용 화면) |

고정 메뉴는 `layout/basic/header.html`, 목록 배너는 `food/submenu-hero.html`. `store-content.js` 의 `menu.editorial: true` 그대로.

## 4. 문구 · 화면에서 바뀐 것
- 메인(`index.html`) : 히어로 3장면(아침 식탁 · 제철 신선 · 간편한 한 끼), 식탁 고르기(신선식품 · 간편식), 카테고리 8개, 메뉴 찾기, 장보기 가이드(보관법 3단계), 장면 속 상품 4장면, 기획전(선물세트 · 세일), 장보기 체크리스트, 푸드 노트, FAQ(배송 · 알레르기 · 선물 · 상한 상품), 하단 브랜드, 이벤트 팝업
- `food/guide.html` : 가이드 4장 — 일주일 장보기 · 신선식품 보관 · 밀키트 요리 · 빵/팬트리 보관
- `store-content.js` : 세일 페이지 문구 · 타일 · 사진 설명, 저널, 리뷰 안내
- `product/list.html` : 세일 화면 기본 글자, 쿠폰 카드 사진(`card-fresh` · `card-meal` · `sq-bakery`), 카드 뒷면 로고 `FOOD 902`
- `layout.html` `<title>`, `header.html` 띠배너 · 메뉴, 디자인센터 상세페이지 3개 문구
- 색 : 로즈 · 누드 → 올리브 · 테라코타 (`--cz-accent:#a9542e`, 글자 `#2f3a28`, 배경 `#fbf8f1`) — `food-cozy-home.css` · `food-cozy-global.css`
- **기능은 그대로** : `data-cms*` 속성 개수가 원본(eppum)과 같다 (메인 · 세일 · 가이드 · 목록 배너 모두 확인), 3D 보기 · 영상 칸 · 쿠폰 뽑기 · 편집 모드 유지

## 5. 샘플 상품 · 리뷰
- `cafe24-assets/products/products.json` : 30개. `group` rec/new/best 각 10개, 24 · 25 · 26 각 10개, `cates` 에 27 이 있으면 SALE(정상가 `retail`, 10개)
- `product_no_temp` 는 **임시 번호**(p01 = 12 … p30 = 41). 메인 "장면 속 상품" `data-prd` 와 `#cz-looks-data` 도 이 번호다
  → 카페24 등록 후 실제 번호가 다르면 **한 번에 한 패스로** 바꾼다 (eppum 기록 14장 : 번호가 겹치므로 `sed` 로 차례로 바꾸면 안 됨)
- `cafe24-assets/reviews.json` : 상품마다 1개, 30개. 올릴 때 제목 앞에 **[연출 예시]** 를 붙인다. `no` 도 임시 번호

## 6. 로컬 미리보기
`node docs/tools/serve.js` → http://localhost:8765 (`/`, `/product/list.html?cate_no=24`, `?cate_no=27`, `/food/guide.html`)
확인 결과 : 4개 페이지 모두 깨진 이미지 0, 옛 단어(뷰티 · 스킨케어 · eppum …) 0. (jQuery 오류는 카페24 서버에서만 채워지는 스크립트라 정상)

## 7. 남은 일 (카페24 관리자 — PC 의 Claude 앱 세션에서)
1. 파일업로더에 `food` 폴더 만들고 `SkinImg/food/*.webp` 33개 + `designcenter/*.svg` 올리기 → **이미지 주소의 `pg…` 번호 확인**
2. 디자인 백업 → `python3 docs/pack.py <백업.tar.gz> <pg번호>` → 디자인 복구 (처음 한 번만)
3. 분류 이름 변경 : 24 신선식품 · 25 간편식 · 26 베이커리/팬트리 · 27 SALE · 28 전체 상품 (하위 분류는 미진열)
4. 상품 30개 등록 · 사진 **파일 업로드** · 메인 진열(2 추천 · 3 신상품 · 4 추가카테고리1)
5. 실제 상품번호로 `data-prd` · `#cz-looks-data` 교체
6. 리뷰 30개 [연출 예시] 등록, 게시판 2번(뉴스/이벤트) · 3번(FAQ) `is_using_board` · `use_board` 켜기
7. **세일 쿠폰** : `store-content.js` 의 `sale.coupon.coupons[].no` 4개는 **eppum902 쿠폰 번호** 그대로다. food902 에서 쿠폰 4종을 만들고 번호를 바꾼다.
   `remainUrl`(남은 수량 공용 카운터)도 eppum 과 **같은 주소**라 남은 수량이 섞인다 → 새 카운터 주소를 받거나 비운다
8. Easy 편집기 열리는지 확인, 카카오 채널 주소 넣기
9. 정식 브랜드 이름이 정해지면 : `git grep -l food902` 중 **화면 글자**만 바꾸고(계정 아이디 · 폴더 이름은 그대로), `food-images.py logo` 의 글자를 바꿔 로고 다시 만들기

## 8. 도구
| 도구 | 하는 일 |
|---|---|
| `docs/tools/rebrand-food.js` | eppum → food902 일괄 치환 (이미 실행함. 다음 프로젝트에서는 규칙만 바꿔 쓴다) |
| `docs/tools/food-images.py` | 새 사진 → 스킨 webp · 상품 jpg · 글자 로고 |
| `docs/tools/serve.js` | 로컬 미리보기 |
| `docs/pack.py` | 디자인 복구 파일 (이미지 주소 → 파일업로더, `PG_NUMBER` → pg 번호) |
| `docs/신규 스킨 작업.md` | 전체 절차 (이번에 받은 문서) |
| `docs/eppum 작업 기록.md` | 바로 전 프로젝트(eppum)의 카페24 관리자 작업 방법 — 상품 · 리뷰 일괄 등록, 분류 이름, 게시판 켜기, 쿠폰 만들기 |

## 9. 카페24 관리자 작업 (2026-09-30, PC Claude 앱 세션)

| 항목 | 결과 |
|---|---|
| 파일업로더 | `food` 폴더에 webp 32개, `food/designcenter` 에 svg 6개. 이미지 서버 번호 **`pg3428b89746592058`** |
| 디자인 복구 | 백업 `food902_s2_260930223306_d_base_E.tar.gz` → `pack.py` (바로가기 51 · 교체 496 · 추가 38) → 복구 완료 |
| 분류 이름 | 24 신선식품 · 25 간편식 · 26 베이커리/팬트리 · 27 SALE · 28 전체 상품 (진열함). **하위 29 ~ 41 미진열은 아직** |
| 상품 | 30개, 상품번호 **11 ~ 40** (`p01` = 11 … `p30` = 40, 임시 번호보다 1 작다). 전체 32개(기본 샘플 9 · 10 포함) |
| 리뷰 | 상품 사용후기(4번) 글 2 ~ 31, 30개. 상품 11 ~ 40 에 **1개씩** 연결, 제목 `[연출 예시]`, 별점 5, 사진 = 그 상품의 카페24 상품 이미지 |

### 달라진 방법
- **jsDelivr 가 이 저장소를 내주지 않는다** (`Package size exceeded the configured limit of 50 MB` — 루트의 ChatGPT 원본 사진 때문).
  → 파일은 `https://raw.githubusercontent.com/tlsdmsrud902/food902/<커밋>/<경로>` 로 받는다 (CORS 허용됨).
- **상품 등록 화면에서 사진 파일 업로드까지 한 번에** 했다. 등록 화면에서도 `#imageFiles` 에 파일을 넣으면 `IMAGE.aUpload.d_image` 가 `temp_…` 로 바뀌고, 그대로 저장하면 실제 이미지가 저장된다. (수정 화면에서 다시 넣을 필요 없음)
  숨긴 iframe 에 등록 화면을 상품마다 새로 띄워 29개를 차례로 등록 (1건 약 12초).
- **리뷰 사진은 jsDelivr 대신 카페24 상품 이미지 주소**(`/product/detail.html?product_no=N` 의 `web/product/big/…jpg`)를 본문에 넣었다.
  글쓰기 화면(`/board/product/write.html?board_no=4&product_no=N`)을 iframe 으로 띄워 `product_no` · 제목 · 별점 · Froala · `content` 를 채우고 **등록 링크를 클릭** (1건 약 3.5초).
- 게시판 목록은 **한 쪽에 15개**, 마지막 쪽을 넘는 `page` 는 마지막 쪽이 반복된다 → 확인할 때는 글 번호(`.boardChk`)로 겹침을 없앤다.

### 확인
- 목록 2쪽에서 글 30개 · `[연출 예시]` 30 · 상품 11 ~ 40 각 1개, 글마다 `point_count` 5 · 본문 `<img` (30/30)
- 메인 : 진열 상품 카드 30개 모두 "★ 5.0 리뷰 1", 포토리뷰 8개 / 전체 상품 목록 1쪽 카드 20개 모두 "★ 5.0 리뷰 1"

### 아직 남은 것
1. 분류 29 ~ 41 미진열 (관리자 › 상품 분류 관리)
2. 메인 "장면 속 상품" `data-prd` · `#cz-looks-data` 를 실제 번호(임시 − 1)로 교체
3. 게시판 2번(뉴스/이벤트) · 3번(FAQ) 켜기
4. 세일 쿠폰 4종 만들기 → `store-content.js` 번호 · `remainUrl` 비우기 · `layout.html` `?v=` 올리기
5. Easy 편집기 확인
