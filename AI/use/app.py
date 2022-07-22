from flask import Flask,request,make_response
from model import nouns_extractor,recommend_from_hashtag, make_reserved_bookmark_list, word_detection, get_category2

app = Flask(__name__)
print('AI server start!')


@app.route('/')
def home():
    return '<h1>team14 AI server.</h1>'

@app.route('/translate', methods = ['POST'])
def translate():
    req = request.get_json()
    title = ''
    if 'title' in req:
        title = req['title']
    else:
        return make_response({'ErrorMessage':'meta_title의 부재.' ,'category':'etc'}), 400

    title_nouns = nouns_extractor(title)

    if len(title_nouns) == 0:
        return make_response({'ErrorMessage':'서비스를 지원하지 않는 언어입니다.' ,'언어 종류' : word_detection(title),'category':'etc'}), 200

    description = req['description']

    description_nouns = nouns_extractor(description)
    reserved_bookmark_list = make_reserved_bookmark_list(title_nouns)
    
    category = get_category2(reserved_bookmark_list, description_nouns)

    send = {'category':category}

    return make_response(send), 200

@app.route('/keyword_extract', methods = ['POST'])
def recommend_bookmark():
    req =  request.get_json()
    hashtags = req['hashtags']

    return make_response({'recommend_keywords':recommend_from_hashtag(hashtags)}), 200

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True,port=5004)
