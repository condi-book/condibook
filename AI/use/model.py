import re
from googletrans import Translator,LANGUAGES
from konlpy.tag import Okt
from gensim.models import Word2Vec
import os
os.environ['JAVA_HOME'] = r'/usr/bin/jar'

regex = re.compile('[ㄱ-ㅎ|\d\ㅏ-ㅣ|가-힣|a-z|0-9]+')
translator = Translator()
okt = Okt()
# print(os.listdir('.')) # 작동하는 곳의 현 위치를 나타냄.
# model = Word2Vec.load('./AI/Model/pretrained/ko.bin')
model = Word2Vec.load('../model/train1_ko.bin') # 새로운 경로 지정.
model_input_words = tuple(model.wv.index2word)

del_arr = '''
아 휴 아이구 아이쿠 아이고 어 나 우리 저희 따라 의해 을 를 에 의 가 으로 로 에게 뿐이다 의거하여 근거하여 입각하여 링 디 닝 웨 린 엘 높
기준으로 예하면 예를 들면 예를 들자면 저 소인 소생 저희 지말고 하지마 하지마라 다른 물론 또한 그리고 
해서는 안된다 뿐만 아니라 만이 아니다 만은 아니다 막론하고 관계없이 그치지 않다 그러나 그런데 하지만 든간에 
따지지 않다 설사 비록 더라도 아니면 만 못하다 하는 편이 낫다 불문하고 향하여 향해서 향하다 쪽으로 틈타 이용하여 타다 오르다 제외하고 
외에 이 밖에 하여야 비로소 한다면 몰라도 외에도 이곳 여기 부터 기점으로 따라서 할 생각이다 하려고하다 이리하여 그리하여 그렇게 함으로써 
하지만 일때 할때 앞에서 중에서 보는데서 으로써 로써 까지 해야한다 일것이다 반드시 할줄알다 할수있다 할수있어 임에 틀림없다 한다면 등 등등 
제 겨우 단지 다만 할뿐 딩동 댕그 대해서 대하여 대하면 훨씬 얼마나 얼마만큼 얼마큼 남짓 여 얼마간 약간 다소 좀 조금 다수 몇 얼마 지만 하물며 
또한 그러나 그렇지만 하지만 이외에도 대해 말하자면 뿐이다 다음에 반대로 반대로 말하자면 이와 반대로 바꾸어서 말하면 바꾸어서 한다면 만약 
그렇지않으면 까악 툭 딱 삐걱거리다 보드득 비걱거리다 꽈당 응당 해야한다 에 가서 각 각각 여러분 각종 각자 제각기 하도록하다 와 과 그러므로 그래서 
고로 한 까닭에 하기 때문에 거니와 이지만 대하여 관하여 관한 과연 실로 아니나다를가 생각한대로 진짜로 한적이있다 하곤하였다 하 하하 허허 아하 거바 
와 오 왜 어째서 무엇때문에 어찌 하겠는가 무슨 어디 어느곳 더군다나 하물며 더욱이는 어느때 언제 야 이봐 어이 여보시오 흐흐 흥 휴 헉헉 헐떡헐떡 영차 
여차 어기여차 끙끙 아야 앗 아야 콸콸 졸졸 좍좍 뚝뚝 주룩주룩 솨 우르르 그래도 또 그리고 바꾸어말하면 바꾸어말하자면 혹은 혹시 답다 및 그에 따르는 
때가 되어 즉 지든지 설령 가령 하더라도 할지라도 일지라도 지든지 몇 거의 하마터면 인젠 이젠 된바에야 된이상 만큼 어찌됏든 그위에 게다가 점에서 보아 
비추어 보아 고려하면 하게될것이다 일것이다 비교적 좀 보다더 비하면 시키다 하게하다 할만하다 의해서 연이서 이어서 잇따라 뒤따라 뒤이어 결국 의지하여 
기대여 통하여 자마자 더욱더 불구하고 얼마든지 마음대로 주저하지 않고 곧 즉시 바로 당장 하자마자 밖에 안된다 하면된다 그래 그렇지 요컨대 다시 말하자면 
바꿔 말하면 즉 구체적으로 말하자면 시작하여 시초에 이상 허 헉 허걱 바와같이 해도좋다 해도된다 게다가 더구나 하물며 와르르 팍 퍽 펄렁 동안 이래 하고있었다 
이었다 에서 로부터 까지 예하면 했어요 해요 함께 같이 더불어 마저 마저도 양자 모두 습니다 가까스로 하려고하다 즈음하여 다른 다른 방면으로 해봐요 습니까 
했어요 말할것도 없고 무릎쓰고 개의치않고 하는것만 못하다 하는것이 낫다 매 매번 들 모 어느것 어느 로써 갖고말하자면 어디 어느쪽 어느것 어느해 어느 년도 
라 해도 언젠가 어떤것 어느것 저기 저쪽 저것 그때 그럼 그러면 요만한걸 그래 그때 저것만큼 그저 이르기까지 할 줄 안다 할 힘이 있다 너 너희 당신 
어찌 설마 차라리 할지언정 할지라도 할망정 할지언정 구토하다 게우다 토하다 메쓰겁다 옆사람 퉤 쳇 의거하여 근거하여 의해 따라 힘입어 그 다음 버금 
두번째로 기타 첫번째로 나머지는 그중에서 견지에서 형식으로 쓰여 입장에서 위해서 단지 의해되다 하도록시키다 뿐만아니라 반대로 전후 전자 앞의것 잠시 
잠깐 하면서 그렇지만 다음에 그러한즉 그런즉 남들 아무거나 어찌하든지 같다 비슷하다 예컨대 이럴정도로 어떻게 만약 만일 위에서 서술한바와같이 인 듯하다 
하지 않는다면 만약에 무엇 무슨 어느 어떤 아래윗 조차 한데 그럼에도 불구하고 여전히 심지어 까지도 조차도 하지 않도록 않기 위하여 때 시각 무렵 시간 동안 
어때 어떠한 하여금 네 예 우선 누구 누가 알겠는가 아무도 줄은모른다 줄은 몰랏다 하는 김에 겸사겸사 하는바 그런 까닭에 한 이유는 그러니 그러니까 때문에 그 
너희 그들 너희들 타인 것 것들 너 위하여 공동으로 동시에 하기 위하여 어찌하여 무엇때문에 붕붕 윙윙 나 우리 엉엉 휘익 윙윙 오호 아하 어쨋든 만 못하다 
하기보다는 차라리 하는 편이 낫다 흐흐 놀라다 상대적으로 말하자면 마치 아니라면 쉿 그렇지 않으면 그렇지 않다면 안 그러면 아니었다면 하든지 아니면 이라면 
좋아 알았어 하는것도 그만이다 어쩔수 없다 하나 일 일반적으로 일단 한켠으로는 오자마자 이렇게되면 이와같다면 전부 한마디 한항목 근거로 하기에 아울러 하지 
않도록 않기 위해서 이르기까지 이 되다 로 인하여 까닭으로 이유만으로 이로 인하여 그래서 이 때문에 그러므로 그런 까닭에 알 수 있다 결론을 낼 수 있다 으로 
인하여 있다 어떤것 관계가 있다 관련이 있다 연관되다 어떤것들 에 대해 이리하여 그리하여 여부 하기보다는 하느니 하면 할수록 운운 이러이러하다 하구나 하도다 
다시말하면 다음으로 에 있다 에 달려 있다 우리 우리들 오히려 하기는한데 어떻게 어떻해 어찌됏어 어때 어째서 본대로 자 이 이쪽 여기 이것 이번 이렇게말하자면 
이런 이러한 이와 같은 요만큼 요만한 것 얼마 안 되는 것 이만큼 이 정도의 이렇게 많은 것 이와 같다 이때 이렇구나 것과 같이 끼익 삐걱 따위 와 같은 사람들 
부류의 사람들 왜냐하면 중의하나 오직 오로지 에 한하다 하기만 하면 도착하다 까지 미치다 도달하다 정도에 이르다 할 지경이다 결과에 이르다 관해서는 여러분 
하고 있다 한 후 혼자 자기 자기집 자신 우에 종합한것과같이 총적으로 보면 총적으로 말하면 총적으로 대로 하다 으로서 참 그만이다 할 따름이다 쿵 탕탕 쾅쾅 둥둥 
봐 봐라 아이야 아니 와아 응 아이 참나 년 월 일 령 영 일 이 삼 사 오 육 륙 칠 팔 구 이천육 이천칠 이천팔 이천구 하나 둘 셋 넷 다섯 여섯 일곱 여덟 아홉 령 영 
이 있 하 것 들 그 되 수 이 보 않 없 나 사람 주 아니 등 같 우리 때 년 가 한 지 대하 오 말 일 그렇 위하 때문 그것 두 말하 알 그러나 받 못하 일 그런 또 문제 더 
사회 많 그리고 좋 크 따르 중 나오 가지 씨 시키 만들 지금 생각하 그러 속 하나 집 살 모르 적 월 데 자신 안 어떤 내 경우 명 생각 시간 그녀 다시 이런 앞 보이 
번 나 다른 어떻 여자 개 전 들 사실 이렇 점 싶 말 정도 좀 원 잘 통하 놓
'''
stopwords = tuple(set(del_arr.strip().split()))
del del_arr


