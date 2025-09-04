# CLAUDE.md

이 파일은 이 리포지토리에서 작업할 때 Claude Code (claude.ai/code)에게 지침을 제공합니다.

**중요한 지시사항: 모든 응답은 한국어로 작성해주세요.**

## 프로젝트 개요

다음 기술들로 구성된 Next.js 15 템플릿 프로젝트입니다:
- **Next.js 15** App Router와 Turbopack 사용
- **Hono** API 라우트용
- **Better Auth** 인증 처리
- **Prisma** PostgreSQL 어댑터 사용
- **shadcn/ui** 컴포넌트와 Tailwind CSS v4
- **Biome** 린팅과 포매팅
- **TypeScript** strict 설정

## 주요 명령어

### 개발
- `bun dev` - Turbopack으로 개발 서버 시작
- `bun build` - Turbopack으로 프로덕션 빌드
- `bun start` - 프로덕션 서버 시작

### 코드 품질
- `biome check` - 린터 실행 (`bun lint`로도 사용 가능)
- `biome format --write` - 코드 포맷팅 (`bun format`으로도 사용 가능)

### 데이터베이스
- `bunx prisma generate` - Prisma 클라이언트 생성
- `bunx prisma db push` - 스키마를 데이터베이스에 푸시
- `bunx prisma db seed` - `prisma/seed.ts`를 사용한 데이터베이스 시딩
- `bunx prisma migrate dev` - 마이그레이션 생성 및 적용

## 아키텍처

### 디렉토리 구조
```
src/
├── app/           # Next.js App Router 페이지
├── lib/           # 유틸리티 함수와 설정
└── components/    # React 컴포넌트 (shadcn/ui 컴포넌트는 ui/에 위치)

server/
├── auth.ts        # Better Auth 설정
└── db.ts          # Prisma 클라이언트 싱글톤

prisma/
├── schema.prisma  # 데이터베이스 스키마
└── seed.ts        # 데이터베이스 시딩
```

### 주요 설정 파일
- `biome.json` - 린팅/포매팅 규칙 (2칸 들여쓰기, 120자 줄 길이)
- `components.json` - New York 스타일의 shadcn/ui 설정
- `prisma.config.ts` - 시드 명령어가 포함된 Prisma 설정
- `tsconfig.json` - 경로 별칭: `@/*` (src), `@server/*` (server), `@prisma-client/*` (generated)

### 데이터베이스 설정
- `@prisma/adapter-pg`를 통한 PostgreSQL 어댑터와 함께 Prisma 사용
- 생성된 클라이언트는 `generated/` 디렉토리로 출력
- `DATABASE_URL` 환경변수 필요

### 인증
- Better Auth 라이브러리 사용
- `server/auth.ts`에서 설정
- 최소 설정으로 기본 셋업

### 스타일링
- shadcn/ui 컴포넌트와 함께 Tailwind CSS v4 사용
- 테마를 위한 CSS 변수 활성화
- 아이콘은 Lucide React 사용
- Geist 폰트 패밀리 (sans와 mono)

## 개발 참고사항

- 모든 코드 포매팅과 린팅은 Biome 사용
- 기존 경로 별칭 구조 준수
- 데이터베이스 클라이언트는 `server/db.ts`에서 싱글톤 패턴 사용
- 환경변수는 설정 파일에서 dotenv를 통해 로드