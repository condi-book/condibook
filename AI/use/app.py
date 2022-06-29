from flask import Flask,request,make_response
from model import nouns_extractor, keywords_sum_similarity, recommend_by_keyword, make_reserved_bookmark_list, get_category


app = Flask(__name__)
print('AI server start!')

@app.route('/')
def home():
    return '<h1>team14 AI server.</h1>'

@app.route('/translate', methods = ['POST'])
def translate():
    req = request.get_json()
    title = req['title']
    description = req['description']

    title_nouns = nouns_extractor(title)
    description_nouns = nouns_extractor(description)
    reserved_bookmark_list = make_reserved_bookmark_list(title_nouns)
    recommend_keywords = keywords_sum_similarity(reserved_bookmark_list,description_nouns)

    print(recommend_keywords)

    hashtags = sorted(recommend_keywords,key = lambda x: -recommend_keywords[x])[:3]
    category = get_category(hashtags)
    send = {'hashtags':hashtags,'category':category}

    return make_response(send), 200

# @app.route('/keyword_extract', methods = ['POST'])
# def aaaa():
#     # ! keywords를 어떻게 받는지, 그리고 bookmark_list를 받을지 말지에 따라 return이 달라짐.. 빠르게 소통해보자.
#     keywords,bookmark_list = request.get_json()['keywords','bookmark_list']
#     return make_response(recommend_by_keyword(keywords,bookmark_list))

if __name__ == '__main__':
    app.run(debug=True,port=5003)
