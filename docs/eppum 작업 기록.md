# eppum (K-뷰티) 리뉴얼 작업 기록 — 2026-09-29

`신규 스킨 작업.md` 절차(A. 내 PC 코드)에 따라 PETPIA(펫) 스킨을 K-뷰티 쇼핑몰 **eppum** 으로 바꾼 기록.

| 항목 | 값 |
|---|---|
| 카페24 계정 (mall_id) | `eppum902` (`https://eppum902.cafe24.com`) |
| 스킨 폴더 | `eppum902_s2_260925195134_d_skin1_E/skin1` |
| 디자인 코드 · 번호 | `base` · `1` (`ez/ez-settings.json`) |
| 이미지 서버 번호 | `pg3424b68273970037` (파일업로더 주소 `https://ecimg.cafe24img.com/pg3424b68273970037/eppum902/beauty/…`) |
| 이미지 폴더 | `SkinImg/beauty/` (파일업로더 폴더도 `beauty` 권장) |
| 코드 이름 | 클래스 `beauty-*`, 전역 변수 `EPPUM_*`, 페이지 `/beauty/guide.html` |

## 1. 이름 · 경로 바꾸기
- `git mv` : `adia902222_…` → `eppum902_…`, `pet/` → `beauty/`, `pet-*.css/js` → `beauty-*`, `petpia-designcenter-*` → `eppum-designcenter-*`
- 일괄 치환 : `node docs/tools/rebrand-eppum.js` (PETPIA_ → EPPUM_ 먼저, 그다음 PETPIA → eppum, pet → beauty, pets → routines, 옛 이미지 이름 → 새 이미지 이름)
- 상품분류 "전체 상품" 번호 : `42` → `28` (새 계정 기본 대분류 번호 사용)

## 2. 새 이미지 (`python3 docs/tools/eppum-images.py`, Pillow 필요)
저장소 루트의 새 사진으로 `SkinImg/beauty/*.webp` 와 상품 이미지 `cafe24-assets/products/p01~p30.jpg` 를 만든다.
- 가로 장면 1672×941 `scene-*`, 정사각 1254 `sq-*`, 세로 카드 1086×1448 `card-*`, 세로 1122×1402 `portrait-*`
- 글자 로고 `logo-eppum.webp`(560×200) · 하단 큰 글자 `wordmark-eppum.webp`(2146×724), 배경 투명
- **쓰지 않은 사진** : `Designer_perfume_bottle…`(실제 향수 브랜드 간판), `Beauty_store_shelf…`(실제 브랜드 제품 라벨), `Red_lipstick…` 은 로고가 없는 오른쪽 발색 부분만 사용

## 3. 분류 · 메뉴
| 번호 | 분류 | 목록 배너 키 |
|---|---|---|
| 28 | 전체 상품 | all |
| 24 | 스킨케어 | skincare |
| 25 | 메이크업 | makeup |
| 26 | 바디/헤어 | body |
| 27 | SALE | (세일 전용 화면) |

`store-content.js` 의 `menu.editorial: true` → `header.html` 의 고정 메뉴를 쓴다.

## 4. 메인 화면에서 바뀐 것
- 히어로 : 1번은 영상 자리 그대로(영상 주소가 비어 있으면 `scene-glow` 사진), 2 · 3번 `scene-botanical` · `scene-palette`
- "누구와 함께하나요(강아지·고양이)" → "어떤 루틴이 필요하세요(스킨케어·메이크업)"
- 취향 찾기 → 루틴 찾기 (루틴 × 보습/생기/지속력 → 검색어) : `beauty-cozy-home.js initFinder`
- 사이즈 가이드 → 3단계 루틴 가이드 (SVG 그림). 3D 보기 기능(initSize3D)은 그대로 두고, 모델 주소를 `data-size-3d-model` 로 넣게 바꿨다 (비어 있으면 SVG)
- 체크리스트 : 스킨케어 / 메이크업 (localStorage 키 `eppum-starter-v1`)
- 장면 속 상품 4장면 : `data-prd` 는 **임시 번호**(p01 = 12 … p30 = 41). 카페24 상품 등록 후 실제 번호로 교체
- `$count$count = 10` 오타 수정
- 색 : 로즈 · 누드 톤 (`--cz-accent:#a4505a`, 배경 `#fdf8f6`)

## 5. 샘플 상품 `cafe24-assets/products/products.json`
30개, `group` rec/new/best 각 10개, `cates` 에 27 이 있으면 SALE(정상가 `retail`). `product_no_temp` = 메인 장면 속 상품의 임시 번호.

## 6. 로컬 미리보기
`node docs/tools/serve.js` → http://localhost:8765 (`/`, `/product/list.html?cate_no=24`, `?cate_no=27`, `/beauty/guide.html`)

