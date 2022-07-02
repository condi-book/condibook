# 요약

1. BE로부터 받은 meta.title의 내용과 meta.description의 내용을 바탕으로 여러 keyword를 추출/제공하는 AI모델

-
-

2. BE로부터 받은 사용자의 관심사 키워드와 이로부터 워드임베딩된 키워드들을 통해 서버 내 북마크 된 여러 글들을 추천해주는 AI 모델.

-

## 아래는 필요한 내용을 쓴 곳으로 세세한 맥락 파악을 하는 것이 아니면 굳이 볼 필요가 없습니다.

#### 벤치마크.

-   https://teambohemian.tistory.com/87 --> 벤치마크 홈피.
-   https://huggingface.co/monologg/kobigbird-bert-base --> bert를 이용한 모델.
-   https://github.com/ratsgo/embedding --> 한국어 임베딩
-   https://github.com/lovit/textrank/ --> TextRank 를 이용한 키워드 추출과 핵심 문장 추출 (구현과 실험)

#### 참고자료.

-   https://www.tensorflow.org/tutorials/text/word2vec
-   https://ebbnflow.tistory.com/246 --> 한국어 전처리 참고.
-   https://www.digitalsales.ie/meta-tag-page-title-keyword-extractor.php
    -   영어라는 것을 제외하면 완전히 똑같은 서비스를 제공하는 site.. but 한국어가 들어간 사이트를 입력했을 때는 output을 뽑지 못하는데 meta description 자체가 인지되질 않더라..
    -   meta description이 너무 길어 짤린 경우 역시 아마 안되는듯.
-   https://github.com/MaartenGr/KeyBERT --> keyBert.. 참고용(Eng). 160자 이하 짧은 문장+ 제목으로는 부적합한 모델.
    -   중복성을 최소화하고 결과의 다양성을 극대화하기 위해 노력한다.
    -   대안 : DistilBERT(짧은 길이의 문장 키워드 뽑기..logic은 알아볼 필요성이 있다.)
-   https://brunch.co.kr/@kakao-it/189 --> 이론과 역사.

#### 참고논문.

-   https://www.sciencedirect.com/science/article/abs/pii/S0020025519308588 (paper)

#### 인풋 내용.

-   https://www.ascentkorea.com/meta-description-seo/#:~:text=%EC%9A%94%EC%95%BD%EB%AC%B8(description)%20%EB%A9%94%ED%83%80%20%ED%83%9C%EA%B7%B8%EB%A5%BC,%EC%9E%90%20%EC%A0%95%EB%8F%84%EA%B0%80%20%EC%A0%81%ED%95%A9%ED%95%98%EB%8B%A4. --> meta-description에 들어가는 내용에 대한 설명
-   https://velog.io/@w-hyacinth/%EA%B2%80%EC%83%89%EC%97%94%EC%A7%84SEO%EC%97%90-%EB%82%B4%EA%B0%80-%EC%84%A4%EC%A0%95%ED%95%9C-meta-description%EA%B3%BC-%EB%8B%A4%EB%A5%B4%EA%B2%8C-%EB%85%B8%EC%B6%9C%EB%90%98%EB%8A%94-%EC%82%AC%EB%A1%80-Google --> description에 들어가는 내용에 대한 이해(작성자 기준)

#### main.

-   Data : From aihub, 기고문 말뭉치,
-   model : word2vec 기반으로 타이틀에서 단어 추출, 그 이후 description에서의 문장과 단어 유사도를 비교 및 추출 내용 자체가 단어와 연관성이 높은 경우 그대로 키워드로 선정, 그정도가 아닐 경우 연관된 단어들을 찾아서 키워드로 선정.

#### 데이터 --> 양이 너무 많아서 git에 올리는 계획은 폐기..

-   https://aihub.or.kr/aidata/84 - 일반 상식
-   https://aihub.or.kr/aidata/7978 - 감성대화 말뭉치(textonly)
-   https://aihub.or.kr/aidata/8054 - 문서 요약 --> 문단을 통해 짧은 요약문을 만들어준 data.. result만 사용해도 충분할듯.
-   https://github.com/lovit/petitions_dataset - 국민청원 데이터
-   국립국어원 말뭉치 데이터

#### 기술스택

-   tensorflow
-   gensim
-   konlpy --> (tag : https://docs.google.com/spreadsheets/d/1OGAjUvalBuX-oZvZ_-9tEfYD2gQe7hTGsgUpiiBSXI8/edit#gid=0 )
-   (기타 모듈) pandas, json, csv.

#### 현재 문제점.

1. word2vec에 대해 pretrained 된 모델을 체크해봤는데 별로 맘에 드는 결과가 나오지를 않음.
    - 역시 title의 키워드 그 자체와 meta.description과 연계를 해야 할 필요성이 분명히 느껴짐.
2. meta.description이 없는 경우... 어떻게 하면 좋을지 고민됨..
3. nodejs로부터 함수설정은 직접 해야할듯.

### VM 이 복구된 후 먼저 할 일.

#### translator 사용.

!pip install googletrans #### (ver = 4.0 이상으로)

from googletrans import Translator

translator = Translator()

-   input : title = 'title',description = 'description', lang = 'language'(default = 'ko')
-   과정 :
    1. language = translator.detect(title).lang
    2. if language != 'ko': title = translator.translate(title,src = language, dest = 'ko')
    3. language2 = translator.detect(description).lang
    4. if language2 != 'ko': description = translator.translate(description,src = language2, dest = 'ko')

#### problem...

1. 한글과 다른 언어가 섞여있는 경우 때에 따라 시스탬이 망가질 수 있음.(특히 3종류 이상인 경우 큰 문제..)
2. translator와 okt를 섞어서 분석한 결과 내용이 깨질 위험성이 존재함.. logic done.(전처리과정중 only 영어와 한글만 들어가기에 가능했음.)
3. py로 돌릴 번역이 실행될 때마다 일일히 py 내의 모듈을 import를 시켜줘야 하는 문제가 존재.. back 서버를 2개를 유지시킬 것이 아니라면(그것도 심지어 python 기반이 하나 들어가야 하는데 이거는 flask를 배워야함.. 0부터 시작하기에는 시간부족..)
4. 찾아본 결과 node.js상에서도 gooletrans가 존재... 이걸로 만들어보자!