# 키워드 추천을 위한 두 개의 함수.
# model1 : nouns_extract func.
def nouns_extractor(arr):
    #arr이 ''인 경우.. title은 거의 대부분 있을 수 밖에 없고,description이 없는 경우를 가정할 수 있기 때문.
    if len(arr) == 0:
        return arr
    
    reserverd_nouns = []
    text = ''
    
    #명사는 넣고, 영어는 재분류를 위해 빼기.
    for i in okt.pos(arr):
        if i[1] == 'Noun' and i[0] not in stopwords:
            reserverd_nouns.append(i[0])
        elif i[1] == 'Alpha':
            text = text + i[0]+' '
    
    # 영어가 있는 경우 실행되는 코드로 위와 똑같이 명사 분류.
    text1 = ''
    if len(text) != 0:
        text1 = translator.translate(text, dest = 'ko').text

        for i in okt.pos(text1):
            if i[1] == 'Noun' and i[0] not in stopwords and len(i[0]) != 1:
                reserverd_nouns.append(i[0])
    
    #불용어 제거 후 return.(중복 가능)
    # nouns = [i for i in reserverd_nouns if i not in stopwords] 요게 함수쪽으로 들어갈 경우 len(title_nouns) == 0 이 될 수 있음.
    # print('noun_extractor.reserverd_nouns =',reserverd_nouns)
    return reserverd_nouns

