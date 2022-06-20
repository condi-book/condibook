from flask import Flask,request,make_response
from model import nouns_extractor, keywords_sum_similarity, recommend_by_keyword, make_reserved_bookmark_list
# import time

app = Flask(__name__)
print('AI server start!')

@app.route('/')
def home():
    return '<h1>team14 AI server.</h1>'

# @app.route('/user/<username>')
# def show_user_profile(username):
#     # show the user profile for that user
#     return 'User %s' % username

@app.route('/translate', methods = ['POST'])
def translate():
    req = request.get_json()
    title = req['title']
    description = req['description']

    if title == 'apiapiapi' and description == 'apiapiapi':
        x = '''
        설명 :
        10 + title 안의 명사의 갯수 만큼 길이의 dictionary가 return.
        배열 안의 원소는 2개의 배열로 이루어져 있으며 첫 번째에는 추천키워드, 두 번째에는 각각의 keyword와 description으로부터 계산된 similarity_sum이 들어간다.
        * 만약 추천키워드가 model 안에 없는 경우 맨 앞 단어에는 !가 붙고, 그 value = -1로 표기된다.
        ( ex. 리턴값에 백엔드가 단어로 들어왔는데 모델에 없는 경우..(받은 배열의 이름을 res라 함.) res[!백엔드] == -1 )
        '''
        make_response(x)
        return x, 200

    # stttime = time.time()

    title_nouns = nouns_extractor(title)
    description_nouns = nouns_extractor(description)
    reserved_bookmark_list = make_reserved_bookmark_list(title_nouns)
    recommend_keywords = keywords_sum_similarity(reserved_bookmark_list,description_nouns)
    # 함수 개선의 필요성이 느껴진다.. 처음 시작은 약 4초, 그 후에는 함수/변수/모델이 모두 로드가 된 상태이기 때문에 약 0.5초정도 걸림.
    # (기본 pretrained_model 사용시..)
    
    # print('running_time = ', time.time() - stttime)
    
    return make_response(recommend_keywords), 200

@app.route('/keyword_extract', methods = ['POST'])
def aaaa():
    # ! keywords를 어떻게 받는지, 그리고 bookmark_list를 받을지 말지에 따라 return이 달라짐.. 빠르게 소통해보자.
    keywords,bookmark_list = request.get_json()['keywords','bookmark_list']
    return recommend_by_keyword(keywords,bookmark_list)

if __name__ == '__main__':
    app.run(debug=True,port=5001)
