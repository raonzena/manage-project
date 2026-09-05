# Rivet

소규모 팀을 위한 이슈 및 프로젝트 관리 서비스입니다. 워크스페이스 안에서 프로젝트를 구성하고, 담당 이슈와 진행 상황을 확인할 수 있습니다.

- [서비스 바로가기](https://manage-project-omega.vercel.app/)
- [Storybook 바로가기](https://manage-project-storybook.vercel.app/)

## 구현된 기능

- **인증**: 이메일·비밀번호 회원가입, 로그인, 로그아웃
- **온보딩**: 첫 워크스페이스와 프로젝트를 함께 생성
- **작업 공간**: 워크스페이스·프로젝트 추가 및 전환
- **대시보드**: 진행 중인 이슈, 7일 이내 마감 이슈, 이번 주 완료 현황, 첫 프로젝트의 내 이슈, 최근 변경된 이슈
- **프로젝트별 이슈 조회**: 전체, 내 이슈, 진행 중, 마감 임박 목록과 상태·담당자·마감일 표시
- **디자인 시스템**: 공통 UI 컴포넌트와 Storybook 문서

현재 이슈 생성·수정·삭제, 댓글, 라벨 관리 UI는 구현되어 있지 않습니다. 관련 데이터베이스 스키마와 화면에서 사용할 수 있는 기능은 구분됩니다.

## 기술 스택

| 영역 | 구성 |
| --- | --- |
| 애플리케이션 | Next.js 16.3.3 App Router, React 19.2.8, TypeScript 6 |
| 스타일 | Vanilla Extract |
| 인증·데이터베이스 | Supabase Auth, PostgreSQL, Row Level Security(RLS) |
| 입력 검증 | Zod 4 |
| 단위 테스트 | Vitest 5, Node 환경 |
| UI 개발·문서화 | Storybook 10, Next.js Vite 통합, Docs·접근성 애드온 |
| 패키지 관리 | pnpm 10.33.2 |
| 배포 | GitHub Actions, Vercel |

앱의 개발·프로덕션 빌드는 Webpack을 사용하며, SVG는 SVGR로 React 컴포넌트로 변환합니다. Storybook은 Vite와 Vanilla Extract 플러그인을 사용합니다.

## 시작하기

### 1. 의존성 설치

Node.js 22.12 이상인 22 LTS(CI 기준)와 pnpm 10.33.2를 준비한 뒤 저장소 루트에서 실행합니다.

```bash
pnpm install --frozen-lockfile
```

### 2. Supabase 준비

개발용 Supabase 프로젝트를 만들고 저장소의 마이그레이션을 적용합니다. 이미 이 저장소의 마이그레이션이 적용된 프로젝트를 사용한다면 환경 변수 설정으로 넘어갑니다.

```bash
pnpm exec supabase login
pnpm exec supabase link --project-ref <project-ref>
pnpm exec supabase db push
```

`db push`는 연결한 원격 프로젝트의 데이터베이스를 변경합니다. 적용 대상이 개발용 프로젝트인지 확인하세요. CLI 사용법은 [Supabase 데이터베이스 마이그레이션 문서](https://supabase.com/docs/guides/deployment/database-migrations)를 참고하세요.

스키마는 [supabase/migrations](supabase/migrations)에 있으며, 워크스페이스·프로젝트·이슈·사용자·멤버십·댓글·라벨 테이블, RLS 정책, 가입 시 사용자 프로필 생성 트리거, 워크스페이스와 첫 프로젝트를 생성하는 RPC를 포함합니다.

### 3. 환경 변수 설정

저장소 루트에 `.env.local`을 만들고 연결할 Supabase 프로젝트의 값을 입력합니다.

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
```

서버·브라우저 Supabase 클라이언트가 이 두 변수를 사용합니다. `.env.local`은 Git 추적에서 제외됩니다.

### 4. 개발 서버 실행

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에 접속합니다. 회원가입 후 로그인하여 첫 워크스페이스와 프로젝트를 생성합니다. Supabase에서 이메일 확인을 활성화한 경우 가입 확인이 필요합니다.

샘플 데이터를 제공하는 `supabase/seed.sql`은 현재 저장소에 없습니다. 새 프로젝트의 이슈 목록은 빈 상태로 시작합니다.

## 개발 명령어

| 명령어 | 설명 |
| --- | --- |
| `pnpm dev` | 앱 개발 서버 실행, 기본 포트 3000 |
| `pnpm build` | 앱 프로덕션 빌드 |
| `pnpm start` | 빌드한 앱 실행 |
| `pnpm lint` | ESLint 검사 |
| `pnpm lint:staged` | 스테이징된 코드 파일의 ESLint 검사 |
| `pnpm typecheck` | Next.js 라우트 타입 생성 후 TypeScript 검사 |
| `pnpm test:unit` | 전체 단위 테스트 1회 실행 |
| `pnpm test:unit:watch` | 파일 변경 시 단위 테스트 재실행 |
| `pnpm storybook` | Storybook 개발 서버 실행, 포트 6006 |
| `pnpm build-storybook` | `storybook-static/`에 정적 Storybook 빌드 |

## 커밋 전 검사

[Husky](https://typicode.github.io/husky/get-started.html)와 [lint-staged](https://github.com/lint-staged/lint-staged)를 사용합니다. `pnpm install` 시 `prepare`가 Git 훅을 설정하며, 커밋 시 `.husky/pre-commit`에서 `pnpm lint:staged`를 실행합니다.

스테이징된 JavaScript·TypeScript 파일(`js`, `jsx`, `ts`, `tsx`, `mjs`, `cjs`, `mts`, `cts`)에 ESLint를 실행합니다. 오류가 있으면 커밋이 중단됩니다. 자동 수정은 수행하지 않으며, 대상 파일이 없으면 검사를 건너뜁니다. 전체 타입 검사와 단위 테스트는 CI에서 수행합니다. CI에서는 `HUSKY=0`으로 훅 설치를 비활성화합니다.

## 단위 테스트

Vitest로 다음 핵심 로직을 검증합니다. 테스트는 대상 모듈 옆의 `*.test.ts`에 두며, Supabase 연결이나 환경 변수 없이 Node 환경에서 실행됩니다.

| 테스트 파일 | 검증 범위 |
| --- | --- |
| [navigation-domain.test.ts](components/navigation/navigation-domain.test.ts) | 메뉴별 이슈 필터, 마감 시각과 7일 경계, 워크스페이스·프로젝트 선택, 빈 목록 |
| [schema.test.ts](app/(auth)/_auth/schema.test.ts) | 로그인 입력, 회원가입 비밀번호 규칙, 이름 정규화, 비밀번호 확인 오류 |

날짜 관련 테스트는 시계를 고정하고 테스트마다 복원합니다. 현재 테스트는 단위 테스트이며, 브라우저 상호작용·실제 인증 세션·데이터베이스 연동을 검증하는 E2E 테스트는 포함하지 않습니다.

CI와 동일한 검사를 로컬에서 실행하려면 다음 명령어를 사용합니다.

```bash
pnpm lint
pnpm typecheck
pnpm test:unit
```

명령어의 `unit`은 테스트 수준을 나타냅니다. GitHub Actions에서는 lint·타입 검사도 함께 수행하므로 워크플로를 `Lint, Typecheck & Unit Tests`로 표시합니다.

## 디렉터리 구조

```text
app/
  (auth)/             # 로그인·회원가입 화면과 인증 Server Actions
  (app)/              # 대시보드, 온보딩, 이슈 목록, 작업 공간 Server Actions
components/
  gnb/                # 상단 내비게이션
  navigation/         # 작업 공간·프로젝트 선택, 이슈 메뉴, 생성 다이얼로그
design-system/
  icons/              # 공통 아이콘
  styles/             # 테마, 전역 스타일, 미디어 쿼리
  ui/                 # 공통 UI 컴포넌트와 Storybook 스토리
lib/supabase/         # 서버·브라우저 Supabase 클라이언트
server/queries/      # 사용자, 워크스페이스, 프로젝트, 이슈 조회
supabase/            # Supabase CLI 설정 및 SQL 마이그레이션
.storybook/          # Storybook 설정
.github/workflows/   # 단위 테스트·정적 검사, 앱·Storybook 배포, PR 자동 생성
```

## 배포 및 PR 자동화

| 워크플로 | 실행 조건 | 동작 |
| --- | --- | --- |
| [단위 테스트·정적 검사](.github/workflows/unit-tests.yaml) | 배포 워크플로에서 호출, 수동 실행 | ESLint → 타입 검사 → 단위 테스트 |
| [앱 배포](.github/workflows/deploy-vercel.yaml) | PR 이벤트, `main` push | PR은 Preview, `main` push는 Production 배포. 소스 브랜치가 `main`인 PR은 제외 |
| [Storybook 배포](.github/workflows/deploy-storybook.yaml) | 관련 파일 변경을 포함한 PR·`main` push, 수동 실행 | 저장소 기본 브랜치에서 Production, 그 외 Preview 배포 |
| [PR 자동 생성](.github/workflows/pr-automation.yaml) | `feat/**` 브랜치 push | 기본 브랜치 대상 열린 PR이 없으면 생성하고 push한 사용자를 담당자로 지정 |

앱과 Storybook 배포는 `unit-tests` 잡에서 공통 검사 워크플로를 호출합니다. `needs: unit-tests`로 연결되어 있어 lint·타입 검사·단위 테스트가 모두 통과해야 빌드·배포가 실행됩니다. 검사 잡에는 배포용 Secrets가 필요하지 않습니다.

Storybook 배포 대상 변경 경로는 `design-system/**`, `.storybook/**`, `package.json`, `pnpm-lock.yaml`, `vitest.config.mts`, 단위 테스트·Storybook 배포 워크플로 파일입니다. 배포 URL은 GitHub Actions 실행 요약에 표시됩니다.

GitHub Actions 배포에는 다음 Repository Secrets가 필요합니다.

| Secret | 용도 |
| --- | --- |
| `VERCEL_TOKEN` | Vercel CLI 인증 |
| `VERCEL_ORG_ID` | Vercel 계정 또는 팀 ID |
| `VERCEL_PROJECT_ID` | 앱 배포 프로젝트 ID |
| `VERCEL_STORYBOOK_PROJECT_ID` | 별도 Storybook 배포 프로젝트 ID |

앱 워크플로는 Vercel의 Preview·Production 환경 설정을 내려받아 빌드합니다. 앱 프로젝트의 각 환경에 앞서 설명한 Supabase 환경 변수를 설정해야 합니다. 데이터베이스 마이그레이션은 현재 배포 워크플로에 포함되어 있지 않으므로 별도로 적용합니다.