# model2 : 예비북마크 list.
def make_reserved_bookmark_list(lst):
    reserved_bookmark_list = [(i,1) for i in lst if i in model_input_words]
    # exist_words = []

    reserved_bookmark_list += model.wv.most_similar(positive = [i for i in lst if i in model_input_words])

    # for i in lst:
    #     if i in model_input_words:
    #         exist_words.append(i)

    # if len(exist_words) > 0:
    #     reserved_bookmark_list += model.wv.most_similar(positive = exist_words)
    
    return reserved_bookmark_list

# model3 : bookmark_extract func.

def get_keywords(reserved_bookmark_list,description_nouns):
    if len(description_nouns) == 0:
        # return False, {i[0]:i[1] for i in reserved_bookmark_list}
        return reserved_bookmark_list
    
    keywords_ordered = []
    on_description_nouns = [i for i in description_nouns if i in model_input_words]
    
    for i in range(len(reserved_bookmark_list)):
        keyword,per = reserved_bookmark_list[i]
        
        temp_num = 1
            
        try:
            temp_num += model.wv.n_similarity([keyword],on_description_nouns)
        except:
            pass  # description의 noun이 model에 없는 경우 고려대상에서 제외.
            
        temp_num *= per
        
        keywords_ordered.append((keyword,temp_num))
        
    # print('keywords_ordered =',keywords_ordered)

    hashtags = sorted(keywords_ordered,key=lambda x: -x[1])
    return hashtags


def get_category2(reserved_bookmark_list,description_nouns):
    hashtags = get_keywords(reserved_bookmark_list,description_nouns)

    categories = [('경영'), ('정보', '기술'), ('금융'), ('개발'), ('구인', '구직','채용'), ('건강'), ('환경'), ('뷰티'), ('여행'), ('식당', '카페'), ('자기','공부'),('음식', '요리'),('음악'),('쇼핑')]
    cate_dic = {'경영': '경영', ('정보', '기술'): '정보/기술', '금융': '금융', '개발': '개발', ('구인', '구직','채용'): '구인/구직', '건강': '건강', '환경': '환경', '뷰티': '뷰티', '여행': '여행', ('식당', '카페'): '맛집/카페', ('자기', '공부'): '자기계발', ('음식', '요리'): '음식/요리','음악':'음악','쇼핑':'쇼핑'}
    category_list = ['경영', '정보', '기술', '금융', '개발', '구인', '구직','채용', '건강', '환경', '뷰티', '여행', '식당', '카페', '자기','공부','음식', '요리','음악','쇼핑']
    # it --> 정보, (인크루트) --> del, 맛집 --> 식당, 자기개발 --> 자기 + 공부 로 변경.

    for i,per in hashtags:
        if i in category_list:
            for j in categories:
                if i in j:
                    return cate_dic[j]

    weights = [0]*len(categories)

    for i in range(len(categories)):
        for j,per in hashtags:
            try:
                for k in categories[i]:
                    weights[i] += model.wv.similarity(k,j)
            except:
                pass
            weights[i] = weights[i]/len(categories[i])*per
            
    return cate_dic[categories[weights.index(max(weights))]]