## 7. 남은 일
- ~~옛 펫 파일 삭제~~ : 완료 (`SkinImg/pet/`, `.recovery/`, 옛 메인 백업, `beauty-editorial.js`, `cafe24-assets` 의 펫 폴더, `manual/`, `manual-cms/`)
- 원하면 옛 기록 없이 새로 시작 (`신규 스킨 작업.md` 2-4)
- 카페24 관리자 작업 (B 단계 9 ~ 17) : 분류 이름 변경, 상품 30개 등록, 메인 진열, 파일업로더 `beauty` 폴더, 디자인 복구, `PG_NUMBER` 교체, 포토리뷰 [연출 예시]
- 디자인센터 상세페이지의 "구매 후 이렇게 바꿔요" 단계별 화면 캡처는 펫 화면이라 빼 두었다 → 실제 쇼핑몰 적용 후 새로 캡처해서 넣기

## 8. 디자인 복구 파일 (2026-09-29)
- 백업 : `eppum902_s2_260929203423_d_base_E.tar.gz` (카페24 기본디자인, 파일 496 · 폴더 77 · 바로가기 51)
- 만들기 : `python3 docs/pack.py <백업.tar.gz> pg3424b68273970037` → `_deploy/<백업과 같은 이름>.tar.gz` (git 제외)
- 결과 : 바로가기 51 그대로 · 교체 496 · 추가 38 · 0.62MB. 스킨 이미지는 빼고 파일업로더 주소로 바꿈
- 두 번째 복구부터는 새로 백업해서 **새 이름**으로 만든다 (같은 이름으로 복구하면 바뀌지 않음)

## 9. 도구 사용법 (다음 프로젝트에서 그대로 쓰기)
저장소 `tlsdmsrud902/k_eppum` 의 `docs/tools/` · `docs/pack.py`. 새 프로젝트에서는 브랜드 이름 · 폴더 이름 · 계정 아이디만 바꿔서 쓴다.

| 도구 | 하는 일 | 실행 |
|---|---|---|
| `docs/tools/rebrand-eppum.js` | 옛 브랜드 이름 · 아이디 · 경로 · 클래스 · 옛 이미지 이름 일괄 치환 | `node docs/tools/rebrand-eppum.js` |
| `docs/tools/eppum-images.py` | 새 사진 → 스킨 webp(가로 · 정사각 · 세로) + 상품 사진 p01~p30 + 글자 로고 | `pip install pillow` 후 `python3 docs/tools/eppum-images.py` |
| `docs/tools/serve.js` | 로컬 미리보기 (카페24 `{$…}` 변수는 예시 값으로 채움, 해외배송 창 숨김) | `node docs/tools/serve.js` → http://localhost:8765 |
| `docs/pack.py` | 디자인 복구 파일 (원본 바로가기 51개 유지, 이미지 주소 → 파일업로더) | `python3 docs/pack.py <백업.tar.gz> <pg번호>` |

## 10. 이번에 배운 점 (다음 프로젝트 체크리스트)
1. **기능은 지우지 않는다.** 사진 · 문구만 바꾼다. 이번에 3D 보기(`initSize3D`) · 첫 화면 영상 칸을 지웠다가 되살렸다. `?edit=1` 화면 편집 칸(`data-cms-*`)은 원본과 개수를 비교해 확인한다.
   ```bash
   c(){ grep -oE 'data-cms[a-z-]*' | sort | uniq -c; }
   diff <(git show <원본커밋>:<옛폴더>/skin1/index.html | c) <(c < <새폴더>/skin1/index.html)
   ```
2. **처음 요청할 때 "예전 파일 · 기록은 모두 지워도 된다"고 적는다.** 파일 삭제 · 기록 새로 시작(강제 푸시)은 확인 없이는 진행되지 않는다.
3. **실제 브랜드 이름이 보이는 사진은 쓰지 않는다.** (이번 : 향수 매장 간판, 매장 선반 라벨, 립스틱 로고)
4. **로컬 미리보기에 `{$…}` 가 보이는 건 정상** — 카페24 서버가 채우는 자리. 실제 쇼핑몰에서는 값으로 바뀐다. (최신 `serve.js` 는 예시 값으로 채움)
5. **WORLD SHIPPING 창** 은 카페24 해외배송 선택 기능. 실제 쇼핑몰에서는 버튼을 눌렀을 때만 뜬다. 로컬에서만 숨긴다.
6. **클라우드(웹) 세션은 카페24 접속이 막혀 있다.** 코드 · 이미지 · 복구 파일은 클라우드에서, 관리자 작업(분류 · 상품 · 리뷰 · 게시판 설정)은 PC 의 Claude 앱 세션(내장 브라우저)에서 한다.
7. **카페24 가입 직후 받을 것 두 가지** : 파일업로더 이미지 주소(`pg…` 번호) · 디자인 백업 파일(`…_d_base_E.tar.gz`). 이미지는 파일업로더 새 폴더(`beauty` 등)에 먼저 올린다.
8. **예시 리뷰는 제목에 [연출 예시]** 를 붙인다. 실제 후기처럼 보이게 만들지 않는다.

