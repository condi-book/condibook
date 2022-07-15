<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8a7c1510-80e6-4caf-90fd-e5814f79f44b%2F%ED%8C%8C%EC%9D%B4%EB%84%90-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-003.png?table=block&id=02fb716b-c2d3-4abb-8aa3-21672738654f&spaceId=530d1033-cf9f-41a2-b140-62d3e90887dd&width=2000&userId=bcca9098-2b6f-4374-a441-6a95608c2380&cache=v2" width="300"/>

## ✨ 서비스 바로가기
- [CondiBook](https://kdt-ai4-team14.elicecoding.com/)


---

## 🔗 GitHub 링크

- [GitHub - condi-book/condibook: bookmark-share-service](https://github.com/condi-book/condibook)

---

## 1. 서비스 소개

### condibook
    : 당신의 편리한 북마크

### ❗ 목표

💡 AI를 활용한 편리한 북마크 관리 및 북마크 공유 서비스



- 양질의 정보가 담긴 다른 사람들의 북마크를 보고 싶은 사용자
- 공유된 링크를 한 곳에서 관리해서 능률을 높이고 싶은 사용자
- 북마크를 빠르고 편하게 정리하고 싶은 사용자

> 북마크의 한정된 기능으로 느꼈던 불편함을 ***Condibook***으로 해결하세요!
> 

### ❓ 기획 의도

#### 🟦 눈에 띄지 않는 **서포터**, 북마크

- 북마크는 필요한 정보를 선별하여 습득할 수 있는 유용한 도구입니다.
- [MS 블로그](https://www.microsoft.com/insidetrack/blog/internal-search-bookmarks-boost-productivity-at-microsoft/) 에 의하면 사내 북마크 검색으로 27배의 시간 절약한 효과를 경험했다고 합니다.
- 사용자들은 브라우저 북마크 기능에 만족하지 않고, 편리한 정리와 공유 기능을 가진 북마크 서비스를 찾고 있습니다.

#### 🟪 북마크 **발전 포인트**

- 북마크 대충 저장해서 다시 찾기 어려운 경우
- 양질의 콘텐츠를 빠른 시간에 찾고 싶은 경우
- 협업 때 공유한 링크를 찾는데 시간을 지체하는 경우

#### 🟥 Condibook이 제시한 방법

- ⚡️ 15개의 카테고리로 AI가 사이트를 분류하여 추천
- 👀 커뮤니티로 다른 사람들의 북마크 조회
- 📚 팀 북마크 관리로 흩어진 링크들을 폴더로  관리

---

## 2. 기술 스택


### 💻 Frontend
---

- **`React`**   
- **`TypeScript`** 
- **`Styled-components`** 
- **`React-bootstrap`**
- **`Amazon S3`**
- **`Axios`**
    
   

    
  
    

### 💾 Backend
---

- **`Node.js & Express`**   
- **`JWT`**
- **`Sequelize`**
- **`docker`**
- **`MySQL`**
- **`Amazon RDS`**
- **`aws ec2`**
- **`Logstash`**
- **`ElasticSearch`**
    
  

  
    

### 🤖 AI
---

- **`Flask`**
- **`Word2vec`**
- **`Googletrans`**
- **`Konlpy`**
- **`Regex`**
    
  

    
  
    

### 🌐 배포
---

- **`Nginx`**
- **`Docker, Docker-compose`**
    

    
  
    

---

## 3. 서비스 기능

### ⚛ 크롬 확장 프로그램
---



: 사용자의 편의성을 고려하여 북마크 할 페이지에서 버튼 클릭 시 해당 URL에 대한 meta 정보를 기준으로 사용자에게 AI 추천 카테고리 제공

- **세부 기능**
    - 대부분의 url에서 AI를 통한 **15개**의 카테고리 별 폴더 추천 기능 제공
    - 저장 폴더를 직접 입력 하거나 이미 저장된 카테고리로도 저장 가능
    - 북마크 저장 시 해당 페이지로 이동하여 확인 가능
    - 크롬 확장 프로그램 다운로드 링크
        
        → [Chrome 웹 스토어](https://chrome.google.com/webstore/search/condibook?hl=ko)
        


### ⚛ 메인 페이지
---



: 서비스와 관련된 정보 제공, 실 서비스 이용 페이지와 연결해주는 페이지

- **세부 기능**
    - CondiBook 서비스 및 개발자 소개
    - 크롬 확장 프로그램
        - 클릭 시 크롬 웹 스토어 새 탭 이동
    - 로그인 / 회원가입
        - 클릭 시 소셜 로그인 (구글 & 카카오) 페이지로 이동
        - 이미 로그인한 유저의 경우, 클릭 시 마이 페이지로 이동
    


### ⚛ 프로필 창
---



- 사용자 정보 확인
- 수정 버튼 클릭 시 닉네임 설정 및 프로필 소개글 입력 기능
- 로그아웃 기능



### ⚛ 나의 북마크 페이지
---



:  나의 북마크, 폴더 관리 및 북마크 상세 정보 제공 페이지

- **세부 기능**
    - 북마크 폴더 생성 & 수정 & 삭제 & 즐겨찾기 기능
    - 북마크 추가 & 정렬(드래그 앤 드랍) & 이동 & 삭제 기능
    - 미리보기(iframe) 기능
        - 미리보기가 불가능한 url일 경우 **`새탭으로 열기`** 버튼 클릭 시  볼 수 있음
    - 스크랩한 북마크 탭에서 좋아요한 게시글  모아보기 기능



### ⚛ 커뮤니티 페이지
---



: 다양한 사용자가 제공하는 북마크 정보를 확인하고 서로 공유하는 페이지

- **세부 기능**
    - 게시글 상세 정보 확인
    - 게시글 추가 & 수정 & 삭제 기능
    - 좋아요 기능
    - 댓글 추가 & 수정 & 삭제 기능
    - 조회수, 좋아요, 최신순 정렬 기능
    - 북마크 첨부 기능 (10개 제한)
    - Markdown 문법 제공
    - 링크 클립보드 복사 기능
        - 오른쪽 아래 추가 버튼 클릭하여 링크 클립보드 붙여넣기 기능
        - 나의 북마크에 해당 링크 추가 기능 ( + **AI 폴더 추천 기능**)
    - 미리보기(iframe) 기능
        - 미리보기가 불가능한 url일 경우 **`새탭으로 열기`** 버튼 클릭 시  볼 수 있음
    - 검색 기능
        - 제목 + 내용



### ⚛ 그룹(팀) 북마크 페이지
---



:  그룹(팀)별로 그룹, 북마크, 폴더 관리 및 북마크 상세 정보 제공 페이지

- **세부 기능**
    - 그룹 생성 및 그룹 간 북마크 공유 기능
    - 그룹(팀) 생성, 정보 수정 기능
    - 유저 정보 확인
    - 매니저 권한 기능
        - 그룹(팀) 관리가 원활하게 이루어지게 하기 위함
        - 유저 초대 및 추방 기능
        - 폴더 및 북마크 삭제 기능
    - 북마크 폴더 생성 & 수정 & 즐겨찾기 기능
    - 북마크 추가 & 정렬(드래그 앤 드랍) & 이동
    - 미리보기(iframe) 기능
        - 미리보기가 불가능한 url일 경우 **`새탭으로 열기`** 버튼 클릭 시  볼 수 있음



### ⚛ 통합 검색 페이지
---



: 커뮤니티 게시판, 나의 폴더, 팀 폴더에 대한 통합 검색 기능 제공 페이지

- **세부 기능**
    - 나의 북마크 페이지, 그룹 북마크 페이지에 오른쪽 하단의 검색 버튼 클릭 시 나타남
    - 필터 기능 (전체, 내 폴더, 팀 폴더)
    - 검색 결과 선택 시 해당 상세 페이지로 이동



### ⚛ 설정 창
---



- 크롬 확장프로그램 다운로드 클릭 시 크롬 웹스토어로 이동
- 로그아웃 버튼 클릭 시 메인페이지로 이동



---

## 4. 팀원 역할 분담

| 이름 | 역할 | 담당 부분 |
| --- | --- | --- |
| 강주희 | 팀장, 프론트엔드 | ▪  WIKI 작성 <br/> ▪ 와이어프레임 제작 및 디자인 총괄 <br/> ▪ 메인, 사이드바, 통합 검색, 나의 북마크 페이지 구현 <br/> ▪ 크롬 익스텐션 |
| 김하영 | 프론트엔드 | ▪ 와이어프레임 제작 <br/> ▪ 아키텍쳐 구조도 제작 <br/> ▪ 팀 페이지 구현 <br/> ▪ 커뮤니티 페이지 구현 <br/> ▪ iframe 미리보기 분기 구현 |
| 서형준 | AI | ▪ 인공지능 모델 설계 <br/> ▪ 데이터 전처리 <br/> ▪ 발표 |
| 엄혜진 | 백엔드 | ▪ ER-diagram 설계 <br/> ▪ 백엔드 API 설계 및 구현 <br/> ▪ Redis로 웹사이트 파싱 정보 및 키워드 조회 시간 단축 <br/> ▪ docker-compose로 리눅스 서버에 HTTPS 배포 |
| 한우성 | 백엔드 | ▪ 크롬 익스텐션 배포 및 AI 연결 <br/> ▪ 백엔드 API 설계 및 구현 <br/> ▪ ElasticSearch로 커뮤니티 검색 기능 강화 <br/> ▪ Mysql DB 구축 (AWS RDS) |
| ALL |  | ▪ 기획 <br/> ▪ 발표 및 소개 자료 준비 <br/> ▪ QA |


---

## 5. 프로젝트 구성도
- [기획서](https://kdt-gitlab.elice.io/ai_track/class_04/ai_project/team14/condibook/-/wikis/%EA%B8%B0%ED%9A%8D%EC%84%9C)
- [와이어프레임](https://www.figma.com/file/83qXjmq0mikS83PQzxdppU/%EC%BB%A8%EB%94%94%EB%B6%81?node-id=0%3A1)
- [API 명세서](https://documenter.getpostman.com/view/19600896/Uz5MDspk)
- 프로젝트 구조도

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff8d34f2f-78b3-4704-af02-c704bd714a8c%2FUntitled.png?table=block&id=d7f42d33-d670-4fe4-9958-0d4c2d89b252&spaceId=530d1033-cf9f-41a2-b140-62d3e90887dd&width=2000&userId=bcca9098-2b6f-4374-a441-6a95608c2380&cache=v2" width="400"/>

- 페이지 구조도

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F60246213-34c3-4b54-a350-aace241e3e86%2F%ED%8E%98%EC%9D%B4%EC%A7%80_%EA%B5%AC%EC%A1%B0%EB%8F%84_-_Account_ownership_diagram_(3).png?table=block&id=91903f38-51be-42da-9b19-e222a3e48aa5&spaceId=530d1033-cf9f-41a2-b140-62d3e90887dd&width=2000&userId=bcca9098-2b6f-4374-a441-6a95608c2380&cache=v2" width="400"/>

- ER Diagram

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4b85447a-a15c-4279-8cca-5b4e206fad0d%2FUntitled.png?table=block&id=271c9af1-2e7e-4488-9344-a9114dd789ca&spaceId=530d1033-cf9f-41a2-b140-62d3e90887dd&width=1970&userId=bcca9098-2b6f-4374-a441-6a95608c2380&cache=v2" width="400"/>

- AI 플로우

<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fddf19d37-138d-4991-8e64-c910c2054cf2%2FUntitled.png?table=block&id=017b38b1-d2a3-40e2-b7c7-fc03171dc52f&spaceId=530d1033-cf9f-41a2-b140-62d3e90887dd&width=2000&userId=bcca9098-2b6f-4374-a441-6a95608c2380&cache=v2" width="400"/>
