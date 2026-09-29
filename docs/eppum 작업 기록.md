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