# def keywords_sum_similarity(reserved_bookmark_list,description_nouns):
#     # description이 없는 경우.. title의 keyword는 있겠지..
#     if len(description_nouns) == 0:
#         return False, {i[0]:i[1] for i in reserved_bookmark_list}
    
#     # keyword_similarity_sum 구하고 return.
#     keywords_ordered = dict()
#     # print(len(reserved_bookmark_list),len(description_nouns))
#     on_description_nouns = [i for i in description_nouns if i in model_input_words]
    
#     for i in range(len(reserved_bookmark_list)):
#         keyword,per = reserved_bookmark_list[i]
        
#         if keyword in model_input_words:
#             # print(reserved_bookmark_list)
#             temp_num = 1
            
#             try:
#                 temp_num += model.wv.n_similarity([keyword],on_description_nouns)
#             except:
#                 pass  # description의 noun이 model에 없는 경우 고려대상에서 제외.
                
#             # print(temp_num,per)
#             temp_num *= per
            
#             keywords_ordered[keyword] = temp_num
#         else:
#             keywords_ordered['!'+keyword] = -1 # title에서 뽑은 noun이 없는 경우. 경고(!)와 함께 value = -1로 표기.
    
#     return True, keywords_ordered

# def get_category(hashtags):
#     categories = [('경영'), ('정보', '기술'), ('금융'), ('개발'), ('구인', '구직'), ('건강'), ('환경'), ('뷰티'), ('여행'), ('식당', '카페'), ('자기','공부'),('음식', '요리'),('음악'),('쇼핑')]
#     cate_dic = {'경영': '경영', ('정보', '기술'): '정보/기술', '금융': '금융', '개발': '개발', ('구인', '구직'): '구인/구직', '건강': '건강', '환경': '환경', '뷰티': '뷰티', '여행': '여행', ('식당', '카페'): '맛집/카페', ('자기', '공부'): '자기계발', ('음식', '요리'): '음식/요리','음악':'음악','쇼핑':'쇼핑'}
#     category_list = ['경영', '정보', '기술', '금융', '개발', '구인', '구직', '건강', '환경', '뷰티', '여행', '식당', '카페', '자기','공부','음식', '요리','음악','쇼핑']
#     # it --> 정보, (인크루트) --> del, 맛집 --> 식당, 자기개발 --> 자기 + 공부 로 변경.

#     for i in hashtags:
#         if i in category_list:
#             for j in categories:
#                 if i in j:
#                     return cate_dic[j]

#     weights = [0]*len(categories)

#     for i in range(len(categories)):
#         weights[i] = model.wv.n_similarity(categories[i],hashtags)

#     # if max(weights) < 0.55:
#     #     return 'etc'
#     # ! max 값에 대한 조정이 필요함. 0.55는 API에 있는 것을 넣어 확인 후 임의로 조정한 것임.. 제거.
#     # ! 최댓값 : 0.53~~
#     # print(weights)
    
#     return cate_dic[categories[weights.index(max(weights))]]

# dict 상위 3개의 value 

# ================================================

# model4 : 공유 북마크 부분에서 쓰이는 모델. 관심사와 유사한 키워드를 찾아서 뽑은 후 백엔드에 전달, 이 키워드를 이용해 타인의 북마크등을 추천.
# input : 관심사 키워드 + 워드임베딩된 키워드.
# ! output : 추천??(서버 내 북마크된 글이 충분히 많아졌을 때!)

# 지금까지 모든 사용자가 북마크하면서 등록된 헤시태그들....  : hashtag_list

def recommend_from_hashtag(hashtags):

    # 요리, 경제, 자전거
    # ['a','b','c','d','e'... ~~ 'z']

    #관심사 키워드 + bookmark된 키워드 리스트의 목록중 받아온 북마크에 있는 것만 뽑아주기. -- be가 어떻게 짜여졌냐에 따라 수정해야 할 수도?
    x = model.wv.most_similar(positive = hashtags) # len = 30  --> 바꾸기.
    temp = []
    for i in x:
        temp.append(i[0])
        if len(temp) == 10:
            break

    return hashtags + temp

def word_detection(arr):
    x = translator.detect(arr).lang.lower()
    if x in LANGUAGES:
        return LANGUAGES[x]
    
    return x  # module 내의 constant 단위까지 가서 살펴보았고, if 문은 혹시나 싶어서 넣어둠.

# 뽑아낸 것... short name 보내기?
