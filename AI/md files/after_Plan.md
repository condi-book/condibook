### Two plans.

-   현재 2번이 하기 쉬운 편에 속하기에 먼저 진행중..

1. model file refine or create new model.

    #### 방향1

    - model file refine : corpus를 추가할 수 있게 셋팅을 바꾼 후 모델을 다시 훈련.(방법을 찾아봐야함.)

    #### 방향2

    - create new model : 시간이 얼마나 걸릴지 모름 + model의 정확도 역시 예측 불가..(복불복)

2. model.py update..

-   카테고리 단어 더하기 : (현재) 음악, 쇼핑. - done.
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

### 고민.

-   이 경우 model의 완성도는 어떻게 평가를 하면 좋을까?

    1. 같은 글을 읽어도 필연적으로 사람에 따라 다른 카테고리에 url이 들어갈 수 있다.

        - ex. 요리에 관심이 있는 사람과 맛집에 관심이 있는 사람이 있다고 가정하자. 이때 동일한 맛집의 리뷰에 대한 url을 저장한다고 할 때, 그 카테고리는 각각 '음식/요리' 와 '맛집/카페' 로 다르게 들어가야 한다. 그 구분이 명확하지 않은 케이스 역시 있을 수 있다.(둘 다 관심이 있는 경우 둘중 어디든 들어가도 좋을 수 있다.. 하지만 그 반대의 경우는?)

    2. 카테고리를 직접 바꿀 수 있게 해주면 어떨까?(디폴트값은 현재의 카테고리, 물론 훈련이 잘 되어있어야 하고, 항상 해당하는 단어가 카테고리에 있어야 한다는 전제 하에... 그 단어가 없다면 추천??... 카테고리의 값을 사용자가 직접 제어하는 경우 완성도가 확실히 조금은 더 올라갈 것이다. 왜냐하면 그들의 bias가 필요한 곳에 그 과정이 직접 들어가게 되니까!)
        - 단어가 코퍼스에 없는 경우 추천은 잘 생각해볼 문제인 것 같다. 모델을 지속적으로 훈련시켜 업데이트 하는 것도 한 방법이지만,
          첫 번째로 훈련 자동화의 문제,
          두 번째로 한 케이스에 대한 훈련으로 이것이 과연 모든 사용자에 대해 잘 작동할지에 대한 판단의 문제
          가 동시에 걸려있다.
            - ! 구동방법이 지나치게 복잡해질 가능성에 대한 문제가 존재한다.
