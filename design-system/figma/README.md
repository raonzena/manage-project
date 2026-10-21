# Figma Code Connect

현재 저장소의 UI 컴포넌트를 Figma Design System 라이브러리에 연결합니다.
템플릿은 실제 컴포넌트를 새로 렌더링하지 않고, 선택한 인스턴스에 맞는 사용 코드를 반환합니다.
코드 import는 이 저장소에서 사용하는 `@/design-system/ui`를 기준으로 합니다.

## 매핑을 작성한 컴포넌트

| 컴포넌트 | Figma 원본 | 코드 매핑 |
| --- | --- | --- |
| Badge | [24:21](https://www.figma.com/design/oIwIMYR0d1PNyTBcXy4v7k/Design-System?node-id=24-21) | `Tone` → `tone`, `Label` → `children` |
| Button | [24:10](https://www.figma.com/design/oIwIMYR0d1PNyTBcXy4v7k/Design-System?node-id=24-10) | `Tone` → `tone`, `Size` → `size`, `Label` → `children` |
| Input | [24:22](https://www.figma.com/design/oIwIMYR0d1PNyTBcXy4v7k/Design-System?node-id=24-22) | `Label` → `label`, `Placeholder` → `placeholder`, `Hint` → `hint` |
| Card | [24:27](https://www.figma.com/design/oIwIMYR0d1PNyTBcXy4v7k/Design-System?node-id=24-27) | `Content` 슬롯 → `children` |

Badge의 모든 Tone과 Button의 모든 Tone·Size를 매핑합니다.
코드에만 있는 Button의 `danger`, `ghost`, `lg` 등은 현재 Figma에 해당 Variant가 없으므로 출력하지 않습니다.
Card의 Content는 자유 편집 슬롯이므로 Dev Mode에서 선택 가능한 슬롯 참조로 표시합니다.
슬롯의 임의 레이아웃이나 내용을 고정 JSX로 대체하지 않습니다.
텍스트는 JSON 문자열 리터럴을 JSX 표현식에 넣어 따옴표·중괄호·줄바꿈이 포함되어도 원문을 보존합니다.

```tsx
import { Badge } from "@/design-system/ui";

<Badge tone="success">{"완료"}</Badge>;
```

## 검증과 게시

```sh
pnpm install --frozen-lockfile
pnpm figma:check
```

`figma:check`는 별도 tsconfig로 템플릿을 타입 검사하고 공식 CLI로 파싱합니다.
Badge·Button의 enum 값과 Input의 prop 이름은 실제 React 컴포넌트 타입과 대조합니다.
앱의 tsconfig에서는 `.figma.ts`만 제외하여 Figma 전용 타입을 앱에 추가하지 않습니다.
기존 CI의 단위 테스트 워크플로에서도 이 검사를 실행합니다.

Figma API를 사용하는 미리보기와 게시에는 Code Connect Write, File content Read 권한의 토큰이 필요합니다.
토큰은 로컬 `FIGMA_ACCESS_TOKEN` 환경 변수 또는 GitHub Actions의 같은 이름 Repository Secret으로 설정합니다.
토큰을 소스 파일에 작성하거나 커밋하지 않습니다.

```sh
pnpm figma:preview
pnpm exec figma connect preview design-system/figma/badge.figma.ts --all --skip-update-check
pnpm figma:publish
```

GitHub Actions의 `Publish Figma Code Connect` 워크플로는 main 브랜치에서 수동 실행합니다.
게시 완료 후 Figma의 Badge 인스턴스에서 Tone과 Label을 바꾸고 Dev Mode의 React 코드를 확인합니다.
Figma MCP에서도 디자인에 포함된 연결 컴포넌트의 import와 사용 코드가 반환되어야 합니다.

컴포넌트 API나 Figma 속성이 바뀌면 해당 `.figma.ts`를 함께 수정하고 다시 게시합니다.
현재 파일은 직접 관리하는 템플릿이며, 자동 생성 파일이 아닙니다.
검증한 매핑이 충분히 늘어난 뒤 생성기 입력과 생성 결과를 분리할 수 있습니다.

## 아직 연결하지 않은 컴포넌트

| Figma 컴포넌트 | 코드 확인 결과 |
| --- | --- |
| StatCard | 후보인 `app/(app)/_dashboard/TaskCard.tsx`의 TaskCard에는 Figma에 없는 필수 `note`가 있고 `taskCount`는 숫자입니다. 동일 API로 확정할 수 없습니다. |
| ProjectSwitcher | `components/navigation/workspace-navigation.tsx`에서 Select와 워크스페이스 데이터로 구현합니다. 같은 이름의 독립 컴포넌트가 없습니다. |
| NavigationItem | 같은 navigation 파일의 Next Link와 메뉴 데이터 조합입니다. 독립 컴포넌트가 없습니다. |
| IssueRow | 대시보드와 이슈 페이지 내부에서 데이터, li, Badge를 조합합니다. 독립 컴포넌트가 없습니다. |

## 원격 등록 상태

2026-10-21에 라이브러리 게시와 위 네 원본 컴포넌트의 속성 조회까지 확인했습니다.
Code Connect 등록 요청에는 Figma 서버가 다음 메시지를 반환했습니다.

> Code connections can only be made in libraries that are in Organization or Enterprise plans.

Badge의 React 매핑을 다시 조회한 결과도 빈 객체였습니다.
따라서 현재 이 파일들은 검증된 로컬 매핑이며 원격 등록은 완료되지 않았습니다.
사용자의 팀은 Professional이며, 최신 공식 문서는 Professional의 Dev 또는 Full 좌석도
Code Connect를 지원한다고 안내합니다. 따라서 이 응답만으로 요금제 변경이 필요하다고 단정하지 않습니다.
다음 단계는 적절한 권한의 개인 액세스 토큰을 설정하고 공식 CLI의 `pnpm figma:publish`로
게시 가능 여부를 확인하는 것입니다. 현재 작업 환경에는 해당 토큰이 없습니다.
게시가 성공하면 Dev Mode 및 Figma MCP에서 실제 출력이 반환되는지 확인해야 합니다.

## 공식 문서

- [템플릿 파일](https://developers.figma.com/docs/code-connect/template-files/)
- [CLI 명령](https://developers.figma.com/docs/code-connect/cli-reference/)
- [Figma MCP 연동](https://developers.figma.com/docs/figma-mcp-server/code-connect-integration/)
