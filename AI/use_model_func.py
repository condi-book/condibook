# 사용 패키지 re(정규표현식), googletrans==4.0.0-rc1(언어감지 및 번역), konlpy(명사추출), gensim(word2vec) 사용!
import re
from googletrans import Translator
from konlpy.tag import Okt
from gensim.model import word2vec

regex = re.compile('[ㄱ-ㅎ|\d\ㅏ-ㅣ|가-힣|a-z]+')
translator = Translator()
okt = Okt()
model = word2vec.load('path/model.bin')

del_arr = ('불용어들 tuple')

# model1 : nouns_extract func.
def nouns_extractor(arr):
    #arr이 ''인 경우.. title은 거의 대부분 있을 수 밖에 없고,description이 없는 경우를 가정할 수 있기 때문.
    if len(arr) == 0:
        return arr
    
    arr = regex.findall(arr)
    for i in range(len(arr)):
        if arr[i] in del_arr:
            arr[i] = ''
    arr = ' '.join(arr)
    
    reserverd_nouns = []
    text = ''
    
    for i in okt.pos(arr):
        if i[1] == 'Noun':
            reserverd_nouns.append(i[0])
        elif i[1] == 'Alpha':
            text = text + i[0]+' '
    
    text1 = ''
    if len(text) != 0:
        text1 = translator.translate(text1,dest = 'ko').text

        for i in okt.pos(text1):
            if i[1] == 'Noun':
                reserverd_nouns.append(i[0])
    
    nouns = [i for i in reserverd_nouns if i not in del_arr]
    return nouns

# model2 : bookmark_extract func.

def keywords_sum_similarity(reserved_bookmark_list,description_nouns):
    # description이 없는 경우.
    if len(description_nouns) == 0:
        return reserved_bookmark_list
    
    keywords_ordered = ['']*len(reserved_bookmark_list)
    for i in range(len(reserved_bookmark_list)):
        keyword,per = reserved_bookmark_list[i]
        temp_num = 0
        
        for j in description_nouns:
            temp_num += model.wv.similarity(keyword,j)
        temp_num *= per
        
        keywords_ordered[i] = [keyword,temp_num]
    
    keywords_ordered = sorted(keywords_ordered,key = lambda x: -x[1])

    return keywords_ordered

# ================================================

# model3 : 
# input : 관심사 키워드 + 워드임베딩된 키워드.
# output : 추천??(서버 내 북마크된 글이 충분히 많아졌을 때!)

def recommend_by_keyword(keywords,bookmark_list):
    #관심사 키워드 + bookmark된 키워드 리스트의 목록중 받아온 북마크에 있는 것만 뽑아주기. 
    x = model.wv.most_similar(positive = keywords) # len = 10
    
    temp = []
    for i in x:
        if i in bookmark_list:
            temp.append(i)
        if len(temp) == 3:
            break

    return keywords + temp
