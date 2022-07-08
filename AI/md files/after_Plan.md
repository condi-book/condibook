### Two plans.

-   현재 2번이 하기 쉬운 편에 속하기에 먼저 진행중..

1. model file refine or create new model.

    #### 방향1

    - model file refine : corpus를 추가할 수 있게 셋팅을 바꾼 후 모델을 다시 훈련.(방법을 찾아봐야함.)

    #### 방향2

    - create new model : 시간이 얼마나 걸릴지 모름 + model의 정확도 역시 예측 불가..(복불복)

2. model.py update..

-   카테고리 단어 더하기 : (현재) 음악, 쇼핑.
-   logic 재설정.. input : title & description, output : hashtag_keyword

-   기존 logic :

    1. title로부터 명사 추출 및 유사단어 추출(+유사도) 및 불용어 제거..(명사가 없거나 영어가 아닌 외국어일시 return hashtag:etc)
       (googletrans, word2vec, regex, konlpy)
    2. description으로부터 명사 추출 및 불용어 제거..(description이 없을 시 return title_nouns) (regex, konlpy)
    3. similarity 판단, keyword 추출 (word2vec)
    4. keyword로부터 가장 유사한 방향의 hashtag 추출 (word2vec)

-   새로운 logic :

    1. title로부터 명사 추출 및 유사단어 추출(+유사도) 및 불용어 제거..(명사가 없거나 영어가 아닌 외국어일시 return hashtag:etc)
       (googletrans, word2vec, regex, konlpy)
    2. description으로부터 명사 추출 및 불용어 제거..(description이 없을 시 return title_nouns) (regex, konlpy)
    3. title_nouns의 명사와 description의 유사도를 비교, 기존의 유사도와 곱연산.
    4. 상위 5개 단어 추출.
    5. category별 단어 비교. similarity_multiple_sum 계산 후 가장 높은 값의 단어 추천.

    -   할 일 : get_category2 함수 만들기 + code refactoring??