## 11. 진행 순서 요약 (eppum 기준, 실제로 걸린 순서)
1. 첨부 문서 + 새 사진 → 클라우드 세션에서 스킨 변경 · 이미지 생성 · 미리보기 (커밋 · 푸시)
2. 예전 파일 삭제 → 기록 새로 시작 (main 에 커밋 1개)
3. 카페24 가입 → 파일업로더 `beauty` 폴더에 이미지 41개 업로드 → 이미지 주소 전달
4. 디자인 백업 파일 전달 → `pack.py` 로 복구 파일 → 관리자 "디자인 복구" 로 적용
5. PC Claude 세션 : 분류 이름 변경(24~28) → 상품 30개 등록 · 사진 파일 업로드 → 메인 진열 → [연출 예시] 리뷰 → `?edit=1` 게시판(2번) 켜기
6. 실제 상품번호로 메인 "장면 속 그 상품" `data-prd` 교체 (코드 편집기)

## 12. 카페24 관리자 작업 — 상품 30개 · 리뷰 30개 등록 (2026-09-29, eppum902 실제 작업)

### 결과

| 항목 | 내용 |
|---|---|
| 상품 | 30개 등록 (상품번호 **11 ~ 40**). `products.json` 의 `product_no_temp`(12~41) 보다 **1 작다** |
| 상품 이미지 | 30개 모두 파일 업로드로 저장. 목록·상세 이미지 60개 주소 전수 확인 (60/60 열림) |
| 메인 진열 | 추천상품(2) 10 · 신상품(3) 10 · 추가카테고리1(4) 10 |
| 기본 샘플상품 | 9 · 10 번 진열 해제 (`is_display` = F) |
| 리뷰 | 상품 사용후기(board_no=4) **글 2 ~ 31**, 30개. 상품 11~40 에 1개씩 연결, 별점 5, 사진 = 그 상품 이미지(jsDelivr) |
| 리뷰 원고 | `cafe24-assets/reviews.json` (상품번호 · 제목 · 본문) |

### 상품번호 매핑 (실제)

`p01` = 11 · `p02` = 12 … `p30` = 40 (기존 샘플상품 9 · 10 다음 번호가 11 부터 시작)

### 등록 방법 (baby앙보다 빨라진 부분)

1. **상품 등록** : 상품 등록 화면에서 `p01` 한 개만 메뉴얼 스크립트로 저장한 뒤,
   그때 만들어진 **FormData 를 본으로 삼아** 이름 · 판매가 · 소비자가 · 분류 · 메인진열 · 상세설명만 바꿔 `fetch` 로 POST 했다.
   화면을 다시 열 필요가 없어 29개를 한 번에 등록했다. 분류는 폼에 이렇게 들어간다.
   ```
   addCategoryNum[]=  /  addCategoryNum[]=24  /  addCategoryNum[]=28
   category_product[group1][24]=T  /  category_product[group1][28]=T
   ```
   (`category_product[group1][#NUM#]` 은 템플릿 칸이라 그대로 남긴다. 일회용 토큰은 없다.)
2. **상품 이미지 · 리뷰** : 화면 기능(`IMAGE` · Froala)이 필요해서 **숨긴 iframe** 에 화면을 띄우고
   그 안에서 파일 넣기 · 저장을 돌렸다. 관리자 · 게시판 화면 모두 iframe 으로 열린다. (1건당 약 6초)
3. 오래 걸리는 작업은 `window.__prog` 같은 전역에 진행 상황을 쌓고 **바로 반환** 한 뒤 나중에 확인한다.
   (브라우저 콘솔 도구는 45초에서 끊긴다)

### 검증 방법

- 상품 : 관리자 상품 목록 "총 32개"(기존 2 + 30), 상품마다 `display_group[1][]` · `is_display` 확인 → 2/3/4 각 10개
- 이미지 : 분류 5개의 목록 화면 HTML 에서 `web/product/…jpg` 주소 60개를 뽑아 모두 `fetch` → 60/60 200
- 리뷰 : 게시판 목록 4쪽에서 글 30개 · 상품 연결 30개 · 제목 `[연출 예시]` 30개,
  글마다 `/exec/front/board/product/4?no=…&board_no=4&pass_check=F` 로 `point_count` = 5 · 본문에 `<img` 확인

### 아직 남은 일

1. **분류 이름** : 24~28 이 아직 카페24 기본 샘플 이름(`(대분류) Outerwear` 등)이다.
   → 관리자 → 상품 → 상품 분류 관리에서 24 스킨케어 · 25 메이크업 · 26 바디/헤어 · 27 SALE · 28 전체 상품 으로 바꾼다.
   (트리는 **사람이 직접 클릭** 해야 선택된다)
2. **메인 "장면 속 상품"** : `index.html` 의 `data-prd` 가 임시 번호 12 · 13 · 18 · 20 · 21 · 23 · 29 · 37 · 39 다.
   실제 번호는 **모두 1 작다** (11 · 12 · 17 · 19 · 20 · 22 · 28 · 36 · 38). `#cz-looks-data` 도 같이 바꾼다.
3. 스킨 반영 후 메인 "포토리뷰" 칸에서 사진이 보이는지 확인 (기본 스킨 상태에서는 칸 자체가 없다)
