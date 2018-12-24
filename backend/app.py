from flask import Flask, render_template, jsonify, request
import json
from crawler import Crawler
from utils import *

app = Flask(__name__)

text_crawler = Crawler()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ebooks')
def get_ebooks():
    filenames = get_ebooks_names()
    return jsonify({'ebooks_names': filenames})

@app.route('/phrases', methods=['POST'])
def get_phrases():
    content = request.get_json()
    words = content['wordsList']
    new_analysis = content['newAnalysis'] == 1
    if new_analysis:
        first_res = []
        text_crawler.reset()
        text_crawler.set_generator(words)
        for i in range(20):
            phrase = text_crawler.get_next()
            if phrase is None:
                break
            else:
                first_res.append(phrase)
        text_crawler.set_next_res(first_res)
    res = text_crawler.get_next_res()
    next_res = []
    for i in range(20):
        phrase = text_crawler.get_next()
        if phrase is None:
            break
        else:
            next_res.append(phrase)
    text_crawler.set_next_res(next_res)
    if len(next_res) == 0:
        text_crawler.set_completed()
    formatted_res = []
    for ebook, phrase, phrase_index in res:
        if ebook != text_crawler.get_current_ebook():
            formatted_res.append(['<strong>' + ebook + '<strong>', phrase_index - 1])
            text_crawler.set_current_ebook(ebook)
        formatted_res.append([phrase, phrase_index])
    return jsonify({'phrases': formatted_res, 'completed': text_crawler.get_completed()})

if __name__ == '__main__':
    app.run()
